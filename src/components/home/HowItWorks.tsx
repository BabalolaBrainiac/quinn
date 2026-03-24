"use client";

import { motion } from "framer-motion";
import { Search, Palette, CreditCard, Calendar } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Search,
    title: "Browse & Choose",
    description:
      "Explore our curated design library. Find something that speaks to you — or describe your own vision.",
  },
  {
    number: "02",
    icon: Palette,
    title: "Confirm & Quote",
    description:
      "For gallery designs, pricing is instant. For custom pieces, Quinn reviews your concept and sends a personalised quote.",
  },
  {
    number: "03",
    icon: CreditCard,
    title: "Pay Securely",
    description:
      "Complete payment via Paystack — Nigeria's most trusted payment gateway. All prices in Naira.",
  },
  {
    number: "04",
    icon: Calendar,
    title: "Book Your Session",
    description:
      "Select from available dates. Choose studio or home service. Your appointment is confirmed instantly.",
  },
];

export function HowItWorks() {
  return (
    <section className="py-28 px-6 max-w-7xl mx-auto">
      <div className="flex items-center gap-4 mb-4">
        <div className="h-px w-8 bg-[#c4a35a]" />
        <span className="text-[10px] tracking-[0.3em] uppercase text-[#c4a35a]">Process</span>
      </div>
      <div className="flex items-end justify-between mb-16 flex-wrap gap-6">
        <h2 className="font-display text-5xl md:text-6xl font-light text-[#f0ece4]">
          How it works
        </h2>
        <p className="text-sm text-[#666666] max-w-xs leading-relaxed">
          From concept to confirmation in four simple steps.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-[#1c1c1c]">
        {steps.map((step, i) => (
          <motion.div
            key={step.number}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.12 }}
            className="bg-[#080808] p-8 group hover:bg-[#0e0e0e] transition-colors duration-300"
          >
            <div className="flex items-start justify-between mb-8">
              <span className="font-display text-5xl font-light text-[#1c1c1c] group-hover:text-[#242424] transition-colors">
                {step.number}
              </span>
              <step.icon className="h-5 w-5 text-[#c4a35a] opacity-80" />
            </div>
            <h3 className="font-display text-xl font-light text-[#f0ece4] mb-3">
              {step.title}
            </h3>
            <p className="text-sm text-[#666666] leading-relaxed">{step.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
