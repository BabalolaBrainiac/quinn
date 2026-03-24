"use client";

import { useState } from "react";
import Image from "next/image";
import { Home, MapPin } from "lucide-react";
import { ServiceType } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { formatNaira } from "@/lib/utils";
import { getDesignById, HOME_SERVICE_SURCHARGE } from "@/lib/data";
import { cn } from "@/lib/utils";

interface StepServiceProps {
  designId?: string;
  selected?: ServiceType;
  onNext: (serviceType: ServiceType) => void;
  onBack: () => void;
}

const services = [
  {
    type: "studio" as ServiceType,
    icon: MapPin,
    label: "Studio Visit",
    sublabel: "Standard rate",
    description:
      "Come to Quinn's private studio in Lagos. Full sterile setup, controlled environment, aftercare included.",
    surcharge: 0,
    image: "https://images.unsplash.com/photo-1565688534245-05d6b5be184a?w=400&q=70",
  },
  {
    type: "home" as ServiceType,
    icon: Home,
    label: "Home Service",
    sublabel: "+30% surcharge",
    description:
      "Quinn comes to you anywhere in Lagos. Same quality, zero travel. Min. 48h notice required.",
    surcharge: HOME_SERVICE_SURCHARGE,
    image: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=400&q=70",
  },
];

export function StepService({ designId, selected, onNext, onBack }: StepServiceProps) {
  const [picked, setPicked] = useState<ServiceType | undefined>(selected);
  const design = designId ? getDesignById(designId) : undefined;

  const getPriceLabel = (surcharge: number) => {
    if (!design) return surcharge > 0 ? "+30% on final price" : "Standard rates";
    const base = design.basePrice;
    return formatNaira(Math.round(base * (1 + surcharge)));
  };

  return (
    <div>
      <div className="mb-8">
        <h2 className="font-display text-4xl font-light text-foreground mb-2">
          Where would you like your session?
        </h2>
        <p className="text-sm text-muted-foreground">
          Home service is available across Lagos. A 30% premium applies.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
        {services.map((service) => (
          <button
            key={service.type}
            onClick={() => setPicked(service.type)}
            className={cn(
              "relative overflow-hidden border text-left transition-all duration-200 group",
              picked === service.type
                ? "border-gold"
                : "border-border hover:border-[#333333]"
            )}
          >
            <div className="relative h-32 overflow-hidden">
              <Image
                src={service.image}
                alt={service.label}
                fill
                className="object-cover opacity-30 group-hover:opacity-45 transition-opacity"
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#111111]" />
            </div>
            <div className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <service.icon
                  className={cn(
                    "h-4 w-4",
                    picked === service.type ? "text-gold" : "text-muted-foreground"
                  )}
                />
                <span
                  className={cn(
                    "text-xs tracking-[0.1em] uppercase font-medium",
                    picked === service.type ? "text-gold" : "text-muted-foreground"
                  )}
                >
                  {service.label}
                </span>
              </div>
              <p className="text-sm text-foreground font-medium mb-1">
                {getPriceLabel(service.surcharge)}
              </p>
              <p className="text-xs text-muted-foreground leading-relaxed">{service.description}</p>
            </div>

            {/* Selected indicator */}
            {picked === service.type && (
              <div className="absolute top-3 right-3 w-5 h-5 bg-gold flex items-center justify-center">
                <span className="text-background text-xs font-bold">✓</span>
              </div>
            )}
          </button>
        ))}
      </div>

      <div className="flex gap-3">
        <Button variant="muted" size="md" onClick={onBack} className="w-24">
          Back
        </Button>
        <Button
          className="flex-1"
          disabled={!picked}
          onClick={() => picked && onNext(picked)}
        >
          Continue
        </Button>
      </div>
    </div>
  );
}
