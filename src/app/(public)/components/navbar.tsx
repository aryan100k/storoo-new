import Link from "next/link";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { BookNowDialog } from "@/components/book-storage-dialog";
import { Menu } from "lucide-react";
import { LoginLogoutBtn } from "./login-logout-btn";

const links = [
  {
    title: "How It Works",
    href: "#how-it-works",
  },
  {
    title: "Locations",
    href: "/locations",
  },
  {
    title: "Contact",
    href: "#",
  },
];

export const Navbar = () => {
  return (
    <div className="container mx-auto py-3 flex justify-between items-center">
      <Link href="/" className="text-2xl font-bold text-brand">
        Storoo
      </Link>
      <nav className="hidden md:flex gap-6 items-center">
        {links.map((link) => (
          <Link
            key={link.title}
            href={link.href}
            className="text-gray-600 hover:text-brand text-sm"
          >
            {link.title}
          </Link>
        ))}

        <LoginLogoutBtn size="sm" />
      </nav>

      <Sheet>
        <SheetTrigger asChild>
          <button className="md:hidden" title="navigation">
            <Menu className="w-6 h-6" />
          </button>
        </SheetTrigger>
        <SheetContent side="right" className="flex flex-col items-start">
          <SheetHeader>
            <SheetTitle className="sr-only">Navigation</SheetTitle>
            <SheetDescription className="sr-only">Use the links below to navigate</SheetDescription>
          </SheetHeader>

          {links.map((link) => (
            <SheetClose key={link.title} asChild>
              <Link href={link.href} className="w-full">
                {link.title}
              </Link>
            </SheetClose>
          ))}

          <div className="mt-auto w-full flex flex-col gap-2">
            <LoginLogoutBtn className="w-full" />

            <BookNowDialog>
              <button className="w-full px-4 py-2 bg-brand text-white rounded-md">
                Find Storage
              </button>
            </BookNowDialog>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};
