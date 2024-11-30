import { Toaster } from "@/components/ui/sonner";
import { Navbar } from "./components/navbar";
import { Footer } from "./components/footer";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Toaster />

      <header className="bg-white shadow-sm sticky top-0 z-10 isolate">
        <Navbar />
      </header>

      {children}

      <Footer />
    </>
  );
}
