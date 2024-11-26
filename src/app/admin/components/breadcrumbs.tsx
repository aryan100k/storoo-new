import { Breadcrumb, Breadcrumbs as BaseBreadcrumbs } from "@/components/breadcrumbs";
import { adminRoutes } from "@/lib/routes";

export const Breadcrumbs = (props: { items?: Breadcrumb[] }) => {
  return (
    <BaseBreadcrumbs
      addHome={false}
      items={[{ label: "Dashboard", href: adminRoutes.dashboard }, ...(props.items || [])]}
    />
  );
};
