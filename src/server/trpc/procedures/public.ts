import { TRPCError } from "@trpc/server";
import { listingSchema } from "@/lib/zod/listing";
import { router, procedure } from "@/server/trpc";
import { addListingRequest } from "../helpers/listing";

export const publicRouter = router({
  test: procedure.query(async () => {
    return "hello world";
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
