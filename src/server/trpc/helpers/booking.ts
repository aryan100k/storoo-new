import { and, count, eq, gt, or, sql } from "drizzle-orm";
import { db } from "@/server/drizzle/db";
import { BookingRequestSchema } from "@/lib/zod/booking";
import { Booking, bookingTable } from "@/server/drizzle/schema";

export const getLatestBookingRequest = async () => {
  const res = await db.query.bookingTable.findFirst({
    orderBy: (fields, { asc }) => [asc(fields.createdAt)],
  });

  return res || null;
};

export const addNewBookingRequest = async (booking: BookingRequestSchema, userId?: string) => {
  const bookingRequest: Booking = {
    userId,
    storageId: booking.storageId,
    name: booking.name,
    phone: booking.phone,
    luggageType: booking.luggageType,
    startDate: booking.startDate,
    endDate: booking.endDate,
    createdAt: new Date(),
  };

  const [bookingId] = await db
    .insert(bookingTable)
    .values(bookingRequest)
    .returning({ insertedId: bookingTable.id });

  return bookingId.insertedId;
};

export const getBookingsTotalBookingsCount = async () => {
  const [query] = await db
    .select({
      count: count(bookingTable.id),
    })
    .from(bookingTable);

  return query.count || 0;
};

export const getBookings = async (config: { limit?: number; cursor?: number; search?: string }) => {
  const bookings = await db.query.bookingTable.findMany({
    orderBy: (fields, { asc }) => [asc(fields.createdAt)],
    limit: config.limit,
    offset: config.cursor,
    where: (table, { gt, sql, and }) =>
      or(
        gt(table.id, config.cursor || 0),
        or(sql`name ILIKE ${config.search}`, sql`phone ILIKE ${config.search}`)
      ),
  });

  return bookings;
};
