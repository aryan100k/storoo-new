import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { BookingDetails } from "@/server/drizzle/schema";
import Link from "next/link";
import { format } from "date-fns";
import { luggageTypeMap } from "@/lib/zod/booking";
import { StatusDropdown } from "./status-dropdown";
import { Separator } from "@/components/ui/separator";
import { Fragment } from "react";

export const BookingDetailsModal = (props: { booking: BookingDetails }) => {
  const data = [
    {
      title: "Name",
      value: props.booking.name,
    },
    {
      title: "Contact",
      value: props.booking.phone ? (
        <Link href={`tel:${props.booking.phone}`}>{props.booking.phone}</Link>
      ) : (
        "-"
      ),
    },
    {
      title: "Start Date",
      value: props.booking.startDate && format(props.booking.startDate, "dd/MM/yyyy"),
    },
    {
      title: "End Date",
      value: props.booking.endDate && format(props.booking.endDate, "dd/MM/yyyy"),
    },
    {
      title: "Luggage",
      value: luggageTypeMap[props.booking.luggageType] || props.booking.luggageType,
    },
    {
      title: "Status",
      value: !!props.booking.id && (
        <StatusDropdown bookingId={props.booking.id} status={props.booking.status} />
      ),
    },
    {
      title: "CreatedAt",
      value: props.booking.createdAt && format(props.booking.createdAt, "dd/MM/yyyy"),
    },
  ];

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

        <div className="flex flex-col gap-2 text-sm">
          {data.map((item, index) => (
            <Fragment key={index}>
              <div key={index} className="flex justify-between items-center">
                <span className="font-medium">{item.title}:</span> {item.value}
              </div>
              {index !== data.length - 1 && <Separator />}
            </Fragment>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};
