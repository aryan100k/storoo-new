import { Metadata } from "next";
import { GlobalScript } from "./components/global-script";
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
      <body>{children}</body>
    </html>
  );
}
