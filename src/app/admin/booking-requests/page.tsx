"use client";

import { Breadcrumbs } from "../components/breadcrumbs";
import { BookingTable } from "./components/booking-table";
import { bookingColumns } from "./components/booking-table/columns";
import { adminRoutes } from "@/lib/routes";
import { trpc } from "@/lib/trpc";

const BookingRequestsPage = () => {
  const { isLoading, data, fetchNextPage } = trpc.getBookings.useInfiniteQuery(
    {
      limit: 10,
      search: "",
    },
    {
      initialCursor: 0,
      getNextPageParam: (lastPage) => {
        return lastPage?.at(-1)?.id;
      },
    }
  );

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

      <BookingTable columns={bookingColumns} data={data?.pages.flatMap((page) => page) ?? []} />
    </>
  );
};

export default BookingRequestsPage;
