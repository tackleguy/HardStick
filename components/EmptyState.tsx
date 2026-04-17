import Link from "next/link";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  title?: string;
  description?: string;
  className?: string;
}

export function EmptyState({
  title = "No products match that search",
  description = "Try a broader query, loosen your filters, or browse by category.",
  className,
}: Props) {
  return (
    <div
      className={cn(
        "flex flex-col items-center rounded-2xl border border-bone-200/10 bg-ink-850/40 px-8 py-16 text-center",
        className,
      )}
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-full border border-bone-200/15 bg-ink-900/60">
        <Search className="h-5 w-5 text-bone-300" />
      </div>
      <h3 className="mt-5 text-[17px] font-medium text-bone-50">{title}</h3>
      <p className="mt-2 max-w-md text-[13px] leading-relaxed text-bone-300">
        {description}
      </p>
      <div className="mt-5 flex flex-wrap justify-center gap-2">
        <Link
          href="/category/drivers"
          className="rounded-full border border-bone-200/15 bg-ink-900/60 px-3.5 py-1.5 text-[12.5px] text-bone-200 hover:border-bone-200/30"
        >
          Drivers
        </Link>
        <Link
          href="/category/irons"
          className="rounded-full border border-bone-200/15 bg-ink-900/60 px-3.5 py-1.5 text-[12.5px] text-bone-200 hover:border-bone-200/30"
        >
          Irons
        </Link>
        <Link
          href="/category/rangefinders"
          className="rounded-full border border-bone-200/15 bg-ink-900/60 px-3.5 py-1.5 text-[12.5px] text-bone-200 hover:border-bone-200/30"
        >
          Rangefinders
        </Link>
      </div>
    </div>
  );
}
