import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { PropsWithChildren } from "react";
import { AppSidebar } from "./components/side-bar";

const AdminLayout = (props: PropsWithChildren) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <SidebarTrigger />
        {props.children}
      </SidebarInset>
    </SidebarProvider>
  );
};

export default AdminLayout;
