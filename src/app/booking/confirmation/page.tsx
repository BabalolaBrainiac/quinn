import { Suspense } from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { ConfirmationContent } from "./ConfirmationContent";

export default function ConfirmationPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16 min-h-screen flex items-center justify-center px-6">
        <Suspense
          fallback={
            <div className="text-center text-[#666666]">Loading confirmation...</div>
          }
        >
          <ConfirmationContent />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
