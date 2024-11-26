"use client";

import Link from "next/link";
import { format } from "date-fns";
import { ColumnDef } from "@tanstack/react-table";

import { BookingDetailsModal } from "./details-modal";
import { UpdateStatusDropdown } from "./update-status-dropdown";
import { DeleteModal } from "./delete-modal";
import { BookingDetails } from "@/server/drizzle/schema";
import { luggageTypeMap } from "@/lib/zod/booking";

export const bookingColumns: ColumnDef<BookingDetails>[] = [
  {
    header: "Name",
    accessorKey: "name",
    cell: ({ row }) => <span className="whitespace-nowrap">{row.getValue("name")}</span>,
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
    cell: ({ row }) => {
      const luggageType = row.getValue("luggageType") as keyof typeof luggageTypeMap;
      return (
        <span className="whitespace-nowrap">{luggageTypeMap[luggageType] || luggageType}</span>
      );
    },
  },
  {
    header: "Status",
    accessorKey: "status",
    cell: ({ row }) => {
      if (!row.original.id) {
        return;
      }

      return <UpdateStatusDropdown bookingId={row.original.id} status={row.original.status} />;
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
      return (
        <div className="flex items-center gap-2">
          <BookingDetailsModal booking={row.original} />
          <DeleteModal booking={row.original} />
        </div>
      );
    },
  },
];
