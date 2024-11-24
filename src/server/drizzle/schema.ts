import {
  pgTable,
  unique,
  uuid,
  text,
  timestamp,
  foreignKey,
  numeric,
  integer,
  type AnyPgColumn,
  serial,
  primaryKey,
} from "drizzle-orm/pg-core";
import { relations, sql } from "drizzle-orm";

export const storageLocations = pgTable("storage_locations", {
  id: uuid()
    .default(sql`uuid_generate_v4()`)
    .primaryKey()
    .notNull(),
  name: text(),
  address: text(),
  lat: numeric(),
  lng: numeric(),
  pricePerDay: numeric("price_per_day"),
  availableSpaces: integer("available_spaces"),
  createdAt: timestamp("created_at", { withTimezone: true, mode: "string" }).default(
    sql`timezone('utc'::text, now())`
  ),
});

export const storageDetails = pgTable("storage_details", {
  id: serial().primaryKey().notNull(),
  businessName: text("business_name").notNull(),
  contactName: text("contact_name").notNull(),
  email: text().notNull().unique(),
  phone: text().notNull().unique(),
  state: text().notNull(),
  city: text().notNull(),
  locality: text().notNull(),
  postalCode: text("postal_code").notNull(),
  spaceType: text("space_type").notNull(),
  capacityId: integer("capacity_id")
    .notNull()
    .references(() => capacity.id, {
      onDelete: "cascade",
    }),
  operatingHours: text("operating_hours").notNull(),
  rent: numeric().notNull(),
  securityFeatures: text("security_features").notNull(),
  amenities: text().notNull(),
  termsAgreed: text("terms_agreed").notNull(),
  additionalNote: text("additional_note").notNull(),
  referralSource: text("referral_source").notNull(),
  createdAt: timestamp("created_at", { mode: "string" }).defaultNow().notNull(),
});

export const capacity = pgTable("capacity", {
  id: serial().primaryKey().notNull(),
  small: integer().default(0).notNull(),
  regular: integer().default(0).notNull(),
  oddSize: integer("odd_size").default(0).notNull(),
  storageId: integer("storage_id")
    .notNull()
    .references(() => storageDetails.id, {
      onDelete: "cascade",
    }),
});

export const storageDetailsRelations = relations(storageDetails, ({ one, many }) => ({
  capacity: one(capacity, {
    fields: [storageDetails.capacityId],
    references: [capacity.id],
    relationName: "storageDetails_capacityId_capacity_id",
  }),
  capacities: many(capacity, {
    relationName: "capacity_storageId_storageDetails_id",
  }),
}));

export const capacityRelations = relations(capacity, ({ one, many }) => ({
  storageDetails: many(storageDetails, {
    relationName: "storageDetails_capacityId_capacity_id",
  }),
  storageDetail: one(storageDetails, {
    fields: [capacity.storageId],
    references: [storageDetails.id],
    relationName: "capacity_storageId_storageDetails_id",
  }),
}));
