import { TRPCError } from "@trpc/server";
import { listingSchema } from "@/lib/zod/listing";
import { router, procedure } from "@/server/trpc";
import { addListingRequest, getAvailableListings } from "../helpers/listing";

export const publicRouter = router({
  test: procedure.query(async () => {
    return "hello world";
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
  addListing: procedure.input(listingSchema).mutation(async ({ input }) => {
    try {
      const storageId = await addListingRequest(input);
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
