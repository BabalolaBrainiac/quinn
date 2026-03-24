"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Design } from "@/lib/types";
import { formatNaira } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DesignDetailModal } from "./DesignDetailModal";

interface DesignCardProps {
  design: Design;
  index?: number;
}

export function DesignCard({ design, index = 0 }: DesignCardProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.06 }}
        className="group cursor-pointer"
        onClick={() => setOpen(true)}
      >
        {/* Image */}
        <div className="relative overflow-hidden bg-[#111111] aspect-[3/4]">
          <Image
            src={design.imageUrl}
            alt={design.title}
            fill
            className="object-cover opacity-75 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
            unoptimized
          />

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#080808]/90 via-[#080808]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />

          {/* Source badge */}
          {design.source && (
            <div className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity">
              <Badge variant="muted">{design.source}</Badge>
            </div>
          )}

          {/* CTA */}
          <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-[10px] tracking-[0.15em] uppercase text-[#c4a35a] mb-0.5">
                  {design.category}
                </div>
                <div className="font-display text-lg text-[#f0ece4] leading-tight">
                  {design.title}
                </div>
              </div>
              <ArrowRight className="h-4 w-4 text-[#c4a35a] shrink-0" />
            </div>
          </div>
        </div>

        {/* Info below */}
        <div className="pt-3 pb-1">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="text-sm text-[#f0ece4] font-medium leading-snug">{design.title}</h3>
              <p className="text-xs text-[#666666] mt-0.5 capitalize">{design.category}</p>
            </div>
            <div className="text-right shrink-0">
              <p className="text-sm text-[#c4a35a] font-medium">{formatNaira(design.basePrice)}</p>
              <p className="text-[10px] text-[#444444]">{design.estimatedHours}h est.</p>
            </div>
          </div>
        </div>
      </motion.div>

      <DesignDetailModal design={design} open={open} onClose={() => setOpen(false)} />
    </>
  );
}
