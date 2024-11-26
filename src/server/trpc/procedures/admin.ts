import { TRPCError } from "@trpc/server";
import { procedure, router } from "..";
import {
  deleteStorageListing,
  getLatestCapacityUpdate,
  getLatestPartnerUpdate,
  getListingCountByStatus,
  getStorageListings,
  updateStorageListingStatus,
} from "../helpers/listing";
import {
  deleteBooking,
  getBookings,
  getBookingsTotalBookingsCount,
  getLatestBookingRequest,
  updateBookingStatus,
} from "../helpers/booking";
import { z } from "zod";
import { bookingStatusSchema } from "@/lib/zod/booking";
import { listingStatusSchema } from "@/lib/zod/listing";

export const adminProcedure = procedure.use(async (opts) => {
  const { ctx } = opts;
  if (ctx?.user?.role !== "admin") {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }

  return opts.next({
    ctx: {
      user: ctx.user,
    },
  });
});

export const adminRouter = router({
  adminTest: adminProcedure.query(({ ctx }) => {
    return `hello admin ${ctx.user.email}`;
  }),
  getListingCountByStatus: adminProcedure
    .input(
      z
        .object({
          status: listingStatusSchema.optional(),
        })
        .optional()
    )
    .query(async ({ input }) => {
      const [res] = await getListingCountByStatus(input?.status);
      return res.count;
    }),

  getLatestCapacityUpdate: adminProcedure.query(() => {
    return getLatestCapacityUpdate();
  }),
  getLatestPartnerUpdate: adminProcedure.query(() => {
    return getLatestPartnerUpdate();
  }),
  getLatestBookingRequest: adminProcedure.query(() => {
    return getLatestBookingRequest();
  }),

  getListingsByStatus: adminProcedure
    .input(
      z.object({
        limit: z.number().optional(),
        cursor: z.number().optional(),
        status: listingStatusSchema.optional(),
      })
    )
    .query(async ({ input }) => {
      return getStorageListings(input);
    }),
  deleteStorageListing: adminProcedure.input(z.number()).mutation(async ({ input }) => {
    await deleteStorageListing(input);
    return {
      status: "success",
    };
  }),
  updateListingStatus: adminProcedure
    .input(z.object({ id: z.number(), status: listingStatusSchema }))
    .mutation(async ({ input }) => {
      await updateStorageListingStatus(input.id, input.status);

      return {
        status: "success",
      };
    }),

  getTotalBookingsCount: adminProcedure
    .input(
      z.object({
        status: bookingStatusSchema.or(z.null()).optional(),
      })
    )
    .query(async ({ input }) => {
      console.log(input);
      return getBookingsTotalBookingsCount(input);
    }),
  getBookings: adminProcedure
    .input(
      z.object({
        limit: z.number().optional(),
        cursor: z.number().optional(),
        status: bookingStatusSchema.or(z.null()).optional(),
      })
    )
    .query(async ({ input }) => {
      return getBookings(input);
    }),

  updateBookingStatus: adminProcedure
    .input(
      z.object({
        bookingId: z.number(),
        status: bookingStatusSchema,
      })
    )
    .mutation(async ({ input }) => {
      await updateBookingStatus(input.bookingId, input.status);
      return {
        status: "success",
      };
    }),
  deleteBooking: adminProcedure.input(z.number()).mutation(async ({ input }) => {
    await deleteBooking(input);
    return {
      status: "success",
    };
  }),
});
