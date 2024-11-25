"use client";

import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";
import { Menu } from "lucide-react";
import { UserAvatar } from "./user-avatar";

export const TopBar = () => {
  const { open, isMobile, setOpen, setOpenMobile, openMobile, state } = useSidebar();

  return (
    <div className="flex items-center border-b py-2 px-4 justify-between h-12">
      <div className="flex items-center gap-3">
        {(state === "collapsed" || isMobile) && (
          <>
            <Button
              data-sidebar="trigger"
              variant="outline"
              size="icon"
              className="w-7 h-7"
              onClick={(event) => {
                isMobile ? setOpenMobile(!openMobile) : setOpen(!open);
              }}
            >
              <Menu />
            </Button>
            <span className="font-semibold text-lg text-brand">Storoo Admin</span>
          </>
        )}
      </div>

      <UserAvatar />
    </div>
  );
};
