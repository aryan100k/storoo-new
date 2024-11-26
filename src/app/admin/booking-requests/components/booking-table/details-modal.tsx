import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { BookingDetails } from "@/server/drizzle/schema";
import Link from "next/link";
import { format } from "date-fns";
import { luggageTypeMap } from "@/lib/zod/booking";

export const BookingDetailsModal = (props: { booking: BookingDetails }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          View
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Booking Details</DialogTitle>
          <DialogDescription>Details of the booking.</DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-2">
          <div>
            <span className="font-semibold">Name:</span> {props.booking.name}
          </div>
          <div>
            <span className="font-semibold">Contact: </span>
            <Link href={`tel:${props.booking.phone}`} target="_blank" className="hover:underline">
              {props.booking.phone}
            </Link>
          </div>
          <div>
            <span className="font-semibold">Start Date:</span>{" "}
            {props.booking.startDate && format(props.booking.startDate, "dd/MM/yyyy")}
          </div>
          <div>
            <span className="font-semibold">End Date:</span>{" "}
            {props.booking.endDate && format(props.booking.endDate, "dd/MM/yyyy")}
          </div>
          <div>
            <span className="font-semibold">Luggage:</span>{" "}
            {luggageTypeMap[props.booking.luggageType] || props.booking.luggageType}
          </div>
          <div>
            <span className="font-semibold">CreatedAt:</span>{" "}
            {props.booking.createdAt && format(props.booking.createdAt, "dd/MM/yyyy")}
          </div>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button>Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
