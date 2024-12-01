"use client";

import Link from "next/link";
import { format } from "date-fns";
import { ColumnDef } from "@tanstack/react-table";

import { PartnershipRequestDetails } from "@/server/drizzle/schema";
import { DeleteModal } from "./delete-modal";
import { UpdateStatusDropdown } from "./update-status-dropdown";

export const requestsColumns: ColumnDef<PartnershipRequestDetails>[] = [
  {
    header: "Business Name",
    accessorKey: "businessName",
    cell: ({ row }) => <span className="whitespace-nowrap">{row.getValue("businessName")}</span>,
  },
  {
    header: "Name",
    accessorKey: "contactPerson",
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
    header: "Storage Space",
    accessorKey: "storageSpace",
    cell: ({ row }) => {
      return <span className="whitespace-nowrap capitalize">{row.original.storageSpace}</span>;
    },
  },
  {
    header: "Status",
    accessorKey: "status",
    cell: ({ row }) => {
      if (!row.original.id) {
        return;
      }

      return (
        <UpdateStatusDropdown requestId={row.original.id} status={row.original.status} />
      );
    },
  },
  {
    header: "Created At",
    accessorFn: (data) => (data.createdAt ? format(data.createdAt, "dd/MM/yyyy") : ""),
  },
  {
    id: "actions",
    header: "",
    cell: ({ row }) => <DeleteModal request={row.original} />,
  },
];
