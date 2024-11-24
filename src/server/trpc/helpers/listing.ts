import { ListingSchema } from "@/lib/zod/listing";
import { db } from "@/server/drizzle/db";
import { capacityTable, StorageDetails, storageDetailsTable } from "@/server/drizzle/schema";

export const addListingRequest = async (listing: ListingSchema) => {
  const capacityId = await db
    .insert(capacityTable)
    .values({
      oddSize: listing.storageCapacity.oddSided,
      regular: listing.storageCapacity.regular,
      small: listing.storageCapacity.small,
    })
    .returning({ insertedId: capacityTable.id });

  const storageDetails: StorageDetails = {
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
    createdAt: new Date().toISOString(),
    capacityId: capacityId[0].insertedId,
    approvalStatus: "pending",
    latitude: 0,
    longitude: 0,
  };

  const storageId = await db
    .insert(storageDetailsTable)
    .values(storageDetails)
    .returning({ insertedId: storageDetailsTable.id });

  return {
    storageId: storageId[0].insertedId,
  };
};
