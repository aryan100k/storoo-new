ALTER TABLE "storage_details" ALTER COLUMN "latitude" SET DATA TYPE numeric;--> statement-breakpoint
ALTER TABLE "storage_details" ALTER COLUMN "latitude" SET DEFAULT '0';--> statement-breakpoint
ALTER TABLE "storage_details" ALTER COLUMN "longitude" SET DATA TYPE numeric;--> statement-breakpoint
ALTER TABLE "storage_details" ALTER COLUMN "longitude" SET DEFAULT '0';