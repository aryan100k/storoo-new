import { cookies } from "next/headers";
import { TRPCError } from "@trpc/server";

import { router, procedure } from "@/server/trpc";
import { addListingRequest, getAvailableListings } from "@/server/trpc/helpers/listing";
import { login, signUp } from "@/server/trpc/helpers/auth";

import { listingSchema } from "@/lib/zod/listing";
import { loginSchema, signUpSchema } from "@/lib/zod/auth";

export const publicRouter = router({
  test: procedure.query(async () => {
    return "hello world";
  }),
  login: procedure.input(loginSchema).mutation(async ({ input }) => {
    const session = await login(input.email, input.password);

    (await cookies()).set(session.name, session.value, session.attributes);

    return {
      status: "success",
    };
  }),
  signup: procedure.input(signUpSchema).mutation(async ({ input }) => {
    const session = await signUp(input);

    (await cookies()).set(session.name, session.value, session.attributes);
    return {
      status: "success",
    };
  }),
  getAvailableListings: procedure.query(async () => {
    const listings = await getAvailableListings();

    const spaceTypeMap: Record<string, string> = {
      retail: "Retail Store",
      hotel: "Hotel Lobby",
      cafe: "Cafe",
      other: "Other",
    };

    return listings.map((listing) => ({
      id: listing.id,
      businessName: listing.businessName,
      rent: listing.rent,
      locality: listing.locality,
      state: listing.state,
      city: listing.city,
      latitude: listing.latitude,
      longitude: listing.longitude,
      spaceType: spaceTypeMap[listing.spaceType] || listing.spaceType,
    }));
  }),
  addListing: procedure.input(listingSchema).mutation(async ({ input, ctx }) => {
    try {
      const storageId = await addListingRequest(input, ctx.user?.id);
      return {
        status: "success",
        storageId,
      };
    } catch (e) {
      console.error(e);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Something went wrong",
      });
    }
  }),
});
