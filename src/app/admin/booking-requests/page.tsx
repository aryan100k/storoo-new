"use client";

import { Button } from "@/components/ui/button";
import { BookingTable } from "@/components/data-table";
import { Breadcrumbs } from "../components/breadcrumbs";
import { bookingColumns } from "./components/columns";
import { adminRoutes } from "@/lib/routes";
import { trpc } from "@/lib/trpc";
import { Heading } from "../components/heading";

const bookingPerPage = 8;

const BookingRequestsPage = () => {
  const { data: totalBookingCount = 0, isLoading: totalBookingCountLoading } =
    trpc.getTotalBookingsCount.useQuery();
  const { isLoading, data, fetchNextPage } = trpc.getBookings.useInfiniteQuery(
    {
      limit: bookingPerPage,
      search: "",
    },
    {
      initialCursor: 0,
      getNextPageParam: (_, pages) => pages.flatMap((page) => page).length,
    }
  );

  const bookings = data?.pages.flatMap((page) => page) ?? [];
  const hasMore = data?.pages.length === 0 || bookings.length < totalBookingCount;

  return (
    <>
      <Breadcrumbs
        items={[
          {
            label: "Booking Requests",
            href: adminRoutes.bookingRequests,
          },
        ]}
      />

      <Heading>Booking Requests</Heading>

      <BookingTable columns={bookingColumns} data={bookings} isLoading={isLoading} />

      <div className="flex justify-end mt-2 gap-2">
        {!totalBookingCountLoading && (
          <span className="text-xs">
            Showing {bookings.length} of {totalBookingCount || 0}
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

export default BookingRequestsPage;
