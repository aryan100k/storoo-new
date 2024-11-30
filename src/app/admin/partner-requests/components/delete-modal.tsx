import { useState } from "react";
import { toast } from "sonner";
import { getQueryKey } from "@trpc/react-query";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Loader2, Trash } from "lucide-react";
import { PartnershipRequestDetails } from "@/server/drizzle/schema";
import { trpc } from "@/lib/trpc";
import { queryClient } from "@/app/(public)/components/trpc-provider";
import { showErrorToast } from "@/lib/api-errors";

export const DeleteModal = (props: { request: PartnershipRequestDetails }) => {
  const [open, setOpen] = useState(false);
  const { status, mutate } = trpc.deletePartnershipRequest.useMutation({
    onSuccess: () => {
      setOpen(false);
      toast("Request deleted successfully");
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

  const loading = status === "pending";

  if (!props.request.id) return null;

  return (
    <AlertDialog
      open={open}
      onOpenChange={(flag) => {
        if (loading) return;
        setOpen(flag);
      }}
    >
      <AlertDialogTrigger asChild>
        <Button variant="ghost" size="icon" title="Delete booking">
          <Trash size={16} />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the request by{" "}
            {props.request.businessName}.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button
              size="sm"
              variant={"destructive"}
              className="bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90"
              disabled={loading}
              onClick={(e) => {
                e.preventDefault();
                mutate(props.request.id!);
              }}
            >
              Delete
              {loading && <Loader2 size={16} className="animate-spin" />}
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
