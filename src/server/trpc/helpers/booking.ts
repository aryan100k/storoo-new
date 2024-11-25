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
    name: booking.name,
    phone: booking.phone,
    luggageType: booking.luggageType,
    startDate: booking.startDate.toISOString(),
    endDate: booking.endDate.toISOString(),
    createdAt: new Date().toISOString(),
  };

  const [bookingId] = await db
    .insert(bookingTable)
    .values(bookingRequest)
    .returning({ insertedId: bookingTable.id });

  return bookingId.insertedId;
};
