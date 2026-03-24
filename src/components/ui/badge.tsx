import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "gold" | "success" | "warning" | "error" | "muted";
  className?: string;
}

const variants = {
  default: "bg-[#1a1a1a] text-muted-foreground border border-border",
  gold: "bg-gold/10 text-gold border border-gold/30",
  success: "bg-green-900/20 text-green-400 border border-green-800",
  warning: "bg-amber-900/20 text-amber-400 border border-amber-800",
  error: "bg-red-900/20 text-red-400 border border-red-800",
  muted: "bg-transparent text-muted-foreground border border-border",
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
