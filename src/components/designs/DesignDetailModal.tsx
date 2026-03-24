"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowRight, Clock, Tag } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Design } from "@/lib/types";
import { formatNaira } from "@/lib/utils";
import { HOME_SERVICE_SURCHARGE } from "@/lib/data";

interface DesignDetailModalProps {
  design: Design;
  open: boolean;
  onClose: () => void;
}

export function DesignDetailModal({ design, open, onClose }: DesignDetailModalProps) {
  const [imgError, setImgError] = useState(false);
  const homePrice = Math.round(design.basePrice * (1 + HOME_SERVICE_SURCHARGE));

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-2xl p-0 overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Image */}
          <div className="relative aspect-[3/4] md:aspect-auto min-h-64 bg-[#111111]">
            {imgError ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                <div className="w-12 h-12 border border-[#2a2a2a] flex items-center justify-center">
                  <span className="text-[#2a2a2a] text-xl font-display">Q</span>
                </div>
                <span className="text-[10px] tracking-widest uppercase text-[#2a2a2a] capitalize">{design.category}</span>
              </div>
            ) : (
              <Image
                src={design.imageUrl}
                alt={design.title}
                fill
                className="object-cover"
                unoptimized
                onError={() => setImgError(true)}
              />
            )}
          </div>

          {/* Details */}
          <div className="p-6 flex flex-col">
            <DialogHeader className="mb-0">
              <div className="text-[10px] tracking-[0.2em] uppercase text-[#c4a35a] mb-2 capitalize">
                {design.category}
              </div>
              <DialogTitle className="text-2xl">{design.title}</DialogTitle>
            </DialogHeader>

            <p className="text-sm text-[#666666] leading-relaxed mt-3 mb-5">
              {design.description}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 mb-5">
              {design.tags.map((tag) => (
                <Badge key={tag} variant="muted">
                  <Tag className="h-2.5 w-2.5 mr-1" />
                  {tag}
                </Badge>
              ))}
            </div>

            {/* Pricing */}
            <div className="border border-[#242424] p-4 mb-5 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-[#888888]">Studio session</span>
                <span className="text-[#f0ece4]">{formatNaira(design.basePrice)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[#888888]">Home service (+30%)</span>
                <span className="text-[#c4a35a]">{formatNaira(homePrice)}</span>
              </div>
              <div className="flex items-center gap-1.5 pt-1 border-t border-[#1c1c1c]">
                <Clock className="h-3 w-3 text-[#444444]" />
                <span className="text-xs text-[#666666]">
                  Est. {design.estimatedHours} hour{design.estimatedHours !== 1 ? "s" : ""}
                </span>
              </div>
            </div>

            <div className="mt-auto space-y-2">
              <Button asChild className="w-full" size="md">
                <Link href={`/book?design=${design.id}`} onClick={onClose}>
                  Book This Design <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button variant="ghost" className="w-full" size="sm" onClick={onClose}>
                Continue Browsing
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
