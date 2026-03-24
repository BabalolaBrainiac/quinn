"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { designs } from "@/lib/data";
import { formatNaira } from "@/lib/utils";
import { Design } from "@/lib/types";

const featured = designs.filter((d) => d.featured).slice(0, 4);

function FeaturedCard({ design, index }: { design: Design; index: number }) {
  const [imgError, setImgError] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <Link href={`/designs?selected=${design.id}`} className="group block">
        <div className="relative overflow-hidden aspect-[3/4] bg-surface">
          {imgError ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-surface">
              <div className="w-10 h-10 border border-border flex items-center justify-center">
                <span className="text-muted-foreground text-lg font-display">Q</span>
              </div>
              <span className="text-[10px] tracking-widest uppercase text-muted-foreground capitalize">{design.category}</span>
            </div>
          ) : (
            <Image
              src={design.imageUrl}
              alt={design.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
              unoptimized
              onError={() => setImgError(true)}
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#080808]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
            <div className="text-[10px] tracking-[0.15em] uppercase text-gold mb-1">
              {design.category}
            </div>
            <div className="font-display text-lg font-light text-foreground">
              {design.title}
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              from {formatNaira(design.basePrice)}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export function FeaturedDesigns() {
  return (
    <section className="py-28 px-6 max-w-7xl mx-auto">
      <div className="flex items-center gap-4 mb-4">
        <div className="h-px w-8 bg-gold" />
        <span className="text-[10px] tracking-[0.3em] uppercase text-gold">Signature Work</span>
      </div>
      <div className="flex items-end justify-between mb-12 flex-wrap gap-6">
        <h2 className="font-display text-5xl md:text-6xl font-light text-foreground">
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
          <FeaturedCard key={design.id} design={design} index={i} />
        ))}
      </div>
    </section>
  );
}
