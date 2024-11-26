"use client";

import { trpc } from "@/lib/trpc";
import { BookOpen, Loader2, Package, Users } from "lucide-react";

export const OverviewCards = () => {
  const { data: pendingCount, isLoading: pendingCountLoading } =
    trpc.getListingCountByStatus.useQuery({ status: "pending" });
  const { data: approvedCount, isLoading: approvedCountLoading } =
    trpc.getListingCountByStatus.useQuery({ status: "approved" });
  const { data: totalBookingCount, isLoading: totalBookingCountLoading } =
    trpc.getBookingsTotalBookingsCount.useQuery();

  const isLoading = pendingCountLoading || approvedCountLoading || totalBookingCountLoading;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div className="rounded-md border p-5 bg-background">
        <div className="flex flex-row items-center justify-between space-y-0 pb-2">
          <span className="text-xs text-muted-foreground font-medium">Total Booking Requests</span>
          <BookOpen className="h-4 w-4 text-muted-foreground" />
        </div>
        <span className="text-xl font-bold">
          {isLoading ? <span className="text-muted-foreground">...</span> : totalBookingCount}
        </span>
      </div>

      <div className="rounded-md border p-5 bg-background">
        <div className="flex flex-row items-center justify-between space-y-0 pb-2">
          <span className="text-xs text-muted-foreground font-medium">Active Storage Points</span>
          <Package className="h-4 w-4 text-muted-foreground" />
        </div>
        <div className="text-xl font-bold">
          {isLoading ? <span className="text-muted-foreground">...</span> : approvedCount}
        </div>
      </div>

      <div className="rounded-md border p-5 bg-background">
        <div className="flex flex-row items-center justify-between space-y-0 pb-2">
          <span className="text-xs text-muted-foreground font-medium">
            Pending Partner Applications
          </span>
          <Users className="h-4 w-4 text-muted-foreground" />
        </div>
        <div className="text-xl font-bold">
          {isLoading ? <span className="text-muted-foreground">...</span> : pendingCount}
        </div>
      </div>
    </div>
  );
};
