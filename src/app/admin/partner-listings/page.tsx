"use client";

import { Button } from "@/components/ui/button";
import { BookingTable } from "@/components/data-table";
import { Breadcrumbs } from "../components/breadcrumbs";
import { bookingColumns } from "./components/columns";
import { adminRoutes } from "@/lib/routes";
import { trpc } from "@/lib/trpc";
import { Heading } from "../components/heading";

const bookingPerPage = 8;

const PartnerListingsPage = () => {
  const { data: totalListingCount = 0, isLoading: totalListingCountLoading } =
    trpc.getListingCountByStatus.useQuery();
  const { isLoading, data, fetchNextPage } = trpc.getListingsByStatus.useInfiniteQuery(
    {
      limit: bookingPerPage,
    },
    {
      initialCursor: 0,
      getNextPageParam: (_, pages) => pages.flatMap((page) => page).length,
    }
  );

  const bookings = data?.pages.flatMap((page) => page) ?? [];
  const hasMore = data?.pages.length === 0 || bookings.length < totalListingCount;

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

      <Heading>Partner Listings</Heading>

      <BookingTable columns={bookingColumns} data={bookings} isLoading={isLoading} />

      <div className="flex justify-end mt-2 gap-2">
        {!totalListingCountLoading && (
          <span className="text-xs">
            Showing {bookings.length} of {totalListingCount || 0}
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
