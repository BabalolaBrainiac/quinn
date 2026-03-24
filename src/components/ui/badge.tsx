import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "gold" | "success" | "warning" | "error" | "muted";
  className?: string;
}

const variants = {
  default: "bg-[#1a1a1a] text-[#888888] border border-[#242424]",
  gold: "bg-[#c4a35a]/10 text-[#c4a35a] border border-[#c4a35a]/30",
  success: "bg-green-900/20 text-green-400 border border-green-800",
  warning: "bg-amber-900/20 text-amber-400 border border-amber-800",
  error: "bg-red-900/20 text-red-400 border border-red-800",
  muted: "bg-transparent text-[#666666] border border-[#1c1c1c]",
};

export function Badge({ children, variant = "default", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 text-[10px] tracking-[0.12em] uppercase font-medium",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
