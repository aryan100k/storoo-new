"use client";

import { Button } from "@/components/ui/button";
import { BookingTable } from "@/components/data-table";
import { Breadcrumbs } from "../components/breadcrumbs";
import { bookingColumns } from "./components/columns";
import { Heading } from "../components/heading";
import { StatusSelect, useStatus } from "./components/status-select";

import { trpc } from "@/lib/trpc";
import { adminRoutes } from "@/lib/routes";

const bookingPerPage = 8;

const BookingRequestsPage = () => {
  const selectedStatus = useStatus();

  const { data: totalBookingCount = 0, isLoading: totalBookingCountLoading } =
    trpc.getTotalBookingsCount.useQuery({
      status: selectedStatus,
    });
  const { isLoading, data, fetchNextPage } = trpc.getBookings.useInfiniteQuery(
    {
      limit: bookingPerPage,
      status: selectedStatus,
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

      <div className="flex justify-between flex-col md:flex-row">
        <Heading>Booking Requests</Heading>
        <StatusSelect />
      </div>

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
