import { PropsWithChildren } from "react";
import { redirect } from "next/navigation";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AdminSidebar } from "./components/side-bar";
import { TopBar } from "./components/top-bar";

import { getUser } from "@/server/trpc/context";
import { routes } from "@/lib/routes";

const AdminLayout = async (props: PropsWithChildren) => {
  const user = await getUser();

  if (!user?.id) {
    redirect(routes.login);
  }

  return (
    <SidebarProvider>
      <AdminSidebar />
      <SidebarInset className="bg-muted">
        <TopBar />
        <main className="container md:px-3 py-3 md:py-4 flex-grow">{props.children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default AdminLayout;
