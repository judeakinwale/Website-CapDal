"use client";

import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import React from "react";

type ButtonProps = {
  children?: React.ReactNode;
  className?: string;
  variant?:
    | "icon"
    | "icon-light"
    | "icon-dark"
    | "close"
    | "default"
    | "small"
    | "large"
    | "full"
    | "default-dark"
    | "default-light"
    | "small-light"
    | "small-dark"
    | "large-light"
    | "large-dark"
    | "full-light"
    | "full-dark";
} & React.ComponentPropsWithoutRef<"button">;

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, className, variant, ...props }, ref) => {
    // special case for close buttons
    if (variant === "close") {
      return (
        <button ref={ref} className={cn(className)} {...props}>
          <span className="w-6 h-6 flex items-center justify-center bg-[#33333466] hover:bg-white/10 border border-[#333] rounded-lg">
            <X className="h-4 w-4" />
          </span>
        </button>
      );
    }

    const baseClasses =
      "relative h-8 flex items-center text-sm rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed";

    const variantClasses = () => {
      switch (variant) {
        case "icon":
          return "min-w-8 justify-center gap-2 px-1 hover:bg-white/5 border border-white/10";
        case "default":
          return "min-w-40 justify-center gap-2 px-3 hover:bg-white/5 border border-white/10";
        case "default-light":
          return "min-w-40 justify-center gap-2 bg-white px-3 hover:bg-white/90 text-black border border-white/10";
        case "default-dark":
          return "min-w-40 justify-center gap-2 bg-white/10 px-3 hover:bg-white/15 text-white border border-white/10";
        case "small":
          return "min-w-20 justify-center gap-2 px-3 hover:bg-white/5 border border-white/10";
        case "small-light":
          return "min-w-20 justify-center gap-2 bg-white px-3 hover:bg-white/90 text-black border border-white/10";
        case "small-dark":
          return "min-w-20 justify-center gap-2 bg-white/5 px-3 hover:bg-white/15 text-white border border-white/10";
        case "large":
          return "min-w-80 justify-center gap-2 px-3 hover:bg-white/5 border border-white/10";
        case "large-light":
          return "min-w-80 justify-center gap-2 bg-white px-3 hover:bg-white/90 text-black border border-white/10";
        case "large-dark":
          return "min-w-80 justify-center gap-2 bg-white/5 px-3 hover:bg-white/15 text-white border border-white/10";
        case "full":
          return "w-full justify-center gap-2 px-3 hover:bg-white/5 border border-white/10";
        case "full-light":
          return "w-full justify-center gap-2 bg-white px-3 hover:bg-white/90 text-black border border-white/10";
        case "full-dark":
          return "w-full justify-center gap-2 bg-white/5 px-3 hover:bg-white/15 text-white border border-white/10";
        default:
          return "";
      }
    };

    return (
      <button
        ref={ref}
        className={cn(`${baseClasses} ${variantClasses()}`, className)}
        {...props}
      >
        {children}
      </button>
    );
  }
);

// Give a proper display name for debugging
Button.displayName = "Button";

export default Button;
