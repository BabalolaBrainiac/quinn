import { cn } from "@/lib/utils";

interface LogoProps {
  variant?: "full" | "mark";
  className?: string;
  size?: "sm" | "md" | "lg";
}

const sizes = {
  sm: { mark: 28, text: "text-lg" },
  md: { mark: 36, text: "text-2xl" },
  lg: { mark: 48, text: "text-4xl" },
};

export function Logo({ variant = "full", className, size = "md" }: LogoProps) {
  const s = sizes[size];

  return (
    <div className={cn("flex items-center gap-3", className)}>
      {/* Mark — stylized Q with needle/ink drop */}
      <svg
        width={s.mark}
        height={s.mark}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Quinn's Artistry logo mark"
      >
        {/* Outer circle — the Q */}
        <circle
          cx="22"
          cy="22"
          r="18"
          stroke="#c4a35a"
          strokeWidth="1.5"
          fill="none"
        />

        {/* Inner thin arc (decorative) */}
        <circle
          cx="22"
          cy="22"
          r="14"
          stroke="#c4a35a"
          strokeWidth="0.5"
          strokeDasharray="3 4"
          fill="none"
          opacity="0.4"
        />

        {/* Q tail — extending diagonally, turning into a needle */}
        <line
          x1="34"
          y1="34"
          x2="46"
          y2="46"
          stroke="#c4a35a"
          strokeWidth="1.5"
          strokeLinecap="round"
        />

        {/* Needle tip (ink drop) */}
        <circle cx="46" cy="46" r="1.5" fill="#c4a35a" />

        {/* Inner serif-style Q crossbar */}
        <line
          x1="28"
          y1="28"
          x2="36"
          y2="36"
          stroke="#c4a35a"
          strokeWidth="3"
          strokeLinecap="round"
          opacity="0.3"
        />

        {/* Central negative space — tiny diamond */}
        <rect
          x="19.5"
          y="19.5"
          width="5"
          height="5"
          transform="rotate(45 22 22)"
          fill="#c4a35a"
          opacity="0.15"
        />

        {/* Dot at center */}
        <circle cx="22" cy="22" r="1.2" fill="#c4a35a" opacity="0.6" />
      </svg>

      {variant === "full" && (
        <div className="flex flex-col leading-none">
          <span
            className={cn(
              "font-display font-light tracking-[0.15em] text-[#f0ece4] uppercase",
              s.text
            )}
          >
            Quinn&apos;s
          </span>
          <span
            className={cn(
              "font-display italic tracking-[0.25em] text-[#c4a35a]",
              size === "sm" ? "text-[10px]" : size === "md" ? "text-xs" : "text-sm"
            )}
          >
            Artistry
          </span>
        </div>
      )}
    </div>
  );
}
