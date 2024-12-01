import { apiErrors } from "@/lib/api-errors";
import { getGeocodeFromPlaceId } from "@/lib/google-places";
import { ListingSchema } from "@/lib/zod/listing";
import { PartnerRequestSchema } from "@/lib/zod/partner-request";
import { db } from "@/server/drizzle/db";
import {
  capacityTable,
  PartnershipRequest,
  partnershipRequestTable,
  StorageDetails,
  storageDetailsTable,
} from "@/server/drizzle/schema";
import { TRPCError } from "@trpc/server";
import { count, eq } from "drizzle-orm";

export const addListingRequest = async (listing: ListingSchema, userId?: string) => {
  const geoCode = await getGeocodeFromPlaceId(listing.placeId);
  const { lat, lng } = geoCode?.result.geometry.location || {};

  if (!lat || !lng) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: apiErrors.listingInvalidAddress,
    });
  }

  const capacityId = await db
    .insert(capacityTable)
    .values({
      oddSize: listing.storageCapacity.oddSided,
      regular: listing.storageCapacity.regular,
      small: listing.storageCapacity.small,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    .returning({ insertedId: capacityTable.id });

  const storageDetails: StorageDetails = {
    userId,
    businessName: listing.businessName,
    contactName: listing.contactName,
    email: listing.email,
    phone: listing.phone,
    state: listing.state,
    city: listing.city,
    locality: listing.locality,
    postalCode: listing.postalCode,
    spaceType: listing.spaceType,
    operatingHours: listing.operatingHours,
    rent: listing.rent,
    securityFeatures: listing.securityFeatures,
    amenities: listing.amenities,
    termsAgreed: listing.termsAgreed,
    additionalNote: listing.additionalNotes,
    referralSource: listing.referralSource,
    placeId: listing.placeId,
    createdAt: new Date().toISOString(),
    capacityId: capacityId[0].insertedId,
    approvalStatus: "pending",
    latitude: lat.toString(),
    longitude: lng.toString(),
  };

  const storageId = await db
    .insert(storageDetailsTable)
    .values(storageDetails)
    .returning({ insertedId: storageDetailsTable.id });

  return {
    storageId: storageId[0].insertedId,
  };
};

export const getAvailableListings = async () => {
  return db.query.storageDetailsTable.findMany({
    with: {
      capacity: true,
    },
  });
};

export const getStorageListings = async (config: {
  limit?: number;
  cursor?: number;
  status?: StorageDetails["approvalStatus"];
}) => {
  config.cursor = config.cursor || 0;
  config.limit = config.limit || 5;

  const query = db.query.storageDetailsTable.findMany({
    orderBy: (fields, { desc }) => [desc(fields.createdAt)],
    limit: config.limit,
    offset: config.cursor,
    where: (table, { eq }) => (config.status ? eq(table.approvalStatus, config.status) : undefined),
  });

  return query;
};

export const deleteStorageListing = (id: number) => {
  return db.delete(storageDetailsTable).where(eq(storageDetailsTable.id, id));
};

export const updateStorageListingStatus = (
  id: number,
  status: StorageDetails["approvalStatus"]
) => {
  return db
    .update(storageDetailsTable)
    .set({ approvalStatus: status })
    .where(eq(storageDetailsTable.id, id));
};

export const updatePartnerRequestStatus = (
  id: number,
  status: PartnershipRequest["status"]
) => {
  return db
    .update(partnershipRequestTable)
    .set({ status: status })
    .where(eq(partnershipRequestTable.id, id));
};

export const getListingCountByStatus = (status: StorageDetails["approvalStatus"]) => {
  const query = db
    .select({
      count: count(storageDetailsTable.id),
    })
    .from(storageDetailsTable);

  if (status) {
    query.where(eq(storageDetailsTable.approvalStatus, status));
  }

  return query;
};

export const getLatestCapacityUpdate = async () => {
  const res = await db.query.capacityTable.findFirst({
    orderBy: (fields, { desc }) => [desc(fields.updatedAt)],
  });

  return res || null;
};

export const getLatestPartnerUpdate = async () => {
  const res = await db.query.storageDetailsTable.findFirst({
    orderBy: (fields, { desc }) => [desc(fields.createdAt)],
    columns: {
      id: true,
      createdAt: true,
    },
  });

  return res || null;
};

export const getListingDetails = async (id: number) => {
  return db.query.storageDetailsTable.findFirst({
    where: (table, { eq }) => eq(table.id, id),
    with: {
      capacity: true,
    },
  });
};

export const addPartnershipRequest = async (config: PartnerRequestSchema) => {
  const [res] = await db
    .insert(partnershipRequestTable)
    .values({
      businessName: config.businessName,
      contactPerson: config.contactPerson,
      phoneNumber: config.phoneNumber,
      email: config.email,
      location: config.location,
      businessType: config.businessType,
      storageSpace: config.storageSpace,
      currentMonthlyVisitors: config.currentMonthlyVisitors,
      createdAt: new Date(),
      status: "pending",
    })
    .returning({
      insertedId: partnershipRequestTable.id,
    });

  return res.insertedId;
};

export const getTotalPartnershipRequestsByRequest = async (config: {
  status?: PartnershipRequest["status"];
}) => {
  const query = db
    .select({
      count: count(partnershipRequestTable.id),
    })
    .from(partnershipRequestTable);

  if (config.status) {
    query.where(eq(partnershipRequestTable.status, config.status));
  }

  const [res] = await query;

  return res.count || 0;
};

export const getPartnershipRequests = async (config: {
  limit?: number;
  cursor?: number;
  status?: PartnershipRequest["status"];
}) => {
  config.cursor = config.cursor || 0;
  config.limit = config.limit || 5;

  const requests = await db.query.partnershipRequestTable.findMany({
    orderBy: (fields, { desc }) => [desc(fields.createdAt)],
    limit: config.limit,
    offset: config.cursor,
    where: (table, { eq }) => (config.status ? eq(table.status, config.status) : undefined),
  });

  return requests;
};

export const deletePartnershipRequest = (id: number) => {
  return db.delete(partnershipRequestTable).where(eq(partnershipRequestTable.id, id));
};
