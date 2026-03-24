"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface TattooImageProps {
  src: string;
  alt: string;
  category?: string;
  fill?: boolean;
  className?: string;
  priority?: boolean;
}

export function TattooImage({
  src,
  alt,
  category,
  fill = true,
  className,
  priority = false,
}: TattooImageProps) {
  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);

  if (error) {
    return (
      <div
        className={cn(
          "flex flex-col items-center justify-center gap-3 bg-[var(--qa-surface-2)]",
          className
        )}
      >
        {/* Tattoo-style line art placeholder */}
        <svg
          width="48"
          height="48"
          viewBox="0 0 48 48"
          fill="none"
          className="opacity-20"
        >
          <circle cx="22" cy="22" r="18" stroke="#c4a35a" strokeWidth="1" />
          <circle cx="22" cy="22" r="12" stroke="#c4a35a" strokeWidth="0.5" strokeDasharray="2 3" />
          <line x1="34" y1="34" x2="46" y2="46" stroke="#c4a35a" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="46" cy="46" r="1.5" fill="#c4a35a" />
          <circle cx="22" cy="22" r="2" fill="#c4a35a" opacity="0.4" />
        </svg>
        {category && (
          <span className="text-[9px] tracking-[0.2em] uppercase text-[var(--qa-subtle)] capitalize">
            {category}
          </span>
        )}
      </div>
    );
  }

  return (
    <>
      {!loaded && (
        <div
          className={cn(
            "animate-pulse bg-[var(--qa-surface-2)] absolute inset-0",
          )}
        />
      )}
      <Image
        src={src}
        alt={alt}
        fill={fill}
        className={cn(
          className,
          "transition-opacity duration-500",
          loaded ? "opacity-100" : "opacity-0"
        )}
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
        unoptimized
        priority={priority}
      />
    </>
  );
}
