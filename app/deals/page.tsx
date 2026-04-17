import Link from "next/link";
import { ArrowRight, TrendingDown } from "lucide-react";
import { getDealsProducts, getOffersForProduct, PRODUCTS } from "@/data/products";
import { MERCHANTS } from "@/data/merchants";
import { ProductCard } from "@/components/ProductCard";
import { AffiliateDisclosure } from "@/components/AffiliateDisclosure";
import { formatPrice } from "@/lib/utils";

const CONTAINER = "mx-auto max-w-[1440px] px-6 lg:px-10";

export const metadata = {
  title: "Deals — Hardstick",
  description: "Best current golf gear deals across our partner retailers.",
};

export default function DealsPage() {
  const deals = getDealsProducts();
  const onSale = PRODUCTS.filter((p) => p.tags.includes("on-sale"));

  // Build a mini-feed of best retailer offers across products
  const merchantFeed = MERCHANTS.slice(0, 4).map((m) => {
    const offers = PRODUCTS
      .flatMap((p) => getOffersForProduct(p.id).map((o) => ({ product: p, offer: o })))
      .filter((row) => row.offer.merchantId === m.id)
      .sort((a, b) => (a.offer.salePrice ?? a.offer.price) - (b.offer.salePrice ?? b.offer.price))
      .slice(0, 3);
    return { merchant: m, offers };
  });

  return (
    <div className="pb-20">
      <section className={`${CONTAINER} pt-16 pb-10`}>
        <div className="label-mono inline-flex items-center gap-2">
          <TrendingDown className="h-3.5 w-3.5 text-fairway-light" />
          Deals feed
        </div>
        <h1 className="mt-3 text-[42px] font-medium leading-[1.05] tracking-tightest text-bone-50 md:text-[54px]">
          The best golf gear deals, <span className="text-bone-200">tracked across retailers.</span>
        </h1>
        <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-bone-300">
          We check prices across our partner stores every day. These are the current picks worth looking at — value-first products and real price drops, not padded MSRPs.
        </p>
      </section>

      <section className={`${CONTAINER}`}>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {deals.slice(0, 8).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {onSale.length > 0 && (
        <section className={`${CONTAINER} mt-16`}>
          <div className="label-mono mb-4">Price drops</div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {onSale.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}

      <section className={`${CONTAINER} mt-20`}>
        <div className="label-mono mb-4">By retailer</div>
        <div className="grid gap-4 md:grid-cols-2">
          {merchantFeed.map(({ merchant, offers }) => (
            <div key={merchant.id} className="rounded-2xl border border-bone-200/10 bg-ink-850/60 p-5">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-[15px] font-medium text-bone-50">{merchant.name}</div>
                  <div className="label-mono mt-1">{merchant.trustLabel}</div>
                </div>
                <div className="flex h-9 w-14 items-center justify-center rounded-md border border-bone-200/10 bg-ink-900/70 text-[10.5px] font-semibold tracking-[0.1em] text-bone-200">
                  {merchant.logoText}
                </div>
              </div>
              <ul className="mt-5 divide-y divide-bone-200/10">
                {offers.map(({ product, offer }) => (
                  <li key={offer.id} className="flex items-center justify-between py-3">
                    <div className="flex items-center gap-3">
                      <span
                        className="h-10 w-10 shrink-0 rounded-md border border-bone-200/10 bg-cover bg-center"
                        style={{ backgroundImage: `url(${product.image})` }}
                      />
                      <div className="min-w-0">
                        <Link
                          href={`/product/${product.slug}`}
                          className="block truncate text-[13.5px] text-bone-50 hover:underline"
                        >
                          {product.brand} {product.name}
                        </Link>
                        <div className="truncate text-[11.5px] text-bone-400">
                          {product.category}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-[14px] font-semibold text-bone-50">
                        {formatPrice(offer.salePrice ?? offer.price)}
                      </div>
                      {offer.salePrice && (
                        <div className="text-[11px] text-bone-400 line-through">
                          {formatPrice(offer.price)}
                        </div>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
              <Link
                href="/brands"
                className="mt-5 inline-flex items-center gap-1.5 text-[12.5px] font-medium text-bone-200 hover:text-bone-50"
              >
                See all deals from {merchant.name}
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section className={`${CONTAINER} mt-16`}>
        <AffiliateDisclosure variant="block" />
      </section>
    </div>
  );
}
