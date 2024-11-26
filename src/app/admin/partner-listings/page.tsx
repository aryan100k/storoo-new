"use client";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/data-table";
import { Breadcrumbs } from "../components/breadcrumbs";
import { listingColumns } from "./components/columns";
import { Heading } from "../components/heading";
import { StatusSelect, useStatus } from "./components/status-select";

import { adminRoutes } from "@/lib/routes";
import { trpc } from "@/lib/trpc";

const bookingPerPage = 8;

const PartnerListingsPage = () => {
  const selectedStatus = useStatus();

  const { data: totalListingCount = 0, isLoading: totalListingCountLoading } =
    trpc.getListingCountByStatus.useQuery({
      status: selectedStatus,
    });
  const { isLoading, data, fetchNextPage } = trpc.getListingsByStatus.useInfiniteQuery(
    {
      limit: bookingPerPage,
      status: selectedStatus,
    },
    {
      initialCursor: 0,
      getNextPageParam: (_, pages) => pages.flatMap((page) => page).length,
    }
  );

  const listings = data?.pages.flatMap((page) => page) ?? [];
  const hasMore = data?.pages.length === 0 || listings.length < totalListingCount;

  return (
    <>
      <Breadcrumbs
        items={[
          {
            label: "Partner Listings",
            href: adminRoutes.partnerListings,
          },
        ]}
      />

      <div className="flex justify-between flex-col md:flex-row">
        <Heading>Partner Listings</Heading>
        <StatusSelect />
      </div>

      <DataTable columns={listingColumns} data={listings} isLoading={isLoading} />

      <div className="flex justify-end mt-2 gap-2">
        {!totalListingCountLoading && (
          <span className="text-xs">
            Showing {listings.length} of {totalListingCount || 0}
          </span>
        )}

        <Button
          size="sm"
          className="ml-auto"
          variant="outline"
          onClick={() => fetchNextPage()}
          disabled={isLoading || !hasMore}
        >
          Load More
        </Button>
      </div>
    </>
  );
};

export default PartnerListingsPage;
