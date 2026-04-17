import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { GUIDES, getGuide } from "@/data/guides";
import { PRODUCTS } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import { EditorialCard } from "@/components/EditorialCard";
import { AffiliateDisclosure } from "@/components/AffiliateDisclosure";

const CONTAINER = "mx-auto max-w-[1040px] px-6 lg:px-10";
const WIDE = "mx-auto max-w-[1440px] px-6 lg:px-10";

export function generateStaticParams() {
  return GUIDES.map((g) => ({ slug: g.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const guide = getGuide(params.slug);
  if (!guide) return { title: "Guide — Hardstick" };
  return {
    title: `${guide.title} — Hardstick`,
    description: guide.excerpt,
  };
}

export default function GuideDetailPage({ params }: { params: { slug: string } }) {
  const guide = getGuide(params.slug);
  if (!guide) notFound();

  const featured = PRODUCTS.filter((p) => guide.featuredProductIds.includes(p.id));
  const related = GUIDES.filter((g) => g.slug !== guide.slug).slice(0, 3);

  return (
    <div className="pb-20">
      <section className="relative overflow-hidden border-b border-bone-200/10">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-25"
          style={{ backgroundImage: `url(${guide.cover})` }}
          aria-hidden
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink-950/60 via-ink-950/85 to-ink-950" aria-hidden />
        <div className={`relative ${CONTAINER} py-16 md:py-24`}>
          <Link
            href="/guides"
            className="inline-flex items-center gap-1.5 text-[12.5px] text-bone-300 hover:text-bone-50"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            All guides
          </Link>
          <div className="label-mono mt-6 flex items-center gap-2">
            <span>Buying guide</span>
            <span>·</span>
            <span>{guide.readingTime}</span>
          </div>
          <h1 className="mt-4 text-[36px] font-medium leading-[1.06] tracking-tightest text-bone-50 md:text-[48px]">
            {guide.title}
          </h1>
          <p className="mt-4 max-w-2xl text-[16px] leading-relaxed text-bone-200">
            {guide.excerpt}
          </p>
          <p className="mt-3 text-[12px] text-bone-400">{guide.publishedAt}</p>
        </div>
      </section>

      <article className={`${CONTAINER} mt-10 space-y-8`}>
        {guide.body.map((section) => (
          <section key={section.heading}>
            <h2 className="text-[22px] font-medium tracking-tight text-bone-50 md:text-[26px]">
              {section.heading}
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-bone-200">{section.text}</p>
          </section>
        ))}
      </article>

      {featured.length > 0 && (
        <section className={`${WIDE} mt-14`}>
          <div className="label-mono mb-6">Our picks from this guide</div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

      <section className={`${WIDE} mt-14`}>
        <div className="label-mono mb-6">More guides</div>
        <div className="grid gap-4 md:grid-cols-3">
          {related.map((g) => (
            <EditorialCard key={g.slug} guide={g} />
          ))}
        </div>
      </section>

      <section className={`${CONTAINER} mt-14`}>
        <AffiliateDisclosure variant="block" />
      </section>
    </div>
  );
}
