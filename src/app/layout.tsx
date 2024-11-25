import { Metadata } from "next";
import { Inter } from "next/font/google";
import NextTopLoader from "nextjs-toploader";

import { Toaster } from "@/components/ui/sonner";
import { TRPCProvider } from "./(public)/components/trpc-provider";

import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Storoo",
  description: "Secure and Convenient Storage Solutions",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/storoo-logo-white.svg" />
      </head>

      <body className={cn("bg-background font-sans text-primary antialiased", inter.variable)}>
        <TRPCProvider>
          <NextTopLoader showSpinner={false} />
          <Toaster />

          {children}
        </TRPCProvider>
      </body>
    </html>
  );
}
