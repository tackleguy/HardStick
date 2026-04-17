import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Brand } from "@/lib/types";
import { cn } from "@/lib/utils";

export function BrandCard({
  brand,
  className,
  productCount,
}: {
  brand: Brand;
  productCount?: number;
  className?: string;
}) {
  return (
    <Link
      href={`/brands/${brand.slug}`}
      className={cn(
        "group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-bone-200/10 bg-ink-850/60 p-5 transition-colors hover:border-bone-200/25",
        className,
      )}
    >
      <div className="flex items-start justify-between">
        <div
          className="flex h-12 items-center rounded-md border border-bone-200/10 bg-ink-900/60 px-3 font-semibold tracking-tight"
          style={{ color: brand.accent ?? "#F6F3EA" }}
        >
          {brand.name}
        </div>
        <ArrowUpRight className="h-4 w-4 text-bone-300 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </div>
      <div className="mt-5">
        <p className="text-[13px] leading-relaxed text-bone-200">{brand.blurb}</p>
      </div>
      <div className="mt-5 flex items-center justify-between text-[11.5px] text-bone-400">
        <span className="label-mono">{brand.heritage}</span>
        {productCount !== undefined && (
          <span>{productCount} product{productCount === 1 ? "" : "s"}</span>
        )}
      </div>
    </Link>
  );
}
