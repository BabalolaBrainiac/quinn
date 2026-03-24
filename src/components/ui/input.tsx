import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, error, id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="text-xs tracking-[0.1em] uppercase text-muted-foreground font-medium"
          >
            {label}
          </label>
        )}
        <input
          id={inputId}
          type={type}
          className={cn(
            "h-11 w-full bg-surface border border-border px-4 text-sm text-foreground placeholder:text-muted-foreground",
            "transition-colors duration-200",
            "focus:outline-none focus:border-gold",
            "disabled:opacity-40 disabled:cursor-not-allowed",
            error && "border-red-700",
            className
          )}
          ref={ref}
          {...props}
        />
        {error && <span className="text-xs text-red-400">{error}</span>}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
