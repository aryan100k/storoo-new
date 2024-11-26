import { useMemo } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useURLParams } from "@/hooks/use-url-params";
import { listingStatusSchema } from "@/lib/zod/listing";

export const statusParamKey = "status";

export const StatusSelect = () => {
  const { searchParams, updateParams } = useURLParams();
  const selectedStatus = searchParams.get(statusParamKey) || "";

  return (
    <Select value={selectedStatus} onValueChange={(v) => updateParams(statusParamKey, v)}>
      <SelectTrigger className="w-48 bg-background">
        <SelectValue placeholder="Status" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All Status</SelectItem>
        <SelectItem value="approved">Approved</SelectItem>
        <SelectItem value="rejected">Rejected</SelectItem>
        <SelectItem value="pending">Pending</SelectItem>
      </SelectContent>
    </Select>
  );
};

export const useStatus = () => {
  const { searchParams } = useURLParams();

  const selectedStatusParam = searchParams.get(statusParamKey);
  const selectedStatus = useMemo(() => {
    const res = listingStatusSchema.safeParse(selectedStatusParam);
    return res.success ? res.data : undefined;
  }, [selectedStatusParam]);

  return selectedStatus;
};
