"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CustomCTA() {
  return (
    <section className="py-28 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative border border-[#1c1c1c] bg-[#0e0e0e] p-12 md:p-20 overflow-hidden"
        >
          {/* Decorative corner lines */}
          <div className="absolute top-0 left-0 w-16 h-16 border-t border-l border-[#c4a35a]/30" />
          <div className="absolute bottom-0 right-0 w-16 h-16 border-b border-r border-[#c4a35a]/30" />

          {/* Gold glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#c4a35a]/3 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-8 bg-[#c4a35a]" />
              <span className="text-[10px] tracking-[0.3em] uppercase text-[#c4a35a]">
                Bespoke
              </span>
            </div>
            <h2 className="font-display text-5xl md:text-6xl font-light text-[#f0ece4] mb-6 leading-tight">
              Have a design
              <br />
              <em className="text-[#c4a35a]">in mind?</em>
            </h2>
            <p className="text-base text-[#666666] leading-relaxed mb-10">
              Don&apos;t see exactly what you want? Submit your concept — a description,
              reference image, or rough sketch — and Quinn will review it personally
              and send you a custom quote within 24 hours.
            </p>
            <Button asChild size="lg">
              <Link href="/custom">
                Submit Custom Design <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
