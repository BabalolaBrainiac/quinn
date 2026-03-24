"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import { Home, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

const services = [
  {
    type: "Studio",
    icon: MapPin,
    tagline: "Come to the craft",
    description:
      "Visit Quinn's private studio in Lagos. A controlled, sterile environment with everything needed for a flawless session. The classic experience.",
    detail: "Includes full setup, aftercare kit & certificate of authenticity.",
    image: "https://source.unsplash.com/800x600/?tattoo,studio,artist,session&sig=201",
    price: "Standard rates apply",
    href: "/book?service=studio",
    cta: "Book Studio Session",
  },
  {
    type: "Home Service",
    icon: Home,
    tagline: "The studio comes to you",
    description:
      "Quinn brings the studio to your location anywhere in Lagos. Premium convenience with zero compromise on hygiene or artistry.",
    detail: "30% service surcharge applies. Min. notice: 48hrs. Lagos only.",
    image: "https://source.unsplash.com/800x600/?tattoo,arm,skin,ink&sig=202",
    price: "+30% surcharge",
    href: "/book?service=home",
    cta: "Book Home Service",
  },
];

export function ServiceTypes() {
  const [imgErrors, setImgErrors] = useState<Record<string, boolean>>({});
  const handleImgError = (type: string) => setImgErrors((prev) => ({ ...prev, [type]: true }));

  return (
    <section className="py-28 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="h-px w-8 bg-gold" />
          <span className="text-[10px] tracking-[0.3em] uppercase text-gold">Services</span>
        </div>
        <h2 className="font-display text-5xl md:text-6xl font-light text-foreground mb-16">
          Choose your experience
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {services.map((service, i) => (
            <motion.div
              key={service.type}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.15 }}
              className="relative group overflow-hidden bg-surface border border-border"
            >
              {/* Image */}
              <div className="relative h-56 overflow-hidden bg-surface">
                {!imgErrors[service.type] && (
                  <Image
                    src={service.image}
                    alt={service.type}
                    fill
                    className="object-cover opacity-40 group-hover:opacity-55 group-hover:scale-105 transition-all duration-700"
                    unoptimized
                    onError={() => handleImgError(service.type)}
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#111111]" />
              </div>

              {/* Content */}
              <div className="p-8 pt-4">
                <div className="flex items-center gap-2 mb-3">
                  <service.icon className="h-4 w-4 text-gold" />
                  <span className="text-[10px] tracking-[0.2em] uppercase text-gold">
                    {service.type}
                  </span>
                </div>
                <h3 className="font-display text-3xl font-light text-foreground mb-2">
                  {service.tagline}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  {service.description}
                </p>
                <p className="text-xs text-muted-foreground mb-6">{service.detail}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs tracking-[0.1em] text-muted-foreground">
                    {service.price}
                  </span>
                  <Button asChild size="sm">
                    <Link href={service.href}>{service.cta}</Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
