"use client";

import { trpc } from "@/lib/trpc";
import { Breadcrumbs } from "../components/breadcrumbs";
import { Heading } from "../components/heading";
import { adminRoutes } from "@/lib/routes";
import { requestsColumns } from "./components/columns";
import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";

const partnersPerPage = 8;

const PartnerRequestsPage = () => {
  const { isLoading: isTotalLoading, data: totalRequests = 0 } =
    trpc.getTotalPartnershipRequestsByRequest.useQuery({});
  const { isLoading, data, fetchNextPage } = trpc.getPartnershipRequests.useInfiniteQuery(
    {
      limit: partnersPerPage,
    },
    {
      initialCursor: 0,
      getNextPageParam: (_, pages) => pages.flatMap((page) => page).length,
    }
  );

  const requests = data?.pages.flatMap((page) => page) ?? [];
  const hasMore = data?.pages.length === 0 || requests.length < totalRequests;

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

      <Heading>Partner Requests</Heading>

      <DataTable columns={requestsColumns} data={requests} isLoading={isLoading} />

      <div className="flex justify-end mt-2 gap-2">
        {!isTotalLoading && (
          <span className="text-xs">
            Showing {requests.length} of {totalRequests}
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

export default PartnerRequestsPage;
