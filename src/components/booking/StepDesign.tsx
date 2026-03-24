"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Check, ExternalLink } from "lucide-react";
import { designs } from "@/lib/data";
import { formatNaira } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface StepDesignProps {
  selected?: string;
  onNext: (designId: string | undefined) => void;
}

export function StepDesign({ selected, onNext }: StepDesignProps) {
  const [picked, setPicked] = useState<string | undefined>(selected);
  const [imgErrors, setImgErrors] = useState<Record<string, boolean>>({});
  const handleImgError = (id: string) => setImgErrors((prev) => ({ ...prev, [id]: true }));

  return (
    <div>
      <div className="mb-8">
        <h2 className="font-display text-4xl font-light text-[#f0ece4] mb-2">
          Choose a design
        </h2>
        <p className="text-sm text-[#666666]">
          Select from our library, or skip to bring your own concept.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-[400px] overflow-y-auto pr-1 mb-6">
        {designs.map((design) => (
          <button
            key={design.id}
            onClick={() => setPicked(design.id === picked ? undefined : design.id)}
            className={cn(
              "relative group text-left transition-all duration-200",
              picked === design.id && "ring-1 ring-[#c4a35a]"
            )}
          >
            <div className="relative aspect-square overflow-hidden bg-[#111111]">
              {imgErrors[design.id] ? (
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-[#2a2a2a] text-base font-display">Q</span>
                </div>
              ) : (
                <Image
                  src={design.imageUrl}
                  alt={design.title}
                  fill
                  className="object-cover opacity-60 group-hover:opacity-90 transition-opacity"
                  unoptimized
                  onError={() => handleImgError(design.id)}
                />
              )}
              {picked === design.id && (
                <div className="absolute inset-0 bg-[#c4a35a]/20 flex items-center justify-center">
                  <Check className="h-6 w-6 text-[#c4a35a]" />
                </div>
              )}
            </div>
            <div className="p-1.5">
              <p className="text-xs text-[#f0ece4] leading-tight">{design.title}</p>
              <p className="text-[10px] text-[#c4a35a]">{formatNaira(design.basePrice)}</p>
            </div>
          </button>
        ))}
      </div>

      <div className="border-t border-[#1c1c1c] pt-6 space-y-3">
        <Button
          className="w-full"
          onClick={() => onNext(picked)}
          size="md"
        >
          {picked ? "Continue with selected design" : "Continue without a design"}
        </Button>
        <p className="text-xs text-center text-[#444444]">
          Have a custom design?{" "}
          <Link href="/custom" className="text-[#c4a35a] hover:underline">
            Submit it here
            <ExternalLink className="h-3 w-3 inline ml-1" />
          </Link>
        </p>
      </div>
    </div>
  );
}
