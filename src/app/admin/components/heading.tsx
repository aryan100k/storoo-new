import { cn } from "@/lib/utils";
import { PropsWithChildren } from "react";

export const Heading = (
  props: PropsWithChildren<{
    className?: string;
  }>
) => {
  return (
    <h1 className={cn("md:text-xl text-lg font-medium mb-2", props.className)}>{props.children}</h1>
  );
};
