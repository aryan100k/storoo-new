"use client";

import { Button } from "@/components/ui/button";
import { Breadcrumbs } from "../components/breadcrumbs";
import { Heading } from "../components/heading";
import { DataTable } from "@/components/data-table";
import { listingColumns } from "../partner-listings/components/columns";

import { adminRoutes } from "@/lib/routes";
import { trpc } from "@/lib/trpc";

const bookingPerPage = 8;

const StoragePointsPage = () => {
  const { data: totalListingCount = 0, isLoading: totalListingCountLoading } =
    trpc.getListingCountByStatus.useQuery({
      status: "approved",
    });
  const { isLoading, data, fetchNextPage } = trpc.getListingsByStatus.useInfiniteQuery(
    {
      limit: bookingPerPage,
      status: "approved",
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
            label: "Storage Points",
            href: adminRoutes.storagePoints,
          },
        ]}
      />

      <Heading>Storage Points</Heading>

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

export default StoragePointsPage;
