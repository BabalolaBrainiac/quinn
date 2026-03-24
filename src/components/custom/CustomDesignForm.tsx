"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { Upload, CheckCircle2, X, Home, MapPin, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

const schema = z.object({
  clientName: z.string().min(2, "Please enter your full name"),
  clientEmail: z.string().email("Please enter a valid email"),
  clientPhone: z.string().min(10, "Enter a valid Nigerian phone number"),
  description: z.string().min(20, "Please describe your design in at least 20 characters"),
  placement: z.string().min(1, "Please select a placement"),
  size: z.string().min(1, "Please select a size"),
  colorPreference: z.string().min(1, "Please select a color preference"),
  serviceType: z.enum(["studio", "home"]),
});

type FormValues = z.infer<typeof schema>;

const placements = [
  "Forearm", "Upper arm", "Bicep", "Shoulder", "Chest", "Back",
  "Ribcage", "Thigh", "Calf", "Ankle", "Wrist", "Neck", "Behind ear",
  "Hand", "Foot", "Full sleeve", "Finger", "Other",
];

const sizes = [
  "Tiny (under 5cm)",
  "Small (5–10cm)",
  "Medium (10–15cm)",
  "Large (20–30cm)",
  "Extra Large (30cm+)",
];

const colorOptions = [
  "Black ink only",
  "Black and grey",
  "Full color",
  "Watercolor",
  "Open to Quinn's recommendation",
];

