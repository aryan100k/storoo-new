import { Fragment } from "react";
import Link from "next/link";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { routes } from "@/lib/routes";

export type Breadcrumb = {
  label: string;
  href: string;
};

export const Breadcrumbs = ({
  items,
  addHome = false,
  className,
}: {
  items: Breadcrumb[];
  addHome?: boolean;
  className?: string;
}) => {
  return (
    <Breadcrumb className={className}>
      <BreadcrumbList>
        {addHome && (
          <>
            <BreadcrumbItem>
              <Link className="transition-colors hover:text-foreground" href={routes.home}>
                Home
              </Link>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
          </>
        )}

        {items.map((item, index) => (
          <Fragment key={item.href}>
            <BreadcrumbItem key={item.href}>
              <Link className="capitalize transition-colors hover:text-foreground" href={item.href}>
                {item.label}
              </Link>
            </BreadcrumbItem>
            {index < items.length - 1 && <BreadcrumbSeparator />}
          </Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};
