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
import { PartnershipRequestDetails } from "@/server/drizzle/schema";
import { useRouter } from "next/navigation";

export const UpdateStatusDropdown = (props: {
  requestId: number;
  status?: string;
  className?: string;
}) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const { status: loadingStatus, mutate: updateStatus } = trpc.updatePartnerRequestStatus.useMutation({
    onSuccess: () => {
      toast("Status updated successfully");
      router.refresh();
      queryClient.refetchQueries({
        queryKey: getQueryKey(trpc.getPartnershipRequests),
      });
      queryClient.refetchQueries({
        queryKey: getQueryKey(trpc.getTotalPartnershipRequestsByRequest),
      });
    },
    onError: (error) => {
      showErrorToast(error.message);
    },
  });
  const status = props.status || "pending";

  const handleUpdateStatus = (status: PartnershipRequestDetails["status"]) => {
    if (!status) return;

    updateStatus({ status, id: props.requestId });
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
        <StatusChip status={status as PartnershipRequestDetails["status"]}>{status}</StatusChip>
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
