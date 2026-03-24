"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://source.unsplash.com/1800x1200/?tattoo,artist,studio,ink&sig=200"
          alt="Tattoo artistry"
          fill
          priority
          className="object-cover object-center opacity-20"
          unoptimized
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#080808] via-[#080808]/80 to-[#080808]/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-[#080808]/60" />
      </div>

      {/* Gold vertical line */}
      <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#c4a35a]/40 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-24 pb-16 w-full">
        <div className="max-w-2xl">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="flex items-center gap-3 mb-8"
          >
            <div className="h-px w-8 bg-[#c4a35a]" />
            <span className="text-[10px] tracking-[0.3em] uppercase text-[#c4a35a] font-medium">
              Lagos, Nigeria
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="font-display text-6xl md:text-8xl font-light text-[#f0ece4] leading-[0.95] mb-6"
          >
            Art that
            <br />
            <em className="text-[#c4a35a] not-italic">lives</em>
            <br />
            on you.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-base text-[#888888] leading-relaxed mb-10 max-w-md"
          >
            Bespoke tattoo artistry crafted for those who wear their story.
            Studio sessions in Lagos or home service — designed around you.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.55 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Button asChild size="lg">
              <Link href="/designs">
                Browse Designs <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/custom">Submit Your Design</Link>
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="flex items-center gap-10 mt-16 pt-10 border-t border-[#1c1c1c]"
          >
            {[
              { value: "500+", label: "Pieces crafted" },
              { value: "4.9★", label: "Client rating" },
              { value: "6+", label: "Years of mastery" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="font-display text-2xl text-[#f0ece4]">{stat.value}</div>
                <div className="text-[10px] tracking-[0.15em] uppercase text-[#666666] mt-0.5">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[9px] tracking-[0.3em] uppercase text-[#444444]">Scroll</span>
        <div className="h-8 w-px bg-gradient-to-b from-[#444444] to-transparent" />
      </motion.div>
    </section>
  );
}
