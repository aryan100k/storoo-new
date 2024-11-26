"use client";

import Link from "next/link";
import { format } from "date-fns";
import { ColumnDef } from "@tanstack/react-table";
import { BookingDetails } from "@/server/drizzle/schema";
import { luggageTypeMap } from "@/lib/zod/booking";
import { cn } from "@/lib/utils";
import { BookingDetailsModal } from "./details-modal";
import { StatusDropdown } from "./status-dropdown";

export const bookingColumns: ColumnDef<BookingDetails>[] = [
  {
    header: "Name",
    accessorKey: "name",
  },
  {
    header: "Contact",
    accessorKey: "phone",
    cell: ({ row }) => {
      const phone = row.getValue("phone") as string;
      return (
        <Link href={`tel:${phone}`} target="_blank" className="hover:underline">
          {phone}
        </Link>
      );
    },
  },
  {
    header: "Start Date",
    accessorFn: (data) => format(data.startDate, "dd/MM/yyyy"),
  },
  {
    header: "End Date",
    accessorFn: (data) => format(data.endDate, "dd/MM/yyyy"),
  },
  {
    header: "Luggage",
    accessorKey: "luggageType",
    accessorFn: (data) => luggageTypeMap[data.luggageType] || data.luggageType,
  },
  {
    header: "Status",
    accessorKey: "status",
    cell: ({ row }) => {
      if (!row.original.id) {
        return;
      }

      return <StatusDropdown bookingId={row.original.id} status={row.original.status} />;
    },
  },
  {
    header: "Created At",
    accessorFn: (data) => (data.createdAt ? format(data.createdAt, "dd/MM/yyyy") : ""),
  },
  {
    id: "actions",
    header: "",
    cell: ({ row }) => {
      return <BookingDetailsModal booking={row.original} />;
    },
  },
];
