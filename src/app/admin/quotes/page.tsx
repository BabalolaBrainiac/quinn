"use client";

import { useState } from "react";
import { mockCustomRequests } from "@/lib/data";
import { formatNaira } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CustomDesignRequest, QuoteStatus } from "@/lib/types";
import { Mail, Phone, Send, Home, MapPin } from "lucide-react";

const statusVariant: Record<QuoteStatus, "warning" | "gold" | "success" | "error"> = {
  pending: "warning",
  quoted: "gold",
  accepted: "success",
  rejected: "error",
};

export default function AdminQuotesPage() {
  const [requests, setRequests] = useState(mockCustomRequests);
  const [selected, setSelected] = useState<CustomDesignRequest | null>(null);
  const [quoteAmount, setQuoteAmount] = useState("");
  const [quoteNotes, setQuoteNotes] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSelectRequest = (req: CustomDesignRequest) => {
    setSelected(req);
    setQuoteAmount(req.quotedAmount?.toString() ?? "");
    setQuoteNotes(req.artistNotes ?? "");
    setSent(false);
  };

  const handleSendQuote = async () => {
    if (!selected || !quoteAmount) return;
    setSending(true);
    await new Promise((r) => setTimeout(r, 1200));

    const amount = parseInt(quoteAmount);
    setRequests((prev) =>
      prev.map((r) =>
        r.id === selected.id
          ? { ...r, status: "quoted", quotedAmount: amount, artistNotes: quoteNotes }
          : r
      )
    );
    setSelected((prev) =>
      prev ? { ...prev, status: "quoted", quotedAmount: amount, artistNotes: quoteNotes } : prev
    );
    setSending(false);
    setSent(true);
  };

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="font-display text-4xl font-light text-[#f0ece4]">Custom Quotes</h1>
        <p className="text-sm text-[#666666] mt-1">
          Review custom design requests and send quotes to clients.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Requests list */}
        <div className="border border-[#1c1c1c] overflow-hidden">
          {requests.map((req) => (
            <div
              key={req.id}
              className={`border-b border-[#1c1c1c] last:border-0 p-4 cursor-pointer transition-colors ${
                selected?.id === req.id ? "bg-[#111111]" : "hover:bg-[#0e0e0e]"
              }`}
              onClick={() => handleSelectRequest(req)}
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <p className="text-sm text-[#f0ece4] font-medium">{req.clientName}</p>
                <Badge variant={statusVariant[req.status]}>{req.status}</Badge>
              </div>
              <p className="text-xs text-[#666666] line-clamp-2">{req.description}</p>
              <div className="flex items-center gap-3 mt-2 text-[10px] text-[#444444]">
                <span>{req.placement}</span>
                <span>·</span>
                <span>{req.size}</span>
                <span>·</span>
                <span className="capitalize">{req.serviceType}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Detail + quote panel */}
        <div className="lg:col-span-2 border border-[#1c1c1c] p-6">
          {selected ? (
            <div>
              <div className="flex items-start justify-between mb-5">
                <div>
                  <h3 className="font-display text-2xl font-light text-[#f0ece4]">
                    {selected.clientName}
                  </h3>
                  <div className="flex items-center gap-3 mt-1">
                    <a
                      href={`mailto:${selected.clientEmail}`}
                      className="flex items-center gap-1.5 text-xs text-[#666666] hover:text-[#c4a35a] transition-colors"
                    >
                      <Mail className="h-3 w-3" />
                      {selected.clientEmail}
                    </a>
                    <a
                      href={`tel:${selected.clientPhone}`}
                      className="flex items-center gap-1.5 text-xs text-[#666666] hover:text-[#c4a35a] transition-colors"
                    >
                      <Phone className="h-3 w-3" />
                      {selected.clientPhone}
                    </a>
                  </div>
                </div>
                <Badge variant={statusVariant[selected.status]}>{selected.status}</Badge>
              </div>

              {/* Request details */}
              <div className="grid grid-cols-3 gap-3 mb-5 text-xs">
                {[
                  { label: "Placement", value: selected.placement },
                  { label: "Size", value: selected.size },
                  { label: "Color", value: selected.colorPreference },
                ].map(({ label, value }) => (
                  <div key={label} className="p-3 bg-[#0e0e0e] border border-[#1c1c1c]">
                    <p className="text-[#444444] mb-1 uppercase tracking-wider text-[9px]">{label}</p>
                    <p className="text-[#f0ece4]">{value}</p>
                  </div>
                ))}
              </div>

              {/* Service type */}
              <div className="flex items-center gap-2 mb-5 text-xs text-[#888888]">
                {selected.serviceType === "home" ? (
                  <Home className="h-3.5 w-3.5 text-[#c4a35a]" />
                ) : (
                  <MapPin className="h-3.5 w-3.5 text-[#c4a35a]" />
                )}
                <span>
                  {selected.serviceType === "home" ? "Home Service" : "Studio Visit"}
                  {selected.serviceType === "home" && " (+30% will be applied to quote)"}
                </span>
              </div>

              {/* Description */}
              <div className="p-4 bg-[#0e0e0e] border border-[#1c1c1c] mb-5">
                <p className="text-[10px] tracking-widest uppercase text-[#444444] mb-2">
                  Client&apos;s Description
                </p>
                <p className="text-sm text-[#888888] leading-relaxed">{selected.description}</p>
              </div>

              {/* Quote form */}
              {selected.status === "pending" || selected.status === "quoted" ? (
                <div className="border-t border-[#1c1c1c] pt-5 space-y-4">
                  <h4 className="text-xs tracking-[0.15em] uppercase text-[#888888]">
                    Send Quote
                  </h4>

                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      label="Quote Amount (₦)"
                      type="number"
                      placeholder="e.g. 75000"
                      value={quoteAmount}
                      onChange={(e) => setQuoteAmount(e.target.value)}
                    />
                    <div className="flex items-end pb-0">
                      <div className="text-xs text-[#666666] pb-3">
                        Client will receive a payment link via email.
                      </div>
                    </div>
                  </div>

                  <Textarea
                    label="Message to Client (Optional)"
                    placeholder="Any notes about the design, timeline, adjustments, etc."
                    rows={3}
                    value={quoteNotes}
                    onChange={(e) => setQuoteNotes(e.target.value)}
                  />

                  {sent && (
                    <div className="text-xs text-green-400 bg-green-900/10 border border-green-800 p-3">
                      Quote sent to {selected.clientEmail} with a payment link for{" "}
                      {quoteAmount && formatNaira(parseInt(quoteAmount))}.
                    </div>
                  )}

                  <Button
                    className="w-full"
                    disabled={!quoteAmount || sending}
                    onClick={handleSendQuote}
                  >
                    <Send className="h-4 w-4" />
                    {sending ? "Sending..." : "Send Quote via Email"}
                  </Button>
                </div>
              ) : (
                <div className="border-t border-[#1c1c1c] pt-5">
                  <Badge variant={statusVariant[selected.status]} className="text-sm px-3 py-1">
                    Quote {selected.status}
                  </Badge>
                  {selected.quotedAmount && (
                    <p className="text-sm text-[#c4a35a] mt-2">
                      Amount: {formatNaira(selected.quotedAmount)}
                    </p>
                  )}
                </div>
              )}
            </div>
          ) : (
            <div className="h-full flex items-center justify-center text-sm text-[#444444]">
              Select a request to review and quote
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
