"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { adminRoutes } from "@/lib/routes";
import { BookOpen, Home, Package, Users } from "lucide-react";
import { LogoutBtn } from "./logout-btn";

const navBarItems = [
  {
    title: "Dashboard",
    href: adminRoutes.dashboard,
    icon: Home,
  },
  {
    title: "Booking Requests",
    href: adminRoutes.bookingRequests,
    icon: BookOpen,
  },
  {
    title: "Partner Listings",
    href: adminRoutes.partnerListings,
    icon: Users,
  },
  {
    title: "Storage Points",
    href: adminRoutes.storagePoints,
    icon: Package,
  },
];

export const AdminSidebar = () => {
  const pathname = usePathname();

  return (
    <Sidebar variant="sidebar" className="bg-background">
      <SidebarHeader className="flex items-center justify-between flex-row px-4 bg-background">
        <span className="text-lg font-semibold text-brand">Storoo Admin</span>
        <SidebarTrigger />
      </SidebarHeader>

      <SidebarContent className="bg-background">
        <SidebarGroup>
          <SidebarGroupLabel>Admin Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            {navBarItems.map((item) => (
              <SidebarMenu key={item.title}>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.href}
                    className="[&>svg]:size-3 text-xs"
                  >
                    <Link href={item.href}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            ))}
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="bg-background px-4 pb-4">
        <LogoutBtn />
      </SidebarFooter>
    </Sidebar>
  );
};
