"use client";

import { useState } from "react";
import Image from "next/image";
import { Loader2, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookingFormData } from "@/lib/types";
import { formatNaira, formatDate } from "@/lib/utils";
import { getDesignById, calculateTotal } from "@/lib/data";
import { initiatePaystackPayment, generateReference } from "@/lib/paystack";

interface StepPaymentProps {
  formData: BookingFormData;
  onComplete: (ref: string) => void;
  onBack: () => void;
}

export function StepPayment({ formData, onComplete, onBack }: StepPaymentProps) {
  const [loading, setLoading] = useState(false);
  const [imgError, setImgError] = useState(false);
  const design = formData.designId ? getDesignById(formData.designId) : undefined;
  const basePrice = design?.basePrice ?? 0;
  const total = basePrice > 0 ? calculateTotal(basePrice, formData.serviceType) : 0;

  const handlePay = async () => {
    if (total === 0) {
      // No price defined yet — shouldn't normally reach here
      return;
    }

    setLoading(true);
    const reference = generateReference("QA");

    try {
      await initiatePaystackPayment({
        email: formData.clientEmail,
        amount: total,
        reference,
        currency: "NGN",
        metadata: {
          clientName: formData.clientName,
          designId: formData.designId,
          serviceType: formData.serviceType,
          date: formData.date,
          time: formData.time,
        },
        onSuccess: (ref) => {
          setLoading(false);
          onComplete(ref);
        },
        onClose: () => {
          setLoading(false);
        },
      });
    } catch {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h2 className="font-display text-4xl font-light text-[#f0ece4] mb-2">
          Review & confirm
        </h2>
        <p className="text-sm text-[#666666]">
          Check your booking summary before proceeding to payment.
        </p>
      </div>

      {/* Summary card */}
      <div className="border border-[#1c1c1c] bg-[#0e0e0e] mb-6">
        {/* Design preview */}
        {design && (
          <div className="flex gap-4 p-4 border-b border-[#1c1c1c]">
            <div className="relative w-16 h-16 shrink-0 overflow-hidden bg-[#111111]">
              {imgError ? (
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-[#2a2a2a] text-sm font-display">Q</span>
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
            <div>
              <p className="text-xs text-[#c4a35a] tracking-widest uppercase mb-0.5 capitalize">
                {design.category}
              </p>
              <p className="text-sm font-medium text-[#f0ece4]">{design.title}</p>
              <p className="text-xs text-[#666666]">Est. {design.estimatedHours}h session</p>
            </div>
          </div>
        )}

        {!design && (
          <div className="p-4 border-b border-[#1c1c1c]">
            <p className="text-sm text-[#888888]">No design selected — consultation booking</p>
          </div>
        )}

        {/* Details */}
        <div className="p-4 space-y-3">
          {[
            { label: "Client", value: formData.clientName },
            { label: "Email", value: formData.clientEmail },
            { label: "Phone", value: formData.clientPhone },
            { label: "Service", value: formData.serviceType === "home" ? "Home Service" : "Studio Visit" },
            { label: "Date", value: formatDate(formData.date) },
            { label: "Time", value: formData.time },
            { label: "Placement", value: formData.placement },
            { label: "Size", value: formData.size },
          ].map(({ label, value }) => (
            <div key={label} className="flex justify-between text-sm">
              <span className="text-[#666666]">{label}</span>
              <span className="text-[#f0ece4] text-right max-w-[60%]">{value}</span>
            </div>
          ))}
        </div>

        {/* Price breakdown */}
        {total > 0 && (
          <div className="p-4 border-t border-[#1c1c1c] bg-[#111111] space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-[#666666]">Base price</span>
              <span className="text-[#f0ece4]">{formatNaira(basePrice)}</span>
            </div>
            {formData.serviceType === "home" && (
              <div className="flex justify-between text-sm">
                <span className="text-[#666666]">Home service surcharge (+30%)</span>
                <span className="text-[#f0ece4]">{formatNaira(total - basePrice)}</span>
              </div>
            )}
            <div className="flex justify-between font-medium pt-2 border-t border-[#1c1c1c]">
              <span className="text-[#f0ece4]">Total</span>
              <span className="text-[#c4a35a] text-lg font-display">{formatNaira(total)}</span>
            </div>
          </div>
        )}
      </div>

      {/* Security note */}
      <div className="flex items-center gap-2 mb-6 p-3 bg-[#0e0e0e] border border-[#1c1c1c]">
        <Shield className="h-4 w-4 text-[#c4a35a] shrink-0" />
        <p className="text-xs text-[#666666]">
          Payments are processed securely via Paystack. Your card details are never stored.
        </p>
      </div>

      <div className="space-y-3">
        {total > 0 ? (
          <Button
            className="w-full"
            size="lg"
            onClick={handlePay}
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Opening payment...
              </>
            ) : (
              <>Pay {formatNaira(total)} via Paystack</>
            )}
          </Button>
        ) : (
          <div className="text-center p-4 border border-[#1c1c1c] text-sm text-[#666666]">
            <Badge variant="warning" className="mb-2">Quote Required</Badge>
            <p>
              This booking will require a custom quote. You&apos;ll receive an email with pricing and a payment link.
            </p>
          </div>
        )}

        <Button variant="muted" className="w-full" size="md" onClick={onBack}>
          Edit Booking
        </Button>
      </div>
    </div>
  );
}
