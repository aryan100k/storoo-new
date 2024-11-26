import { and, count, eq, gt, lt, or, sql } from "drizzle-orm";
import { db } from "@/server/drizzle/db";
import { BookingRequestSchema } from "@/lib/zod/booking";
import { Booking, bookingTable } from "@/server/drizzle/schema";

export const getLatestBookingRequest = async () => {
  const res = await db.query.bookingTable.findFirst({
    orderBy: (fields, { desc }) => [desc(fields.createdAt)],
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
  config.cursor = config.cursor || 0;
  config.limit = config.limit || 5;

  const bookings = await db.query.bookingTable.findMany({
    orderBy: (fields, { desc }) => [desc(fields.createdAt)],
    limit: config.limit,
    offset: config.cursor,
    where: (table, { sql }) =>
      config.search
        ? or(sql`to_tsvector('simple', ${table.name}) @@ to_tsquery('simple', ${config.search})`)
        : undefined,
  });

  return bookings;
};

export const updateBookingStatus = async (bookingId: number, status: Booking["status"]) => {
  await db
    .update(bookingTable)
    .set({ status, updatedAt: new Date() })
    .where(eq(bookingTable.id, bookingId));
};

export const deleteBooking = (bookingId: number) => {
  return db.delete(bookingTable).where(eq(bookingTable.id, bookingId));
};
