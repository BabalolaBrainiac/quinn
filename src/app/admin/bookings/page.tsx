"use client";

import { useState } from "react";
import { mockBookings } from "@/lib/data";
import { formatNaira, formatShortDate } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Booking, BookingStatus } from "@/lib/types";
import { Phone, Mail } from "lucide-react";

const statusVariant: Record<BookingStatus, "success" | "warning" | "error" | "muted"> = {
  confirmed: "success",
  pending: "warning",
  completed: "muted",
  cancelled: "error",
};

const statuses: BookingStatus[] = ["pending", "confirmed", "completed", "cancelled"];

export default function AdminBookingsPage() {
  const [filter, setFilter] = useState<BookingStatus | "all">("all");
  const [selected, setSelected] = useState<Booking | null>(null);

  const bookings =
    filter === "all" ? mockBookings : mockBookings.filter((b) => b.status === filter);

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="font-display text-4xl font-light text-foreground">Bookings</h1>
        <p className="text-sm text-muted-foreground mt-1">{mockBookings.length} total bookings</p>
      </div>

      {/* Filter tabs */}
      <div className="flex items-center gap-0 border-b border-border mb-6">
        {(["all", ...statuses] as const).map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`px-5 py-2.5 text-xs tracking-widest uppercase transition-colors ${
              filter === s
                ? "text-gold border-b-2 border-gold"
                : "text-muted-foreground hover:text-foreground border-b-2 border-transparent"
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* List */}
        <div className="lg:col-span-2 border border-border overflow-hidden">
          {bookings.length === 0 ? (
            <p className="p-6 text-sm text-muted-foreground">No bookings in this status.</p>
          ) : (
            bookings.map((b) => (
              <div
                key={b.id}
                className={`border-b border-border last:border-0 px-4 py-4 cursor-pointer transition-colors ${
                  selected?.id === b.id ? "bg-surface" : "hover:bg-surface"
                }`}
                onClick={() => setSelected(b)}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm text-foreground font-medium">{b.clientName}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {b.designTitle} · {b.placement}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {formatShortDate(b.date)} at {b.time}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <Badge variant={statusVariant[b.status]}>{b.status}</Badge>
                    <p className="text-sm text-gold mt-1.5">{formatNaira(b.amount)}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Detail panel */}
        <div className="border border-border p-5 h-fit">
          {selected ? (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-display text-xl font-light text-foreground">
                  {selected.clientName}
                </h3>
                <Badge variant={statusVariant[selected.status]}>{selected.status}</Badge>
              </div>

              <div className="space-y-3 text-sm">
                {[
                  { label: "Design", value: selected.designTitle },
                  { label: "Service", value: selected.serviceType === "home" ? "Home Service" : "Studio Visit" },
                  { label: "Date", value: formatShortDate(selected.date) },
                  { label: "Time", value: selected.time },
                  { label: "Placement", value: selected.placement },
                  { label: "Size", value: selected.size },
                  { label: "Amount", value: formatNaira(selected.amount) },
                  ...(selected.paystackRef
                    ? [{ label: "Paystack Ref", value: selected.paystackRef }]
                    : []),
                ].map(({ label, value }) => (
                  <div key={label} className="flex justify-between gap-2">
                    <span className="text-muted-foreground text-xs">{label}</span>
                    <span className="text-foreground text-xs text-right">{value}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-border mt-4 pt-4 space-y-2">
                <a
                  href={`mailto:${selected.clientEmail}`}
                  className="flex items-center gap-2 text-xs text-muted-foreground hover:text-gold transition-colors"
                >
                  <Mail className="h-3.5 w-3.5" />
                  {selected.clientEmail}
                </a>
                <a
                  href={`tel:${selected.clientPhone}`}
                  className="flex items-center gap-2 text-xs text-muted-foreground hover:text-gold transition-colors"
                >
                  <Phone className="h-3.5 w-3.5" />
                  {selected.clientPhone}
                </a>
              </div>

              {selected.notes && (
                <div className="mt-4 p-3 bg-surface border border-border">
                  <p className="text-[10px] tracking-widest uppercase text-muted-foreground mb-1">Notes</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">{selected.notes}</p>
                </div>
              )}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground text-center py-8">
              Select a booking to view details
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
