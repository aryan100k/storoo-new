import { pgTable, text, timestamp, integer, serial, boolean } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const storageDetailsTable = pgTable("storage_details", {
  id: serial().primaryKey().notNull(),
  businessName: text("business_name").notNull(),
  contactName: text("contact_name").notNull(),
  email: text().notNull(),
  phone: text().notNull(),
  state: text().notNull(),
  city: text().notNull(),
  locality: text().notNull(),
  postalCode: text("postal_code").notNull(),
  placeId: text("place_id").notNull().default(""),
  latitude: integer().notNull().default(0),
  longitude: integer().notNull().default(0),
  spaceType: text("space_type").notNull(),
  capacityId: integer("capacity_id")
    .notNull()
    .references(() => capacityTable.id, {
      onDelete: "cascade",
    }),
  operatingHours: text("operating_hours").notNull(),
  rent: integer().notNull(),
  securityFeatures: text("security_features").notNull(),
  amenities: text(),
  termsAgreed: boolean("terms_agreed").notNull(),
  additionalNote: text("additional_note"),
  referralSource: text("referral_source").notNull(),
  createdAt: timestamp("created_at", { mode: "string" }).defaultNow().notNull(),
  approvalStatus: text({ enum: ["pending", "approved", "rejected"] })
    .default("pending")
    .notNull(),
});

export const capacityTable = pgTable("storage_capacity", {
  id: serial().primaryKey().notNull(),
  small: integer().default(0).notNull(),
  regular: integer().default(0).notNull(),
  oddSize: integer("odd_size").default(0).notNull(),
});

export const storageDetailsRelations = relations(storageDetailsTable, ({ one, many }) => ({
  capacity: one(capacityTable, {
    fields: [storageDetailsTable.capacityId],
    references: [capacityTable.id],
    relationName: "storageDetails_capacityId_capacity_id",
  }),
  capacities: many(capacityTable, {
    relationName: "capacity_storageId_storageDetails_id",
  }),
}));

export const capacityRelations = relations(capacityTable, ({ one, many }) => ({
  storageDetails: many(storageDetailsTable, {
    relationName: "storageDetails_capacityId_capacity_id",
  }),
}));

export type StorageDetails = typeof storageDetailsTable.$inferInsert;
