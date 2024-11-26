"use client";

import { useState } from "react";
import { toast } from "sonner";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { StatusChip } from "@/components/ui/status-chip";
import { showErrorToast } from "@/lib/api-errors";
import { trpc } from "@/lib/trpc";
import { getQueryKey } from "@trpc/react-query";
import { queryClient } from "@/app/(public)/components/trpc-provider";
import { StorageDetails } from "@/server/drizzle/schema";

export const UpdateStatusDropdown = (props: { bookingId: number; status?: string }) => {
  const [open, setOpen] = useState(false);

  const { status: loadingStatus, mutate: updateStatus } = trpc.updateListingStatus.useMutation({
    onSuccess: () => {
      toast("Status updated successfully");
      queryClient.refetchQueries({
        queryKey: getQueryKey(trpc.getListingsByStatus),
      });
    },
    onError: (error) => {
      showErrorToast(error.message);
    },
  });
  const status = props.status || "pending";

  const handleUpdateStatus = (status: StorageDetails["approvalStatus"]) => {
    if (!status) return;

    updateStatus({ status, id: props.bookingId });
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
        <StatusChip status={status as StorageDetails["approvalStatus"]}>{status}</StatusChip>
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
          onClick={() => handleUpdateStatus("pending")}
        >
          Pending
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
