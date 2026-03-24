"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { designs } from "@/lib/data";
import { formatNaira } from "@/lib/utils";

const featured = designs.filter((d) => d.featured).slice(0, 4);

export function FeaturedDesigns() {
  return (
    <section className="py-28 px-6 max-w-7xl mx-auto">
      <div className="flex items-center gap-4 mb-4">
        <div className="h-px w-8 bg-[#c4a35a]" />
        <span className="text-[10px] tracking-[0.3em] uppercase text-[#c4a35a]">Signature Work</span>
      </div>
      <div className="flex items-end justify-between mb-12 flex-wrap gap-6">
        <h2 className="font-display text-5xl md:text-6xl font-light text-[#f0ece4]">
          Featured designs
        </h2>
        <Button asChild variant="ghost" size="sm">
          <Link href="/designs">
            View all <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
        {featured.map((design, i) => (
          <motion.div
            key={design.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
          >
            <Link href={`/designs?selected=${design.id}`} className="group block">
              <div className="relative overflow-hidden aspect-[3/4] bg-[#111111]">
                <Image
                  src={design.imageUrl}
                  alt={design.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                  unoptimized
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#080808]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <div className="text-[10px] tracking-[0.15em] uppercase text-[#c4a35a] mb-1">
                    {design.category}
                  </div>
                  <div className="font-display text-lg font-light text-[#f0ece4]">
                    {design.title}
                  </div>
                  <div className="text-xs text-[#888888] mt-1">
                    from {formatNaira(design.basePrice)}
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
