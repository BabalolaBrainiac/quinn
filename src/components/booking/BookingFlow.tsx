"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { StepDesign } from "./StepDesign";
import { StepService } from "./StepService";
import { StepDateTime } from "./StepDateTime";
import { StepDetails } from "./StepDetails";
import { StepPayment } from "./StepPayment";
import { BookingFormData } from "@/lib/types";
import { getDesignById } from "@/lib/data";

const STEPS = [
  { id: 1, label: "Design" },
  { id: 2, label: "Service" },
  { id: 3, label: "Schedule" },
  { id: 4, label: "Details" },
  { id: 5, label: "Payment" },
];

function getInitialState(searchParams: URLSearchParams): {
  step: number;
  formData: Partial<BookingFormData>;
} {
  const designId = searchParams.get("design");
  const service = searchParams.get("service");
  const formData: Partial<BookingFormData> = {};

  if (designId && getDesignById(designId)) formData.designId = designId;
  if (service === "studio" || service === "home") formData.serviceType = service;

  let step = 1;
  if (formData.designId && formData.serviceType) step = 3;
  else if (formData.designId) step = 2;

  return { step, formData };
}

export function BookingFlow() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [step, setStep] = useState(() => getInitialState(searchParams).step);
  const [formData, setFormData] = useState<Partial<BookingFormData>>(
    () => getInitialState(searchParams).formData
  );

  const next = (data: Partial<BookingFormData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
    setStep((s) => Math.min(s + 1, 5));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const back = () => {
    setStep((s) => Math.max(s - 1, 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleComplete = (ref: string) => {
    router.push(`/booking/confirmation?ref=${ref}`);
  };

  return (
    <div className="max-w-2xl mx-auto px-6 py-12">
      {/* Step indicator */}
      <div className="flex items-center justify-between mb-12">
        {STEPS.map((s, i) => (
          <div key={s.id} className="flex items-center">
            <div className="flex flex-col items-center">
              <div
                className={`w-7 h-7 flex items-center justify-center text-xs font-medium transition-all duration-300 ${
                  step > s.id
                    ? "bg-gold text-background"
                    : step === s.id
                    ? "border border-gold text-gold"
                    : "border border-border text-muted-foreground"
                }`}
              >
                {step > s.id ? "✓" : s.id}
              </div>
              <span
                className={`text-[9px] tracking-widest uppercase mt-1.5 hidden sm:block ${
                  step === s.id ? "text-gold" : "text-muted-foreground"
                }`}
              >
                {s.label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div
                className={`flex-1 h-px mx-2 transition-all duration-500 ${
                  step > s.id ? "bg-gold/40" : "bg-[#1c1c1c]"
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {/* Step content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          {step === 1 && (
            <StepDesign
              selected={formData.designId}
              onNext={(designId) => next({ designId })}
            />
          )}
          {step === 2 && (
            <StepService
              designId={formData.designId}
              selected={formData.serviceType}
              onNext={(serviceType) => next({ serviceType })}
              onBack={back}
            />
          )}
          {step === 3 && (
            <StepDateTime
              selected={{ date: formData.date, time: formData.time }}
              onNext={(date, time) => next({ date, time })}
              onBack={back}
            />
          )}
          {step === 4 && (
            <StepDetails
              formData={formData}
              onNext={(details) => next(details)}
              onBack={back}
            />
          )}
          {step === 5 && (
            <StepPayment
              formData={formData as BookingFormData}
              onComplete={handleComplete}
              onBack={back}
            />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
