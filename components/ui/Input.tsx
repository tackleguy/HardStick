import { forwardRef } from "react";
import { cn } from "@/lib/utils";

export const Input = forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  function Input({ className, ...props }, ref) {
    return (
      <input
        ref={ref}
        className={cn(
          "h-11 w-full rounded-full border border-bone-200/15 bg-ink-800/70 px-4 text-[14px] text-bone-50 placeholder:text-bone-400 focus:border-bone-200/35 focus:outline-none focus:ring-2 focus:ring-bone-200/15 transition-colors",
          className,
        )}
        {...props}
      />
    );
  },
);
