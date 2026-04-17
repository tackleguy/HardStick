import Link from "next/link";
import { ArrowRight, CheckCircle2, MousePointerClick, ShieldCheck, Store } from "lucide-react";
import { CATEGORIES } from "@/data/categories";
import { BRANDS } from "@/data/brands";
import { PRODUCTS, getProductsByBrand } from "@/data/products";
import { GUIDES } from "@/data/guides";
import { SearchInput } from "@/components/SearchInput";
import { ProductCard } from "@/components/ProductCard";
import { CategoryCard } from "@/components/CategoryCard";
import { BrandCard } from "@/components/BrandCard";
import { EditorialCard } from "@/components/EditorialCard";
import { SectionHeader } from "@/components/SectionHeader";
import { AffiliateDisclosure } from "@/components/AffiliateDisclosure";
import StackedPanels from "@/components/ui/stacked-panels-cursor-intereactive-component";

const CONTAINER = "mx-auto max-w-[1440px] px-6 lg:px-10";

const QUICK_INTENTS = [
  { label: "Best beginner irons", href: "/search?q=beginner+irons" },
  { label: "Rangefinders under $300", href: "/search?q=rangefinder+under+300" },
  { label: "Premium putters", href: "/search?q=premium+putter" },
  { label: "Gifts under $100", href: "/search?q=gift+under+100" },
  { label: "Best on sale", href: "/search?q=on+sale" },
];

