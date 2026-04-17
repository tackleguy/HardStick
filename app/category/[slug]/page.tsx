import { notFound } from "next/navigation";
import { CATEGORIES, getCategory } from "@/data/categories";
import { getProductsByCategory } from "@/data/products";
import CategoryClient from "./CategoryClient";

const CONTAINER = "mx-auto max-w-[1440px] px-6 lg:px-10";

export function generateStaticParams() {
  return CATEGORIES.map((c) => ({ slug: c.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const category = getCategory(params.slug);
  if (!category) return { title: "Category — Hardstick" };
  return {
    title: `${category.name} — Hardstick`,
    description: category.heroCopy,
  };
}

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const category = getCategory(params.slug);
  if (!category) notFound();
  const products = getProductsByCategory(params.slug);

  return (
    <div className="pb-20">
      <section className="relative overflow-hidden border-b border-bone-200/10">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-25"
          style={{ backgroundImage: `url(${category.image})` }}
          aria-hidden
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink-950/60 via-ink-950/80 to-ink-950" aria-hidden />
        <div className={`relative ${CONTAINER} py-16 md:py-24`}>
          <div className="label-mono">Category</div>
          <h1 className="mt-3 text-[42px] font-medium leading-[1.05] tracking-tightest text-bone-50 md:text-[54px]">
            {category.name}
          </h1>
          <p className="mt-4 max-w-2xl text-[15.5px] leading-relaxed text-bone-200">
            {category.heroCopy}
          </p>
          <div className="mt-6 flex flex-wrap gap-x-5 gap-y-1 text-[12.5px] text-bone-300">
            <span>
              <span className="text-bone-50">{products.length}</span> in stock
            </span>
            <span>
              Searching <span className="text-bone-50">6</span> retailers
            </span>
            <span>
              Up to <span className="text-bone-50">10%</span> commission where partner terms allow
            </span>
          </div>
        </div>
      </section>

      <div className={`${CONTAINER} mt-10`}>
        <CategoryClient categorySlug={params.slug} products={products} />
      </div>
    </div>
  );
}
