"use client";

import { cn } from "@/lib/utils";
import { luggageTypeMap } from "@/lib/zod/booking";
import { BookingDetails } from "@/server/drizzle/schema";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import Link from "next/link";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
  id: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
  email: string;
};

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
    accessorFn: (data) => luggageTypeMap[data.luggageType] || "",
  },
  {
    header: "Status",
    accessorKey: "status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      const statusClass = {
        approved: "bg-blue-100 text-blue-800 border-blue-400",
        pending: "bg-yellow-100 text-yellow-800 border-yellow-400",
        rejected: "bg-red-100 text-red-800 border-red-400",
        completed: "bg-green-100 text-green-800 border-green-400",
      };

      return (
        <span
          className={cn(
            "text-xs border px-2 py-0.5 bg-muted rounded-full",
            statusClass[status as keyof typeof statusClass]
          )}
        >
          {status}
        </span>
      );
    },
  },
  {
    header: "Created At",
    accessorFn: (data) => (data.createdAt ? format(data.createdAt, "dd/MM/yyyy") : ""),
  },
];
