import { cookies } from "next/headers";
import { TRPCError } from "@trpc/server";

import { router, procedure } from "@/server/trpc";
import { login, signUp } from "@/server/trpc/helpers/auth";
import {
  addListingRequest,
  addPartnershipRequest,
  getAvailableListings,
} from "@/server/trpc/helpers/listing";
import { addNewBookingRequest } from "@/server/trpc/helpers/booking";

import { lucia } from "@/server/lucia";
import { listingSchema } from "@/lib/zod/listing";
import { loginSchema, signUpSchema } from "@/lib/zod/auth";
import { bookingRequestSchema } from "@/lib/zod/booking";
import { partnerRequestSchema } from "@/lib/zod/partner-request";

export const publicRouter = router({
  test: procedure.query(async () => {
    return "hello world";
  }),

  login: procedure.input(loginSchema).mutation(async ({ input }) => {
    const { sessionCookie, ...user } = await login(input.email, input.password);

    (await cookies()).set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);

    return {
      status: "success",
      user,
    };
  }),
  signup: procedure.input(signUpSchema).mutation(async ({ input }) => {
    const session = await signUp(input);

    (await cookies()).set(session.name, session.value, session.attributes);
    return {
      status: "success",
    };
  }),
  logout: procedure.mutation(async () => {
    const cookiesObj = await cookies();
    const sessionId = cookiesObj.get(lucia.sessionCookieName)?.value ?? null;

    if (sessionId) {
      await lucia.invalidateSession(sessionId);
      cookiesObj.set(lucia.sessionCookieName, "", {
        expires: new Date(0), // Immediately expires the cookie
      });
    }

    return {
      status: "success",
    };
  }),
  user: procedure.query(async ({ ctx }) => {
    return ctx.user;
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

  addNewBookingRequest: procedure.input(bookingRequestSchema).mutation(async ({ input, ctx }) => {
    const bookingId = await addNewBookingRequest(input, ctx.user?.id);

    return {
      status: "success",
      bookingId,
    };
  }),

  addPartnershipRequest: procedure.input(partnerRequestSchema).mutation(async ({ input }) => {
    await addPartnershipRequest(input);

    return {
      status: "success",
    };
  }),
});
