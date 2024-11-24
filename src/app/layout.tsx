import { Metadata } from "next";
import { GlobalScript } from "./components/global-script";
import { Navbar } from "./components/navbar";
import "./globals.css";

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
        <header className="bg-white shadow-sm sticky top-0">
          <Navbar />
        </header>

        {children}
      </body>
    </html>
  );
}
