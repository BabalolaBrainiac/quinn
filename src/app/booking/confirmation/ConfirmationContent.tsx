"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export function ConfirmationContent() {
  const params = useSearchParams();
  const ref = params.get("ref") ?? "—";

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className="text-center max-w-md mx-auto py-24"
    >
      {/* Icon */}
      <div className="flex justify-center mb-8">
        <div className="w-20 h-20 border border-gold/30 flex items-center justify-center">
          <CheckCircle2 className="h-10 w-10 text-gold" />
        </div>
      </div>

      <div className="flex items-center justify-center gap-3 mb-6">
        <div className="h-px w-8 bg-gold" />
        <span className="text-[10px] tracking-[0.3em] uppercase text-gold">Confirmed</span>
        <div className="h-px w-8 bg-gold" />
      </div>

      <h1 className="font-display text-5xl font-light text-foreground mb-4">
        You&apos;re booked.
      </h1>
      <p className="text-sm text-muted-foreground leading-relaxed mb-6">
        Your session with Quinn is confirmed. Check your email for a full booking
        summary and aftercare instructions.
      </p>

      {/* Reference */}
      <div className="border border-border bg-surface p-4 mb-8">
        <p className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-1">
          Payment Reference
        </p>
        <p className="font-mono text-sm text-gold break-all">{ref}</p>
      </div>

      <div className="space-y-3">
        <Button asChild className="w-full" size="md">
          <Link href="/designs">
            Explore More Designs <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
        <Button asChild variant="ghost" className="w-full" size="sm">
          <Link href="/">Back to Home</Link>
        </Button>
      </div>
    </motion.div>
  );
}
