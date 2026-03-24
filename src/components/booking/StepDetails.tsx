"use client";

import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { BookingFormData } from "@/lib/types";

const schema = z.object({
  clientName: z.string().min(2, "Please enter your full name"),
  clientEmail: z.string().email("Please enter a valid email"),
  clientPhone: z.string().min(10, "Please enter a valid Nigerian phone number"),
  placement: z.string().min(1, "Please specify placement"),
  size: z.string().min(1, "Please select a size"),
  notes: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

const placements = [
  "Forearm", "Upper arm", "Bicep", "Shoulder", "Chest", "Back",
  "Ribcage", "Thigh", "Calf", "Ankle", "Wrist", "Neck", "Behind ear",
  "Hand", "Foot", "Full sleeve", "Finger", "Other"
];

const sizes = [
  "Tiny (under 5cm)",
  "Small (5–10cm)",
  "Medium (10–15cm)",
  "Large (20–30cm)",
  "Extra Large (30cm+)",
];

interface StepDetailsProps {
  formData: Partial<BookingFormData>;
  onNext: (data: Partial<BookingFormData>) => void;
  onBack: () => void;
}

export function StepDetails({ formData, onNext, onBack }: StepDetailsProps) {
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      clientName: formData.clientName ?? "",
      clientEmail: formData.clientEmail ?? "",
      clientPhone: formData.clientPhone ?? "",
      placement: formData.placement ?? "",
      size: formData.size ?? "",
      notes: formData.notes ?? "",
    },
  });

  const placement = useWatch({ control, name: "placement" });
  const size = useWatch({ control, name: "size" });

  const onSubmit = (data: FormValues) => {
    onNext(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-8">
        <h2 className="font-display text-4xl font-light text-foreground mb-2">
          Your details
        </h2>
        <p className="text-sm text-muted-foreground">
          We&apos;ll use this to confirm your booking and send aftercare instructions.
        </p>
      </div>

      <div className="space-y-5 mb-8">
        <Input
          label="Full Name"
          placeholder="Adaeze Okonkwo"
          error={errors.clientName?.message}
          {...register("clientName")}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Email Address"
            type="email"
            placeholder="you@example.com"
            error={errors.clientEmail?.message}
            {...register("clientEmail")}
          />
          <Input
            label="Phone Number"
            type="tel"
            placeholder="0801 234 5678"
            error={errors.clientPhone?.message}
            {...register("clientPhone")}
          />
        </div>

        {/* Placement */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs tracking-[0.1em] uppercase text-muted-foreground font-medium">
            Placement
          </label>
          <Select
            value={placement}
            onValueChange={(v) => setValue("placement", v)}
          >
            <SelectTrigger error={errors.placement?.message}>
              <SelectValue placeholder="Where on your body?" />
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
          <label className="text-xs tracking-[0.1em] uppercase text-muted-foreground font-medium">
            Approximate Size
          </label>
          <Select
            value={size}
            onValueChange={(v) => setValue("size", v)}
          >
            <SelectTrigger error={errors.size?.message}>
              <SelectValue placeholder="Select a size range" />
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

        <Textarea
          label="Additional Notes (Optional)"
          placeholder="Anything else Quinn should know — skin conditions, specific style preferences, etc."
          rows={3}
          {...register("notes")}
        />
      </div>

      <div className="flex gap-3">
        <Button type="button" variant="muted" size="md" onClick={onBack} className="w-24">
          Back
        </Button>
        <Button type="submit" className="flex-1">
          Review & Pay
        </Button>
      </div>
    </form>
  );
}
