"use client";

import Link from "next/link";
import { format } from "date-fns";
import { ColumnDef } from "@tanstack/react-table";

import { UpdateStatusDropdown } from "./update-status-dropdown";
import { DeleteModal } from "./delete-modal";
import { StorageDetails } from "@/server/drizzle/schema";
import { Button } from "@/components/ui/button";
import { adminRoutes } from "@/lib/routes";

export const bookingColumns: ColumnDef<StorageDetails>[] = [
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
    header: "Address",
    accessorKey: "locality",
    cell: ({ row }) => {
      return (
        <span className="whitespace-nowrap capitalize">
          {row.original.locality}, {row.original.city}
        </span>
      );
    },
  },
  {
    header: "Type",
    accessorKey: "spaceType",
    cell: ({ row }) => {
      return <span className="whitespace-nowrap capitalize">{row.original.spaceType}</span>;
    },
  },
  {
    header: "Status",
    accessorKey: "approvalStatus",
    cell: ({ row }) => {
      if (!row.original.id) {
        return;
      }

      return (
        <UpdateStatusDropdown listingId={row.original.id} status={row.original.approvalStatus} />
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
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" asChild>
            <Link href={adminRoutes.partnerListingDetails(row.original.id!)}>View</Link>
          </Button>
          <DeleteModal listing={row.original} />
        </div>
      );
    },
  },
];
