"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { ClubRecommendation } from "@/lib/types";
import { productById, getBestOfferForProduct } from "@/data/products";
import { MERCHANTS } from "@/data/merchants";
import { formatPrice } from "@/lib/utils";
import { cn } from "@/lib/utils";

interface Props {
  composition: ClubRecommendation[];
  className?: string;
  compact?: boolean;
}

export function BagComposition({ composition, className, compact }: Props) {
  return (
    <ul
      className={cn(
        "divide-y divide-bone-200/10 overflow-hidden rounded-2xl border border-bone-200/10 bg-ink-850/60",
        className,
      )}
    >
      {composition.map((rec) => {
        const product = productById(rec.productId);
        if (!product) return null;
        const bestOffer = getBestOfferForProduct(product.id);
        const merchant = bestOffer ? MERCHANTS.find((m) => m.id === bestOffer.merchantId) : undefined;
        const livePrice = bestOffer?.salePrice ?? bestOffer?.price ?? product.priceMin;

        return (
          <li key={rec.bagSlotLabel + product.id} className="flex items-stretch gap-4 p-4 md:p-5">
            <span
              className="h-16 w-16 shrink-0 rounded-md border border-bone-200/10 bg-cover bg-center md:h-20 md:w-20"
              style={{ backgroundImage: `url(${product.image})` }}
            />
            <div className="flex min-w-0 flex-1 flex-col">
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <span className="label-mono">{rec.bagSlotLabel}</span>
                {!compact && (
                  <span className="text-[11.5px] text-bone-400">
                    Match score {Math.round(rec.score)}
                  </span>
                )}
              </div>
              <Link
                href={`/product/${product.slug}`}
                className="mt-1 truncate text-[15px] font-medium text-bone-50 hover:underline"
              >
                {product.brand} · {product.name}
              </Link>
              {!compact && (
                <p className="mt-1 line-clamp-2 text-[12.5px] leading-relaxed text-bone-300">
                  {rec.rationale}
                </p>
              )}
            </div>
            <div className="hidden shrink-0 flex-col items-end justify-between gap-2 sm:flex">
              <div className="text-right">
                <div className="text-[15px] font-semibold text-bone-50">{formatPrice(livePrice)}</div>
                <div className="label-mono mt-0.5">at {merchant?.name ?? "best price"}</div>
              </div>
              {bestOffer && merchant && (
                <a
                  href={`${merchant.affiliateBaseUrl}?p=${encodeURIComponent(product.slug)}`}
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                  className="inline-flex items-center gap-1 rounded-full bg-bone-200 px-3 py-1 text-[12px] font-medium text-ink-900 hover:bg-bone-50"
                >
                  Visit retailer
                  <ArrowUpRight className="h-3 w-3" />
                </a>
              )}
            </div>
          </li>
        );
      })}
    </ul>
  );
}
