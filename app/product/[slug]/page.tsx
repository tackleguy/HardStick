import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Star, Target, User2 } from "lucide-react";
import {
  PRODUCTS,
  getOffersForProduct,
  getProduct,
  getProductsByCategory,
} from "@/data/products";
import { getBrand } from "@/data/brands";
import { getCategory } from "@/data/categories";
import { ProductCard } from "@/components/ProductCard";
import { MerchantTable } from "@/components/MerchantTable";
import { AffiliateDisclosure } from "@/components/AffiliateDisclosure";
import { ProductBadge } from "@/components/ui/Badge";
import { formatPriceRange } from "@/lib/utils";

const CONTAINER = "mx-auto max-w-[1440px] px-6 lg:px-10";

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const product = getProduct(params.slug);
  if (!product) return { title: "Product — Hardstick" };
  return {
    title: `${product.brand} ${product.name} — Hardstick`,
    description: product.summary,
  };
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = getProduct(params.slug);
  if (!product) notFound();

  const brand = getBrand(product.brandSlug);
  const category = getCategory(product.category);
  const offers = getOffersForProduct(product.id);
  const related = getProductsByCategory(product.category)
    .filter((p) => p.id !== product.id)
    .slice(0, 4);

  const gallery = product.gallery?.length ? product.gallery : [product.image];

  return (
    <div className="pb-20">
      <div className={`${CONTAINER} pt-8`}>
        <Link
          href={category ? `/category/${category.slug}` : "/"}
          className="inline-flex items-center gap-1.5 text-[12.5px] text-bone-300 hover:text-bone-50"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          {category ? `Back to ${category.name}` : "Back"}
        </Link>
      </div>

      <section className={`${CONTAINER} mt-6`}>
        <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr]">
          <div className="space-y-3">
            <div className="aspect-[5/4] overflow-hidden rounded-2xl border border-bone-200/10 bg-ink-900">
              <div
                className="h-full w-full bg-cover bg-center"
                style={{ backgroundImage: `url(${gallery[0]})` }}
              />
            </div>
            {gallery.length > 1 && (
              <div className="grid grid-cols-3 gap-3">
                {gallery.slice(0, 3).map((img, i) => (
                  <div
                    key={i}
                    className="aspect-[5/4] overflow-hidden rounded-xl border border-bone-200/10 bg-ink-900"
                  >
                    <div
                      className="h-full w-full bg-cover bg-center"
                      style={{ backgroundImage: `url(${img})` }}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-2">
              {brand && (
                <Link href={`/brands/${brand.slug}`} className="label-mono hover:text-bone-200">
                  {brand.name}
                </Link>
              )}
              {category && (
                <>
                  <span className="label-mono">·</span>
                  <Link href={`/category/${category.slug}`} className="label-mono hover:text-bone-200">
                    {category.name}
                  </Link>
                </>
              )}
            </div>
            <h1 className="mt-3 text-[32px] font-medium leading-[1.05] tracking-tightest text-bone-50 md:text-[40px]">
              {product.name}
            </h1>
            <p className="mt-3 text-[15px] text-bone-200">{product.subtitle}</p>

            <div className="mt-5 flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-1.5 rounded-full border border-bone-200/15 bg-ink-800/60 px-3 py-1 text-[12.5px] text-bone-100">
                <Star className="h-3.5 w-3.5 fill-sand text-sand" />
                {product.rating.toFixed(1)}
                <span className="text-bone-400">
                  · {product.reviewCount.toLocaleString()} reviews
                </span>
              </div>
              {product.tags.map((tag) => (
                <ProductBadge key={tag} tag={tag} />
              ))}
            </div>

            <div className="mt-6 rounded-2xl border border-bone-200/10 bg-ink-850/60 p-5">
              <div className="flex items-end justify-between">
                <div>
                  <div className="label-mono">Current range</div>
                  <div className="mt-1 text-[26px] font-semibold tracking-tight text-bone-50">
                    {formatPriceRange(product.priceMin, product.priceMax)}
                  </div>
                </div>
                <div className="text-right">
                  <div className="label-mono">Available at</div>
                  <div className="mt-1 text-[14px] text-bone-100">
                    {offers.length} retailer{offers.length === 1 ? "" : "s"}
                  </div>
                </div>
              </div>
              <p className="mt-4 text-[12.5px] leading-relaxed text-bone-400">
                Hardstick is a shopping search engine — not the retailer. Click through to see current pricing and check out directly.
              </p>
            </div>

            <p className="mt-6 text-[14px] leading-relaxed text-bone-200">
              {product.summary}
            </p>

            <ul className="mt-5 space-y-2 text-[13.5px] text-bone-200">
              {product.highlights.map((h) => (
                <li key={h} className="flex items-start gap-2">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-sand" />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className={`${CONTAINER} mt-12`}>
        <MerchantTable product={product} offers={offers} />
      </section>

      <section className={`${CONTAINER} mt-12 grid gap-6 md:grid-cols-2`}>
        <div className="rounded-2xl border border-bone-200/10 bg-ink-850/60 p-6">
          <div className="label-mono flex items-center gap-2">
            <User2 className="h-3.5 w-3.5 text-sand" />
            Who it&apos;s for
          </div>
          <p className="mt-3 text-[14px] leading-relaxed text-bone-100">{product.idealFor}</p>
          <div className="mt-5 flex flex-wrap gap-1.5">
            {product.skillLevel.map((level) => (
              <span key={level} className="chip capitalize">
                {level}
              </span>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-bone-200/10 bg-ink-850/60 p-6">
          <div className="label-mono flex items-center gap-2">
            <Target className="h-3.5 w-3.5 text-sand" />
            Key specs
          </div>
          <dl className="mt-4 divide-y divide-bone-200/10">
            {product.specs.map((spec) => (
              <div key={spec.label} className="grid grid-cols-[1fr_1.4fr] gap-2 py-2 text-[13px]">
                <dt className="text-bone-400">{spec.label}</dt>
                <dd className="text-bone-100">{spec.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className={`${CONTAINER} mt-12`}>
        <div className="rounded-2xl border border-bone-200/10 bg-ink-850/60 p-6">
          <div className="label-mono">Editor&apos;s take</div>
          <p className="mt-3 max-w-3xl text-[15px] leading-relaxed text-bone-100">
            If you&apos;re choosing between this and the obvious alternatives in {category?.name.toLowerCase() ?? "this category"}, the deciding factor is usually fit, not feature set. Compare prices across the retailers above — differences of ${Math.round(product.priceMax - product.priceMin)} aren&apos;t unusual — and prioritize stores with custom-fit support if you&apos;re specifying clubs.
          </p>
        </div>
      </section>

      {related.length > 0 && (
        <section className={`${CONTAINER} mt-16`}>
          <div className="label-mono mb-6">Related in {category?.name}</div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

      <section className={`${CONTAINER} mt-12`}>
        <AffiliateDisclosure variant="block" />
      </section>
    </div>
  );
}
