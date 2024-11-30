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
import { useRouter } from "next/navigation";

export const UpdateStatusDropdown = (props: {
  listingId: number;
  status?: string;
  className?: string;
}) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const { status: loadingStatus, mutate: updateStatus } = trpc.updateListingStatus.useMutation({
    onSuccess: () => {
      toast("Status updated successfully");
      router.refresh();
      queryClient.refetchQueries({
        queryKey: getQueryKey(trpc.getListingsByStatus),
      });
      queryClient.refetchQueries({
        queryKey: getQueryKey(trpc.getListingCountByStatus),
      });
    },
    onError: (error) => {
      showErrorToast(error.message);
    },
  });
  const status = props.status || "pending";

  const handleUpdateStatus = (status: StorageDetails["approvalStatus"]) => {
    if (!status) return;

    updateStatus({ status, id: props.listingId });
  };

  return (
    <DropdownMenu
      open={open}
      onOpenChange={(flag) => {
        if (loadingStatus === "pending") return;
        setOpen(flag);
      }}
    >
      <DropdownMenuTrigger className={props.className}>
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
