import { TRPCError } from "@trpc/server";
import { procedure, router } from "..";
import {
  getLatestCapacityUpdate,
  getLatestPartnerUpdate,
  getListingCountByStatus,
} from "../helpers/listing";
import {
  getBookings,
  getBookingsTotalBookingsCount,
  getLatestBookingRequest,
} from "../helpers/booking";
import { z } from "zod";

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
          status: z.enum(["pending", "approved", "rejected"]).optional(),
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

  getBookingsTotalBookingsCount: adminProcedure.query(async () => {
    return getBookingsTotalBookingsCount();
  }),
  getBookings: adminProcedure
    .input(
      z.object({
        limit: z.number().optional(),
        cursor: z.number().optional(),
        search: z.string().optional(),
      })
    )
    .query(async ({ input }) => {
      return getBookings(input);
    }),
});
