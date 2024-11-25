"use client";

import { trpc } from "@/lib/trpc";
import { differenceInDays, differenceInHours } from "date-fns";

const getDifference = (date: string) => {
  const diffInDays = differenceInDays(new Date(), new Date(date));
  if (diffInDays > 0) {
    return `${diffInDays} days ago`;
  }

  const diffInHours = differenceInHours(new Date(), new Date(date));
  return `${diffInHours} hours ago`;
};

export const RecentActivities = () => {
  const { data: capacityDetails } = trpc.getLatestCapacityUpdate.useQuery();
  const { data: storageDetails } = trpc.getLatestPartnerUpdate.useQuery();
  const { data: bookingDetails } = trpc.getLatestBookingRequest.useQuery();

  return (
    <div className="rounded-md border p-5 bg-background">
      <span className="font-medium text-muted-foreground">Recent Activities</span>
      <ul className="space-y-2 mt-3">
        <li className="flex justify-between items-center text-xs">
          <span>New booking request</span>
          <span className="text-muted-foreground">
            {bookingDetails?.createdAt ? getDifference(bookingDetails.createdAt) : "N/A"}
          </span>
        </li>

        <li className="flex justify-between items-center text-xs">
          <span>Partner application submitted</span>
          <span className="text-muted-foreground">
            {storageDetails?.createdAt ? getDifference(storageDetails.createdAt) : "N/A"}
          </span>
        </li>

        <li className="flex justify-between items-center text-xs">
          <span>Storage point capacity updated</span>
          <span className="text-muted-foreground">
            {capacityDetails?.updatedAt ? getDifference(capacityDetails.updatedAt) : "N/A"}
          </span>
        </li>
      </ul>
    </div>
  );
};
