import { z } from "zod";
import { phoneSchema } from "./auth";

export const bookingRequestSchema = z.object({
  name: z.string().trim().min(1).max(255),
  phone: phoneSchema,
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
  luggageType: z.enum(["small", "regular", "odd_size", "other"]),
  storageId: z.number().optional(),
});

export type BookingRequestSchema = z.infer<typeof bookingRequestSchema>;
