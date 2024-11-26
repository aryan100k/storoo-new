import { Metadata } from "next";
import NextTopLoader from "nextjs-toploader";

import { Toaster } from "@/components/ui/sonner";

import { TRPCProvider } from "./components/trpc-provider";
import { GlobalScript } from "./components/global-script";
import { Navbar } from "./components/navbar";

export const metadata: Metadata = {
  title: "Storoo",
  description: "Secure and Convenient Storage Solutions",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/storoo-logo-white.svg" />

        <GlobalScript />
      </head>

      <body className="bg-background font-sans text-primary antialiased">
        <TRPCProvider>
          <NextTopLoader showSpinner={false} />
          <Toaster />

          <header className="bg-white shadow-sm sticky top-0 z-10 isolate">
            <Navbar />
          </header>

          {children}
        </TRPCProvider>
      </body>
    </html>
  );
}
