import { z } from "zod";

export const listingSchema = z.object({
  businessName: z.string().min(1, "Business name is required"),
  contactName: z.string().min(1, "Contact name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  locality: z.string().min(1, "Street address is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  postalCode: z.string().min(5, "Postal code must be at least 5 characters"),
  spaceType: z.string().min(1, "Space type is required"),
  storageCapacity: z.object({
    small: z.coerce.number().optional().default(0),
    regular: z.coerce.number().optional().default(0),
    oddSided: z.coerce.number().optional().default(0),
  }),
  operatingHours: z.string().min(1, "Operating hours are required"),
  securityFeatures: z.string().min(1, "Security features are required"),
  rent: z.coerce.number().min(1, "Rent amount is required"),
  amenities: z.string().optional(),
  termsAgreed: z
    .boolean()
    .refine((val) => val === true, "You must agree to the terms and conditions"),
  additionalNotes: z.string().optional(),
  referralSource: z.string().min(1, "Referral source is required"),
});

export type ListingSchema = z.infer<typeof listingSchema>;
