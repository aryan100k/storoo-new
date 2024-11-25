import { PropsWithChildren } from "react";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { GlobalSidebar } from "./components/side-bar";
import { TopBar } from "./components/top-bar";
import { getUser } from "@/server/trpc/context";
import { redirect } from "next/navigation";
import { routes } from "@/lib/routes";

const AdminLayout = async (props: PropsWithChildren) => {
  const user = await getUser();

  if (!user?.id) {
    redirect(routes.login);
  }

  return (
    <SidebarProvider>
      <GlobalSidebar />
      <SidebarInset>
        <TopBar />
        {props.children}
      </SidebarInset>
    </SidebarProvider>
  );
};

export default AdminLayout;
