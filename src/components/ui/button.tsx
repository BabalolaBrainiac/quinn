"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium tracking-[0.1em] uppercase transition-all duration-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#c4a35a] disabled:pointer-events-none disabled:opacity-40 cursor-pointer",
  {
    variants: {
      variant: {
        default:
          "bg-gold text-background hover:bg-[#dfc07a] active:scale-[0.98]",
        outline:
          "border border-gold text-gold hover:bg-gold hover:text-background active:scale-[0.98]",
        ghost:
          "text-foreground hover:text-gold hover:bg-[#1a1a1a] active:scale-[0.98]",
        destructive:
          "bg-red-900/20 border border-red-700 text-red-400 hover:bg-red-900/40",
        muted:
          "bg-[#1a1a1a] text-muted-foreground hover:bg-[#242424] hover:text-foreground",
      },
      size: {
        sm: "h-8 px-4 text-xs",
        md: "h-11 px-6 text-sm",
        lg: "h-13 px-8 text-base",
        icon: "h-9 w-9 p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
