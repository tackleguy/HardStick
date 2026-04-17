import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn(
        "group inline-flex items-center gap-2 text-bone-50",
        className,
      )}
      aria-label="Hardstick — Home"
    >
      <span className="flex h-7 w-7 items-center justify-center rounded-md border border-bone-200/20 bg-ink-800/80">
        <span className="relative block h-2.5 w-2.5">
          <span className="absolute inset-0 rounded-[1.5px] bg-sand" />
          <span className="absolute -right-0.5 -top-1 block h-1.5 w-0.5 bg-bone-200" />
        </span>
      </span>
      <span className="text-[17px] font-semibold tracking-tight">
        Hardstick
      </span>
    </Link>
  );
}
