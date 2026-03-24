import { Suspense } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BookingFlow } from "@/components/booking/BookingFlow";

export default function BookPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16 min-h-screen">
        <div className="border-b border-[#1c1c1c] py-12 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-8 bg-[#c4a35a]" />
              <span className="text-[10px] tracking-[0.3em] uppercase text-[#c4a35a]">
                Booking
              </span>
            </div>
            <h1 className="font-display text-5xl font-light text-[#f0ece4]">
              Book a Session
            </h1>
          </div>
        </div>
        <Suspense fallback={<div className="p-12 text-center text-[#666666]">Loading...</div>}>
          <BookingFlow />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
