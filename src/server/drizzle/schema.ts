import {
  pgTable,
  text,
  timestamp,
  integer,
  serial,
  boolean,
  numeric,
  varchar,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const storageDetailsTable = pgTable("storage_details", {
  id: serial().primaryKey().notNull(),
  userId: text("user_id")
    .notNull()
    .default("0")
    .references(() => userTable.id, {
      onDelete: "cascade",
    }),
  businessName: text("business_name").notNull(),
  contactName: text("contact_name").notNull(),
  email: text().notNull(),
  phone: text().notNull(),
  state: text().notNull(),
  city: text().notNull(),
  locality: text().notNull(),
  postalCode: text("postal_code").notNull(),
  placeId: text("place_id").notNull().default(""),
  latitude: numeric().notNull().default("0"),
  longitude: numeric().notNull().default("0"),
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
  user: one(userTable, {
    fields: [storageDetailsTable.userId],
    references: [userTable.id],
    relationName: "storageDetails_userId_user_id",
  }),
}));

export const capacityRelations = relations(capacityTable, ({ one, many }) => ({
  storageDetails: many(storageDetailsTable, {
    relationName: "storageDetails_capacityId_capacity_id",
  }),
}));

export const userTable = pgTable("user", {
  id: text("id").primaryKey().notNull(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  phone: varchar({ length: 255 }).notNull().unique(),
  password: varchar({ length: 255 }),
  enabled: boolean().default(true).notNull(),
  emailVerified: boolean().default(false).notNull(),
  phoneVerified: boolean().default(false).notNull(),
  createdAt: timestamp("created_at", { mode: "string" }).defaultNow().notNull(),
  imgFolderId: text("img_folder_id"),
  role: text({
    enum: ["admin", "user"],
  })
    .default("user")
    .notNull(),
});

export const userSessionTable = pgTable("user_session", {
  id: text().primaryKey().notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => userTable.id),
  expiresAt: timestamp("expires_at", {
    withTimezone: true,
    mode: "date",
  }).notNull(),
});

export const userRelations = relations(userTable, ({ one, many }) => ({
  session: one(userSessionTable, {
    fields: [userTable.id],
    references: [userSessionTable.userId],
    relationName: "user_session_user_id",
  }),
  sessions: many(userSessionTable, {
    relationName: "user_session_user_id",
  }),
}));

export type StorageDetails = typeof storageDetailsTable.$inferInsert;
export type User = typeof userTable.$inferInsert;