export function CustomDesignForm() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { serviceType: "studio" },
  });

  const serviceType = watch("serviceType");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    setUploadedFiles((prev) => [...prev, ...files].slice(0, 5));
  };

  const removeFile = (index: number) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onSubmit = async (_data: FormValues) => {
    setSubmitting(true);
    // Simulate API call
    await new Promise((r) => setTimeout(r, 1500));
    setSubmitting(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center py-16"
      >
        <div className="flex justify-center mb-8">
          <div className="w-20 h-20 border border-[#c4a35a]/30 flex items-center justify-center">
            <CheckCircle2 className="h-10 w-10 text-[#c4a35a]" />
          </div>
        </div>
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="h-px w-8 bg-[#c4a35a]" />
          <span className="text-[10px] tracking-[0.3em] uppercase text-[#c4a35a]">Received</span>
          <div className="h-px w-8 bg-[#c4a35a]" />
        </div>
        <h2 className="font-display text-4xl font-light text-[#f0ece4] mb-4">
          Request submitted.
        </h2>
        <p className="text-sm text-[#666666] leading-relaxed max-w-sm mx-auto">
          Quinn will review your concept and get back to you within 24 hours with a
          personalised quote and payment link.
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Contact info */}
      <div>
        <h3 className="text-xs tracking-[0.2em] uppercase text-[#888888] mb-4">
          Your Details
        </h3>
        <div className="space-y-4">
          <Input
            label="Full Name"
            placeholder="Chisom Eze"
            error={errors.clientName?.message}
            {...register("clientName")}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Email"
              type="email"
              placeholder="you@example.com"
              error={errors.clientEmail?.message}
              {...register("clientEmail")}
            />
            <Input
              label="Phone"
              type="tel"
              placeholder="0801 234 5678"
              error={errors.clientPhone?.message}
              {...register("clientPhone")}
            />
          </div>
        </div>
      </div>

      {/* Design info */}
      <div className="border-t border-[#1c1c1c] pt-6">
        <h3 className="text-xs tracking-[0.2em] uppercase text-[#888888] mb-4">
          Design Details
        </h3>
        <div className="space-y-4">
          <Textarea
            label="Describe Your Design"
            placeholder="Tell Quinn about your vision — subject matter, mood, style references, what it means to you, any specific elements you want included or avoided..."
            rows={5}
            error={errors.description?.message}
            {...register("description")}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Placement */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs tracking-[0.1em] uppercase text-[#888888] font-medium">
                Placement
              </label>
              <Select
                value={watch("placement")}
                onValueChange={(v) => setValue("placement", v)}
              >
                <SelectTrigger error={errors.placement?.message}>
                  <SelectValue placeholder="Body placement" />
                </SelectTrigger>
                <SelectContent>
                  {placements.map((p) => (
                    <SelectItem key={p} value={p}>
                      {p}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.placement && (
                <span className="text-xs text-red-400">{errors.placement.message}</span>
              )}
            </div>

            {/* Size */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs tracking-[0.1em] uppercase text-[#888888] font-medium">
                Approximate Size
              </label>
              <Select
                value={watch("size")}
                onValueChange={(v) => setValue("size", v)}
              >
                <SelectTrigger error={errors.size?.message}>
                  <SelectValue placeholder="Estimated size" />
                </SelectTrigger>
                <SelectContent>
                  {sizes.map((s) => (
                    <SelectItem key={s} value={s}>
                      {s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.size && (
                <span className="text-xs text-red-400">{errors.size.message}</span>
              )}
            </div>
          </div>

          {/* Color preference */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs tracking-[0.1em] uppercase text-[#888888] font-medium">
              Color Preference
            </label>
            <Select
              value={watch("colorPreference")}
              onValueChange={(v) => setValue("colorPreference", v)}
            >
              <SelectTrigger error={errors.colorPreference?.message}>
                <SelectValue placeholder="Color style" />
              </SelectTrigger>
              <SelectContent>
                {colorOptions.map((c) => (
                  <SelectItem key={c} value={c}>
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.colorPreference && (
              <span className="text-xs text-red-400">{errors.colorPreference.message}</span>
            )}
          </div>
        </div>
      </div>

      {/* Reference images */}
      <div className="border-t border-[#1c1c1c] pt-6">
        <h3 className="text-xs tracking-[0.2em] uppercase text-[#888888] mb-4">
          Reference Images{" "}
          <span className="normal-case tracking-normal text-[#444444]">(optional, max 5)</span>
        </h3>

        <label className="flex flex-col items-center justify-center gap-3 border border-dashed border-[#2a2a2a] p-8 cursor-pointer hover:border-[#c4a35a]/50 transition-colors">
          <Upload className="h-6 w-6 text-[#444444]" />
          <span className="text-xs text-[#666666] text-center">
            Drop images here or click to upload
            <br />
            <span className="text-[#444444]">JPG, PNG, WEBP up to 10MB each</span>
          </span>
          <input
            type="file"
            multiple
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
        </label>

        {uploadedFiles.length > 0 && (
          <div className="mt-3 space-y-2">
            {uploadedFiles.map((file, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-2.5 bg-[#0e0e0e] border border-[#1c1c1c]"
              >
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-[#c4a35a] rounded-full" />
                  <span className="text-xs text-[#888888] truncate max-w-[200px]">
                    {file.name}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => removeFile(i)}
                  className="text-[#444444] hover:text-[#f0ece4] transition-colors"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Service type */}
      <div className="border-t border-[#1c1c1c] pt-6">
        <h3 className="text-xs tracking-[0.2em] uppercase text-[#888888] mb-4">
          Preferred Service
        </h3>
        <div className="grid grid-cols-2 gap-3">
          {(["studio", "home"] as const).map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => setValue("serviceType", type)}
              className={cn(
                "p-4 border text-left transition-all duration-150",
                serviceType === type
                  ? "border-[#c4a35a] bg-[#c4a35a]/5"
                  : "border-[#242424] hover:border-[#333333]"
              )}
            >
              <div className="flex items-center gap-2 mb-2">
                {type === "studio" ? (
                  <MapPin className="h-4 w-4 text-[#c4a35a]" />
                ) : (
                  <Home className="h-4 w-4 text-[#c4a35a]" />
                )}
                <span
                  className={cn(
                    "text-xs tracking-widest uppercase",
                    serviceType === type ? "text-[#c4a35a]" : "text-[#666666]"
                  )}
                >
                  {type === "studio" ? "Studio" : "Home Service"}
                </span>
              </div>
              <p className="text-xs text-[#444444]">
                {type === "studio"
                  ? "Visit Quinn's Lagos studio"
                  : "+30% — Quinn comes to you"}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Submit */}
      <div className="pt-4">
        <Button
          type="submit"
          className="w-full"
          size="lg"
          disabled={submitting}
        >
          {submitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" /> Submitting...
            </>
          ) : (
            "Submit Custom Design Request"
          )}
        </Button>
        <p className="text-xs text-center text-[#444444] mt-3">
          You&apos;ll receive a quote via email within 24 hours. No payment required now.
        </p>
      </div>
    </form>
  );
}
