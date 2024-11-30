"use client";

import Link from "next/link";
import { format } from "date-fns";
import { ColumnDef } from "@tanstack/react-table";

import { PartnershipRequest } from "@/server/drizzle/schema";

export const requestsColumns: ColumnDef<PartnershipRequest>[] = [
  {
    header: "Business Name",
    accessorKey: "businessName",
    cell: ({ row }) => <span className="whitespace-nowrap">{row.getValue("businessName")}</span>,
  },
  {
    header: "Name",
    accessorKey: "contactName",
  },
  {
    header: "Contact",
    accessorKey: "phoneNumber",
    cell: ({ row }) => {
      const phone = row.original.phoneNumber;
      const email = row.original.email;
      return (
        <div className="flex flex-col">
          <Link href={`tel:${phone}`} target="_blank" className="hover:underline">
            {phone}
          </Link>
          <Link href={`mailto:${email}`} target="_blank" className="hover:underline">
            {email}
          </Link>
        </div>
      );
    },
  },
  {
    header: "Address",
    accessorKey: "location",
    cell: ({ row }) => {
      return <span className="whitespace-nowrap capitalize">{row.original.location}</span>;
    },
  },
  {
    header: "Type",
    accessorKey: "currentMonthlyVisitors",
  },
  {
    header: "Type",
    accessorKey: "businessType",
    cell: ({ row }) => {
      return <span className="whitespace-nowrap capitalize">{row.original.businessType}</span>;
    },
  },
  {
    header: "Type",
    accessorKey: "storageSpace",
    cell: ({ row }) => {
      return <span className="whitespace-nowrap capitalize">{row.original.storageSpace}</span>;
    },
  },
  {
    header: "Created At",
    accessorFn: (data) => (data.createdAt ? format(data.createdAt, "dd/MM/yyyy") : ""),
  },
];
