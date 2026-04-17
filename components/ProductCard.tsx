"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { Star } from "lucide-react";
import type { Product } from "@/lib/types";
import { cn, formatPriceRange } from "@/lib/utils";
import { ProductBadge } from "@/components/ui/Badge";
import { getMerchantCountForProduct } from "@/data/products";

interface Props {
  product: Product;
  className?: string;
  priority?: boolean;
}

export function ProductCard({ product, className }: Props) {
  const merchantCount = getMerchantCountForProduct(product.id);
  const headlineTag = product.tags[0];

  return (
    <motion.div
      whileHover={{ y: -3 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      className={cn("group", className)}
    >
      <Link
        href={`/product/${product.slug}`}
        className="flex h-full flex-col overflow-hidden rounded-2xl border border-bone-200/10 bg-ink-850/60 shadow-card transition-colors hover:border-bone-200/25"
      >
        <div className="relative aspect-[4/3] overflow-hidden bg-ink-900">
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-[1.03]"
            style={{ backgroundImage: `url(${product.image})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-900/90 via-ink-900/10 to-transparent" />
          {headlineTag && (
            <div className="absolute left-3 top-3">
              <ProductBadge tag={headlineTag} />
            </div>
          )}
          <div className="absolute bottom-3 right-3 flex items-center gap-1.5 rounded-full bg-ink-950/75 px-2.5 py-1 text-[11px] font-medium text-bone-100 backdrop-blur-sm">
            <Star className="h-3 w-3 fill-sand text-sand" /> {product.rating.toFixed(1)}
          </div>
        </div>

        <div className="flex flex-1 flex-col p-4">
          <div className="label-mono">{product.brand}</div>
          <h3 className="mt-1 text-[15px] font-medium leading-snug text-bone-50">
            {product.name}
          </h3>
          <p className="mt-1 line-clamp-2 text-[12.5px] leading-relaxed text-bone-300">
            {product.subtitle}
          </p>

          <div className="mt-4 flex items-end justify-between">
            <div>
              <div className="label-mono">from</div>
              <div className="text-[16px] font-semibold tracking-tight text-bone-50">
                {formatPriceRange(product.priceMin, product.priceMax)}
              </div>
            </div>
            <div className="text-right">
              <div className="label-mono">at</div>
              <div className="text-[12.5px] text-bone-200">
                {merchantCount} store{merchantCount === 1 ? "" : "s"}
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
