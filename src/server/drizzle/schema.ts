import { relations } from "drizzle-orm";
import { pgTable, serial, text, integer, timestamp, numeric } from "drizzle-orm/pg-core";

export const storageDetails = pgTable("storage_details", {
  id: serial("id").primaryKey(),
  businessName: text("business_name").notNull(),
  contactName: text("contact_name").notNull(),
  email: text("email").notNull().unique(),
  phone: text("phone").notNull(),
  state: text("state").notNull(),
  city: text("city").notNull(),
  locality: text("locality").notNull(),
  postalCode: text("postal_code").notNull(),
  spaceType: text("space_type").notNull(),
  capacityId: integer("capacity_id")
    .notNull()
    .references(() => capacityTable.id, { onDelete: "cascade" }),
  operatingHours: text("operating_hours").notNull(),
  rent: numeric("rent").notNull(),
  securityFeatures: text("security_features").notNull(),
  amenities: text("amenities").notNull(),
  termsAgreed: text("terms_agreed").notNull(),
  additionalNote: text("additional_note").notNull(),
  referralSource: text("referral_source").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const capacityTable = pgTable("capacity", {
  id: serial("id").primaryKey(),
  small: integer("small").notNull(),
  regular: integer("regular").notNull(),
  oddSize: integer("odd_size").notNull(),
});

export const storageDetailsRelation = relations(storageDetails, ({ one, many }) => ({
  capacity_capacityId: one(capacityTable, {
    fields: [storageDetails.id],
    references: [capacityTable.id],
    relationName: "capacity",
  }),
}));