export default function HomePage() {
  const featuredCategories = CATEGORIES.slice(0, 6);
  const trending = PRODUCTS.filter((p) =>
    p.tags.some((t) => t === "most-popular" || t === "best-seller" || t === "editor-pick"),
  ).slice(0, 8);
  const dealsPicks = PRODUCTS.filter((p) => p.tags.includes("best-value") || p.tags.includes("on-sale")).slice(0, 4);
  const featuredGuides = GUIDES.slice(0, 3);

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden pt-20 pb-24 lg:pt-28 lg:pb-32">
        <div className="absolute inset-0 bg-radial-fade opacity-70" aria-hidden />
        <div className="absolute -top-24 inset-x-0 h-[480px] bg-fairway-glow opacity-60" aria-hidden />

        <div className={`relative ${CONTAINER}`}>
          <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_1fr]">
            <div className="relative z-10">
              <div className="label-mono inline-flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-fairway-light animate-pulsedot" />
                The golf gear search engine
              </div>
              <h1 className="mt-5 text-[42px] font-medium leading-[1.02] tracking-tightest text-bone-50 md:text-[58px] lg:text-[66px]">
                Search top golf stores <br className="hidden md:block" />
                <span className="text-bone-200">in one place.</span>
              </h1>
              <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-bone-300 md:text-[16px]">
                Compare clubs, balls, bags, and tech across trusted retailers, then click through to buy at the best price. No checkout. No markup. Just better discovery.
              </p>

              <div className="mt-8 max-w-[640px]">
                <SearchInput size="lg" placeholder='Try "best drivers for improvers" or "Vokey wedge"' />
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {QUICK_INTENTS.map((intent) => (
                  <Link
                    key={intent.href}
                    href={intent.href}
                    className="chip hover:border-bone-200/30"
                  >
                    {intent.label}
                  </Link>
                ))}
              </div>

              <div className="mt-10 grid grid-cols-3 gap-x-6 gap-y-3 text-[12.5px] text-bone-300">
                <HeroStat value="6+" label="Partner retailers" />
                <HeroStat value="20+" label="Top golf brands" />
                <HeroStat value="10%" label="Shared with partners" sublabel="where terms allow" />
              </div>
            </div>

            <div className="relative h-[420px] w-full md:h-[520px] lg:h-[560px]">
              <div className="pointer-events-none absolute -inset-10 rounded-full bg-fairway-glow opacity-50 blur-2xl" />
              <StackedPanels />
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED CATEGORIES */}
      <section className={`${CONTAINER} mt-8`}>
        <SectionHeader
          eyebrow="Shop by category"
          title="Find the right gear faster."
          description="Curated collections, always current, always comparing across top retailers."
          link={{ href: "/category/drivers", label: "Browse all" }}
        />
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featuredCategories.map((cat, i) => (
            <CategoryCard
              key={cat.slug}
              category={cat}
              size={i === 0 ? "lg" : "md"}
              className={i === 0 ? "lg:row-span-2 lg:aspect-auto lg:min-h-[520px]" : ""}
            />
          ))}
        </div>
      </section>

      {/* TRENDING */}
      <section className={`${CONTAINER} mt-24`}>
        <SectionHeader
          eyebrow="Trending now"
          title="What golfers are comparing this week."
          link={{ href: "/search?q=", label: "See more" }}
        />
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {trending.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {trending.slice(4, 8).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* BEST DEALS THIS WEEK */}
      <section className={`${CONTAINER} mt-24`}>
        <div className="relative overflow-hidden rounded-[28px] border border-bone-200/10 bg-ink-850/60 p-8 md:p-12">
          <div className="absolute -right-24 -top-24 h-[320px] w-[320px] rounded-full bg-sand/20 blur-3xl" aria-hidden />
          <div className="relative grid gap-8 lg:grid-cols-[1fr_2fr]">
            <div>
              <div className="label-mono">Best deals this week</div>
              <h2 className="mt-3 text-[30px] font-medium leading-[1.05] tracking-tightest text-bone-50 md:text-[36px]">
                The value picks worth looking at.
              </h2>
              <p className="mt-3 max-w-sm text-[14px] text-bone-300">
                Editor-verified price drops and value picks, checked against every partner store we work with.
              </p>
              <Link
                href="/deals"
                className="btn-primary mt-6"
              >
                See all deals <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {dealsPicks.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* BRANDS */}
      <section className={`${CONTAINER} mt-24`}>
        <SectionHeader
          eyebrow="Brands we track"
          title="The list you'd expect — and the ones you wouldn't."
          description="From tour-validated heavyweights to boutique forgers, we cover what players actually play."
          link={{ href: "/brands", label: "All brands" }}
        />
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {BRANDS.slice(0, 8).map((brand) => (
            <BrandCard key={brand.slug} brand={brand} productCount={getProductsByBrand(brand.slug).length} />
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className={`${CONTAINER} mt-28`}>
        <SectionHeader
          eyebrow="How it works"
          title="Compare gear before you click out."
          description="Hardstick isn't a checkout. We route you to the retailer offering the best fit on price, stock, and shipping — then earn a small commission when you buy."
          align="left"
        />
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          <HowCard
            icon={<MousePointerClick className="h-5 w-5 text-sand" />}
            title="Search with intent"
            body="Search by product, brand, or shopper intent — autocomplete brings you the real answer, not a category wall."
          />
          <HowCard
            icon={<Store className="h-5 w-5 text-sand" />}
            title="Compare retailers"
            body="Every product shows live price across our partner stores with shipping notes, promos, and trust labels."
          />
          <HowCard
            icon={<ShieldCheck className="h-5 w-5 text-sand" />}
            title="Buy with confidence"
            body="You check out directly at the retailer. We may earn a commission — up to 10% where partner terms allow."
          />
        </div>
      </section>

      {/* EDITORIAL */}
      <section className={`${CONTAINER} mt-28`}>
        <SectionHeader
          eyebrow="Buying guides"
          title="Editorial made by actual golfers."
          description="Seasonal picks, category breakdowns, and honest opinions on what we'd put in our own bag."
          link={{ href: "/guides", label: "All guides" }}
        />
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {featuredGuides.map((guide) => (
            <EditorialCard key={guide.slug} guide={guide} />
          ))}
        </div>
      </section>

      {/* FINAL CTA */}
      <section className={`${CONTAINER} mt-28`}>
        <div className="relative overflow-hidden rounded-[28px] border border-bone-200/10 bg-gradient-to-br from-ink-850 via-ink-900 to-ink-950 p-10 md:p-14">
          <div className="absolute inset-0 bg-fairway-glow opacity-40" aria-hidden />
          <div className="relative grid items-center gap-8 lg:grid-cols-[1.2fr_1fr]">
            <div>
              <div className="label-mono">Ready to upgrade</div>
              <h2 className="mt-3 text-[32px] font-medium leading-[1.05] tracking-tightest text-bone-50 md:text-[42px]">
                Find the right setup faster. <br />
                Buy where it's best.
              </h2>
              <p className="mt-4 max-w-lg text-[14.5px] text-bone-300">
                Start with a search. We'll do the comparing. You'll do the playing.
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <SearchInput size="lg" />
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[12.5px] text-bone-300">
                <span className="inline-flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-fairway-light" /> Independent editorial
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-fairway-light" /> No checkout on Hardstick
                </span>
              </div>
            </div>
          </div>
        </div>

        <AffiliateDisclosure className="mt-6" />
      </section>
    </>
  );
}

function HeroStat({
  value,
  label,
  sublabel,
}: {
  value: string;
  label: string;
  sublabel?: string;
}) {
  return (
    <div>
      <div className="font-mono text-[20px] tracking-tight text-bone-50">{value}</div>
      <div className="label-mono mt-1">{label}</div>
      {sublabel && <div className="mt-0.5 text-[11px] text-bone-400">{sublabel}</div>}
    </div>
  );
}

function HowCard({
  icon,
  title,
  body,
}: {
  icon: React.ReactNode;
  title: string;
  body: string;
}) {
  return (
    <div className="surface surface-hover rounded-2xl p-6">
      <div className="flex h-10 w-10 items-center justify-center rounded-full border border-bone-200/15 bg-ink-800/80">
        {icon}
      </div>
      <h3 className="mt-5 text-[18px] font-medium tracking-tight text-bone-50">{title}</h3>
      <p className="mt-2 text-[13px] leading-relaxed text-bone-300">{body}</p>
    </div>
  );
}
