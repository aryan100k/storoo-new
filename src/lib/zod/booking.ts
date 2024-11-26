import { z } from "zod";
import { phoneSchema } from "./auth";

export const luggageTypeMap = {
  small: "Small",
  regular: "Regular",
  odd_size: "Odd Size",
  other: "Other",
};

export const bookingStatusSchema = z.enum([
  "pending",
  "approved",
  "rejected",
  "completed",
  "other",
  "cancelled",
]);

export type BookingStatusSchema = z.infer<typeof bookingStatusSchema>;

export const bookingRequestSchema = z.object({
  name: z.string().trim().min(1).max(255),
  phone: phoneSchema,
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
  luggageType: z.enum(["small", "regular", "odd_size", "other"]),
  storageId: z.number().optional(),
});

export type BookingRequestSchema = z.infer<typeof bookingRequestSchema>;
