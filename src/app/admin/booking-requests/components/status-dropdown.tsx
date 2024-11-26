"use client";

import { useState } from "react";
import { toast } from "sonner";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { showErrorToast } from "@/lib/api-errors";
import { trpc } from "@/lib/trpc";
import { cn } from "@/lib/utils";
import { BookingStatusSchema } from "@/lib/zod/booking";
import { getQueryKey } from "@trpc/react-query";
import { queryClient } from "@/app/(public)/components/trpc-provider";

const statusClass: Record<BookingStatusSchema, string> = {
  approved: "bg-blue-100 text-blue-800 border-blue-400",
  pending: "bg-yellow-100 text-yellow-800 border-yellow-400",
  rejected: "bg-red-100 text-red-800 border-red-400",
  completed: "bg-green-100 text-green-800 border-green-400",
  cancelled: "bg-gray-100 text-gray-800 border-gray-400",
  other: "bg-gray-100 text-gray-800 border-gray-400",
};

export const StatusDropdown = (props: { bookingId: number; status?: string }) => {
  const [open, setOpen] = useState(false);
  const { status: loadingStatus, mutate: updateBookingStatus } =
    trpc.updateBookingStatus.useMutation({
      onSuccess: () => {
        toast("Status updated successfully");
        queryClient.refetchQueries({
          queryKey: getQueryKey(trpc.getBookings),
        });
      },
      onError: (error) => {
        showErrorToast(error.message);
      },
    });
  const status = props.status || "pending";

  const handleUpdateStatus = (status: BookingStatusSchema) => {
    updateBookingStatus({ status, bookingId: props.bookingId });
  };

  return (
    <DropdownMenu
      open={open}
      onOpenChange={(flag) => {
        if (loadingStatus === "pending") return;
        setOpen(flag);
      }}
    >
      <DropdownMenuTrigger asChild>
        <span
          className={cn(
            "text-xs border px-2 py-0.5 bg-muted rounded-full",
            statusClass[status as BookingStatusSchema] || statusClass.other
          )}
        >
          {status}
        </span>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem
          disabled={loadingStatus === "pending"}
          onClick={() => handleUpdateStatus("approved")}
        >
          Approve
        </DropdownMenuItem>
        <DropdownMenuItem
          disabled={loadingStatus === "pending"}
          onClick={() => handleUpdateStatus("rejected")}
        >
          Reject
        </DropdownMenuItem>
        <DropdownMenuItem
          disabled={loadingStatus === "pending"}
          onClick={() => handleUpdateStatus("completed")}
        >
          Complete
        </DropdownMenuItem>
        <DropdownMenuItem
          disabled={loadingStatus === "pending"}
          onClick={() => handleUpdateStatus("cancelled")}
        >
          Cancel
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
