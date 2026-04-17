"use client";

import { ArrowUpRight, Check, Tag, Truck, ShieldCheck } from "lucide-react";
import type { Merchant, Offer, Product } from "@/lib/types";
import { MERCHANTS } from "@/data/merchants";
import { formatPrice } from "@/lib/utils";

interface Props {
  product: Product;
  offers: Offer[];
}

export function MerchantTable({ product, offers }: Props) {
  const rows = offers
    .map((offer) => {
      const merchant = MERCHANTS.find((m) => m.id === offer.merchantId);
      if (!merchant) return null;
      return { offer, merchant };
    })
    .filter(Boolean) as { offer: Offer; merchant: Merchant }[];

  const sorted = rows.slice().sort((a, b) => {
    const ap = a.offer.salePrice ?? a.offer.price;
    const bp = b.offer.salePrice ?? b.offer.price;
    return ap - bp;
  });
  const bestPrice = sorted.length ? sorted[0].offer.salePrice ?? sorted[0].offer.price : undefined;

  return (
    <div className="overflow-hidden rounded-2xl border border-bone-200/10 bg-ink-850/60">
      <div className="flex items-center justify-between border-b border-bone-200/10 px-5 py-3">
        <div>
          <div className="label-mono">Compare retailers</div>
          <div className="mt-0.5 text-[13.5px] text-bone-100">
            {rows.length} partner store{rows.length === 1 ? "" : "s"} available for this product
          </div>
        </div>
        <div className="text-[11.5px] text-bone-400">
          Click through opens the retailer in a new tab
        </div>
      </div>

      <div className="hidden grid-cols-[1.6fr_1fr_1.4fr_1fr_0.8fr] gap-4 border-b border-bone-200/5 px-5 py-2.5 md:grid">
        <div className="label-mono">Retailer</div>
        <div className="label-mono">Price</div>
        <div className="label-mono">Shipping / notes</div>
        <div className="label-mono">Trust</div>
        <div />
      </div>

      <ul>
        {sorted.map(({ offer, merchant }) => {
          const livePrice = offer.salePrice ?? offer.price;
          const isBest = livePrice === bestPrice;
          return (
            <li
              key={offer.id}
              className="grid grid-cols-1 items-center gap-3 border-t border-bone-200/5 px-5 py-4 md:grid-cols-[1.6fr_1fr_1.4fr_1fr_0.8fr] md:gap-4"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-14 items-center justify-center rounded-md border border-bone-200/10 bg-ink-900/70 text-[10.5px] font-semibold tracking-[0.1em] text-bone-200">
                  {merchant.logoText}
                </div>
                <div>
                  <div className="text-[14px] text-bone-50">{merchant.name}</div>
                  <div className="text-[11.5px] text-bone-400">
                    {Math.round(merchant.commissionRate * 100)}% aff · {merchant.cookieWindowDays}d cookie
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-baseline gap-2">
                  <span className="text-[17px] font-semibold tracking-tight text-bone-50">
                    {formatPrice(livePrice)}
                  </span>
                  {offer.salePrice && (
                    <span className="text-[12px] text-bone-400 line-through">
                      {formatPrice(offer.price)}
                    </span>
                  )}
                </div>
                {isBest && (
                  <span className="mt-1 inline-flex items-center gap-1 rounded-full border border-fairway/40 bg-fairway-dark/40 px-2 py-0.5 text-[10.5px] text-fairway-light">
                    <Check className="h-3 w-3" />
                    Best price
                  </span>
                )}
              </div>

              <div className="text-[12.5px] leading-relaxed text-bone-200">
                <div className="flex items-start gap-2">
                  <Truck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-bone-400" />
                  <span>{offer.shippingNote ?? merchant.shippingNote}</span>
                </div>
                {offer.promoCode && (
                  <div className="mt-1.5 flex items-start gap-2 text-sand-warm">
                    <Tag className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                    <span>Use code <span className="font-mono text-bone-50">{offer.promoCode}</span></span>
                  </div>
                )}
                {!offer.inStock && (
                  <div className="mt-1.5 text-[11.5px] text-flag">Out of stock</div>
                )}
              </div>

              <div className="flex items-center gap-1.5 text-[11.5px] text-bone-300">
                <ShieldCheck className="h-3.5 w-3.5 text-fairway-light" />
                {merchant.trustLabel}
              </div>

              <div className="flex md:justify-end">
                <a
                  href={`${merchant.affiliateBaseUrl}?p=${encodeURIComponent(product.slug)}`}
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                  className="inline-flex h-9 items-center gap-1.5 rounded-full bg-bone-200 px-3.5 text-[12.5px] font-medium text-ink-900 transition-colors hover:bg-bone-50"
                >
                  Visit retailer
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </li>
          );
        })}
      </ul>

      <div className="border-t border-bone-200/10 bg-ink-900/40 px-5 py-3 text-[11.5px] text-bone-400">
        Prices, stock, and promotions are provided by retailers and may change. Hardstick may earn a commission when you click through and buy.
      </div>
    </div>
  );
}
