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
import { BookingStatusSchema } from "@/lib/zod/booking";
import { getQueryKey } from "@trpc/react-query";
import { queryClient } from "@/app/(public)/components/trpc-provider";
import { StatusChip } from "@/components/ui/status-chip";

export const UpdateStatusDropdown = (props: { bookingId: number; status?: string }) => {
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
      <DropdownMenuTrigger>
        <StatusChip status={status as BookingStatusSchema}>{status}</StatusChip>
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
