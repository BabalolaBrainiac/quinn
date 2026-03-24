"use client";

import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { DesignCard } from "@/components/designs/DesignCard";
import { designs } from "@/lib/data";
import { DesignCategory } from "@/lib/types";
import { cn } from "@/lib/utils";

const categories: { label: string; value: DesignCategory | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Geometric", value: "geometric" },
  { label: "Floral", value: "floral" },
  { label: "Minimalist", value: "minimalist" },
  { label: "Blackwork", value: "blackwork" },
  { label: "Fine Line", value: "fine-line" },
  { label: "Abstract", value: "abstract" },
  { label: "Tribal", value: "tribal" },
  { label: "Watercolor", value: "watercolor" },
];

export default function DesignsPage() {
  const [activeCategory, setActiveCategory] = useState<DesignCategory | "all">("all");

  const filtered =
    activeCategory === "all"
      ? designs
      : designs.filter((d) => d.category === activeCategory);

  return (
    <>
      <Navbar />
      <main className="pt-16 min-h-screen">
        {/* Header */}
        <div className="border-b border-border py-16 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-8 bg-gold" />
              <span className="text-[10px] tracking-[0.3em] uppercase text-gold">Gallery</span>
            </div>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <h1 className="font-display text-6xl font-light text-foreground">
                Design Library
              </h1>
              <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
                Browse our curated collection of signature designs. Click any piece to view
                details and book your session.
              </p>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="border-b border-border overflow-x-auto">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-center gap-0 py-4 w-max md:w-auto">
              {categories.map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => setActiveCategory(cat.value)}
                  className={cn(
                    "px-5 py-2 text-xs tracking-[0.1em] uppercase transition-colors whitespace-nowrap",
                    activeCategory === cat.value
                      ? "text-gold border-b-2 border-gold"
                      : "text-muted-foreground hover:text-foreground border-b-2 border-transparent"
                  )}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Grid */}
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="flex items-center justify-between mb-8">
            <span className="text-xs text-muted-foreground">
              {filtered.length} design{filtered.length !== 1 ? "s" : ""}
            </span>
            <span className="text-xs text-muted-foreground">
              Prices in Nigerian Naira (₦)
            </span>
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-24 text-muted-foreground">
              No designs in this category yet.
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {filtered.map((design, i) => (
                <DesignCard key={design.id} design={design} index={i} />
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
