import * as React from "react";
import { cn } from "@/lib/utils";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="text-xs tracking-[0.1em] uppercase text-[#888888] font-medium"
          >
            {label}
          </label>
        )}
        <textarea
          id={inputId}
          className={cn(
            "w-full bg-[#111111] border border-[#242424] px-4 py-3 text-sm text-[#f0ece4] placeholder:text-[#444444]",
            "transition-colors duration-200 resize-none",
            "focus:outline-none focus:border-[#c4a35a]",
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
Textarea.displayName = "Textarea";

export { Textarea };
