import { z } from "zod";
import { phoneSchema } from "./auth";

export const partnerRequestSchema = z.object({
  businessName: z.string().min(2, { message: "Business name must be at least 2 characters long" }),
  contactPerson: z
    .string()
    .min(2, { message: "Contact person must be at least 2 characters long" }),
  phoneNumber: phoneSchema,
  email: z.string().email(),
  location: z.string().min(2, { message: "Location must be at least 2 characters long" }),
  businessType: z.string().min(2, { message: "Business type must be at least 2 characters long" }),
  storageSpace: z.coerce.number().positive(),
  currentMonthlyVisitors: z.coerce.number().positive(),
});

export type PartnerRequestSchema = z.infer<typeof partnerRequestSchema>;
