import { cn } from "@/lib/utils";
import { PropsWithChildren } from "react";

const statusClass = {
  approved: "bg-blue-50 text-blue-600 border-blue-300",
  pending: "bg-yellow-50 text-yellow-600 border-yellow-300",
  rejected: "bg-red-50 text-red-600 border-red-300",
  completed: "bg-green-50 text-green-600 border-green-300",
  cancelled: "bg-gray-50 text-gray-600 border-gray-300",
  other: "bg-gray-50 text-gray-600 border-gray-300",
} as const;

type Status = keyof typeof statusClass;

export const StatusChip = (
  props: PropsWithChildren<{
    status?: Status;
  }>
) => {
  return (
    <span
      className={cn(
        "text-xs border px-2 py-0.5 bg-muted rounded-full",
        statusClass[props.status!] || statusClass.other
      )}
    >
      {props.children}
    </span>
  );
};
