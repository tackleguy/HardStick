import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { BRANDS, getBrand } from "@/data/brands";
import { getProductsByBrand } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import { EmptyState } from "@/components/EmptyState";
import { AffiliateDisclosure } from "@/components/AffiliateDisclosure";

const CONTAINER = "mx-auto max-w-[1440px] px-6 lg:px-10";

export function generateStaticParams() {
  return BRANDS.map((b) => ({ slug: b.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const brand = getBrand(params.slug);
  if (!brand) return { title: "Brand — Hardstick" };
  return {
    title: `${brand.name} — Hardstick`,
    description: brand.blurb,
  };
}

export default function BrandPage({ params }: { params: { slug: string } }) {
  const brand = getBrand(params.slug);
  if (!brand) notFound();
  const products = getProductsByBrand(params.slug);

  return (
    <div className="pb-20">
      <div className={`${CONTAINER} pt-8`}>
        <Link
          href="/brands"
          className="inline-flex items-center gap-1.5 text-[12.5px] text-bone-300 hover:text-bone-50"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          All brands
        </Link>
      </div>

      <section className={`${CONTAINER} pt-6 pb-10`}>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <div
              className="inline-flex h-14 items-center rounded-md border border-bone-200/10 bg-ink-900/60 px-4 text-[20px] font-semibold tracking-tight"
              style={{ color: brand.accent ?? "#F6F3EA" }}
            >
              {brand.name}
            </div>
            <h1 className="mt-5 text-[36px] font-medium leading-[1.05] tracking-tightest text-bone-50 md:text-[46px]">
              {brand.blurb}
            </h1>
            <p className="mt-3 label-mono">{brand.heritage}</p>
          </div>
          <div className="grid grid-cols-2 gap-4 md:w-[260px]">
            <BrandStat value={`${products.length}`} label="Products" />
            <BrandStat value="6" label="Retailers" />
          </div>
        </div>
      </section>

      <section className={`${CONTAINER}`}>
        {products.length === 0 ? (
          <EmptyState title={`No ${brand.name} products tracked yet`} description="Check back soon — we add partner inventory weekly." />
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      <section className={`${CONTAINER} mt-12`}>
        <AffiliateDisclosure />
      </section>
    </div>
  );
}

function BrandStat({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-2xl border border-bone-200/10 bg-ink-850/60 p-4">
      <div className="label-mono">{label}</div>
      <div className="mt-1 text-[24px] font-semibold tracking-tight text-bone-50">{value}</div>
    </div>
  );
}
