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
import { BookingDetails } from "@/server/drizzle/schema";
import { trpc } from "@/lib/trpc";
import { queryClient } from "@/app/(public)/components/trpc-provider";
import { showErrorToast } from "@/lib/api-errors";

export const DeleteModal = (props: { booking: BookingDetails }) => {
  const [open, setOpen] = useState(false);
  const { status, mutate } = trpc.deleteBooking.useMutation({
    onSuccess: () => {
      setOpen(false);
      toast("Booking deleted successfully");
      queryClient.refetchQueries({
        queryKey: getQueryKey(trpc.getBookings),
      });
      queryClient.refetchQueries({
        queryKey: getQueryKey(trpc.getTotalBookingsCount),
      });
    },
    onError: (error) => {
      showErrorToast(error.message);
    },
  });

  const loading = status === "pending";

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
            This action cannot be undone. This will permanently delete the booking by{" "}
            {props.booking.name}.
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
                mutate(props.booking.id!);
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
