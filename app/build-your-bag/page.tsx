"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowLeftRight, ArrowRight, ArrowUpRight, ShoppingBag, Sparkles } from "lucide-react";
import { recommendSet } from "@/lib/recommendation";
import type { CategorySlug, ClubRecommendation, QuizAnswers } from "@/lib/types";
import { PRODUCTS, getOffersForProduct, productById } from "@/data/products";
import { MERCHANTS } from "@/data/merchants";
import { AffiliateDisclosure } from "@/components/AffiliateDisclosure";
import { formatPrice, cn } from "@/lib/utils";

const CONTAINER = "mx-auto max-w-[1440px] px-6 lg:px-10";

const PROFILE_PRESETS: { id: string; label: string; description: string; answers: QuizAnswers }[] = [
  {
    id: "beginner",
    label: "First-set Beginner",
    description: "Forgiveness-first, easy launch, value-conscious budget.",
    answers: {
      intent: "first-set", handicap: "beginner", swing_speed: "slow",
      priority: "forgiveness", struggles: ["consistency", "slice", "launch"],
      budget: "value", bag_pref: "one-brand", frequency: "monthly",
    },
  },
  {
    id: "improver",
    label: "Improver / Higher Handicap",
    description: "Maximum forgiveness with room to grow into the bag.",
    answers: {
      intent: "upgrade", handicap: "high", swing_speed: "moderate",
      priority: "forgiveness", struggles: ["consistency", "distance"],
      budget: "balanced", bag_pref: "mixed", frequency: "weekly",
    },
  },
  {
    id: "midhandicap",
    label: "Mid Handicap",
    description: "Balanced clubs that play well across the bag.",
    answers: {
      intent: "upgrade", handicap: "mid", swing_speed: "moderate",
      priority: "balanced", struggles: ["consistency", "short-game"],
      budget: "balanced", bag_pref: "mixed", frequency: "weekly",
    },
  },
  {
    id: "lowhandicap",
    label: "Low Handicap",
    description: "Workable players-distance clubs and tour wedges.",
    answers: {
      intent: "upgrade", handicap: "low", swing_speed: "fast",
      priority: "workability", struggles: ["distance"],
      budget: "premium", bag_pref: "mixed", frequency: "weekly",
    },
  },
  {
    id: "tour",
    label: "Tour-style Player",
    description: "Tour-spec heads, blades, low-spin profile, premium build.",
    answers: {
      intent: "upgrade", handicap: "scratch", swing_speed: "tour",
      priority: "workability", struggles: [],
      budget: "no-cap", bag_pref: "mixed", frequency: "weekly",
    },
  },
];

export default function BuildYourBagPage() {
  const [presetId, setPresetId] = useState(PROFILE_PRESETS[2].id);
  const preset = PROFILE_PRESETS.find((p) => p.id === presetId)!;
  const baseRec = useMemo(() => recommendSet(preset.answers), [preset]);

  // user-driven swaps per slot key (storing productId)
  const [swaps, setSwaps] = useState<Record<string, string>>({});

  // reset swaps when preset changes
  function onPresetChange(id: string) {
    setPresetId(id);
    setSwaps({});
  }

  const composition: ClubRecommendation[] = baseRec.composition.map((rec) => {
    const swappedId = swaps[rec.bagSlotLabel];
    return swappedId ? { ...rec, productId: swappedId } : rec;
  });

  const total = composition.reduce((sum, rec) => {
    const product = productById(rec.productId);
    if (!product) return sum;
    return sum + product.priceMin;
  }, 0);

  return (
    <div className="pb-20">
      <section className={`${CONTAINER} pt-16 pb-10`}>
        <div className="label-mono inline-flex items-center gap-2">
          <ShoppingBag className="h-3.5 w-3.5 text-sand" />
          Bag Builder
        </div>
        <h1 className="mt-3 text-[42px] font-medium leading-[1.04] tracking-tightest text-bone-50 md:text-[54px]">
          Build your <span className="text-bone-200">14-club</span> bag.
        </h1>
        <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-bone-300">
          Pick a player profile to start, then swap any club for an alternative. Click through to retailers when you&apos;re ready to buy.
        </p>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <Link href="/quiz" className="btn-primary">
            <Sparkles className="h-3.5 w-3.5" /> Get personalized via the quiz
          </Link>
          <Link href="/category/drivers" className="btn-ghost">
            Browse drivers
          </Link>
        </div>
      </section>

      {/* Preset selector */}
      <section className={`${CONTAINER} mb-8`}>
        <div className="label-mono mb-3">Start from a player profile</div>
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-5">
          {PROFILE_PRESETS.map((p) => (
            <button
              key={p.id}
              onClick={() => onPresetChange(p.id)}
              className={cn(
                "rounded-2xl border px-4 py-3 text-left transition-colors",
                presetId === p.id
                  ? "border-sand/40 bg-sand/5"
                  : "border-bone-200/10 bg-ink-850/60 hover:border-bone-200/30",
              )}
            >
              <div className="text-[13.5px] font-medium text-bone-50">{p.label}</div>
              <div className="mt-1 text-[11.5px] leading-relaxed text-bone-300">{p.description}</div>
            </button>
          ))}
        </div>
      </section>

      {/* Bag */}
      <section className={`${CONTAINER}`}>
        <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
          <div>
            <ul className="divide-y divide-bone-200/10 overflow-hidden rounded-2xl border border-bone-200/10 bg-ink-850/60">
              {composition.map((rec) => (
                <BagSlotRow
                  key={rec.bagSlotLabel}
                  rec={rec}
                  onSwap={(newId) => setSwaps((s) => ({ ...s, [rec.bagSlotLabel]: newId }))}
                />
              ))}
            </ul>
          </div>

          <aside className="sticky top-20 h-fit rounded-2xl border border-bone-200/10 bg-ink-850/60 p-5">
            <div className="label-mono">Bag summary</div>
            <div className="mt-3 text-[15px] text-bone-100">
              {preset.label}
            </div>
            <div className="mt-1 text-[12.5px] text-bone-300">
              {preset.description}
            </div>

            <div className="mt-5 flex items-baseline justify-between border-t border-bone-200/10 pt-4">
              <span className="label-mono">Estimated total</span>
              <span className="text-[22px] font-semibold tracking-tight text-bone-50">{formatPrice(total)}</span>
            </div>
            <p className="mt-2 text-[11.5px] text-bone-400">
              Iron-set price is for the full set; wedges and woods are priced per club. Total assumes the lowest in-range price across our partners.
            </p>

            <div className="mt-6 flex flex-col gap-2">
              <Link href="/quiz" className="btn-primary justify-center">
                Personalize with the quiz
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
              <Link href="/deals" className="btn-ghost justify-center">
                See current deals
              </Link>
            </div>
          </aside>
        </div>

        <AffiliateDisclosure className="mt-10" />
      </section>
    </div>
  );
}

function BagSlotRow({
  rec,
  onSwap,
}: {
  rec: ClubRecommendation;
  onSwap: (productId: string) => void;
}) {
  const product = productById(rec.productId);
  const [open, setOpen] = useState(false);
  if (!product) return null;

  const offers = getOffersForProduct(product.id);
  const bestOffer = offers.length
    ? offers.reduce((best, o) => ((o.salePrice ?? o.price) < (best.salePrice ?? best.price) ? o : best))
    : null;
  const merchant = bestOffer ? MERCHANTS.find((m) => m.id === bestOffer.merchantId) : null;
  const livePrice = bestOffer?.salePrice ?? bestOffer?.price ?? product.priceMin;

  // Alternates: other products in the same category
  const alternates = PRODUCTS.filter((p) => p.category === rec.category && p.id !== product.id).slice(0, 4);

  return (
    <li className="flex flex-col gap-3 p-4 md:flex-row md:items-stretch md:gap-5 md:p-5">
      <span
        className="h-20 w-20 shrink-0 rounded-md border border-bone-200/10 bg-cover bg-center md:h-24 md:w-24"
        style={{ backgroundImage: `url(${product.image})` }}
      />
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-baseline gap-3">
          <span className="label-mono">{rec.bagSlotLabel}</span>
          <span className="text-[11.5px] text-bone-400">{product.category}</span>
        </div>
        <Link
          href={`/product/${product.slug}`}
          className="mt-1 block text-[15.5px] font-medium text-bone-50 hover:underline"
        >
          {product.brand} · {product.name}
        </Link>
        <p className="mt-1 line-clamp-2 text-[12.5px] leading-relaxed text-bone-300">{rec.rationale}</p>

        {open && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.18 }}
            className="mt-4"
          >
            <div className="label-mono mb-2">Swap this slot</div>
            <div className="grid gap-2 sm:grid-cols-2">
              {alternates.map((alt) => (
                <button
                  key={alt.id}
                  onClick={() => {
                    onSwap(alt.id);
                    setOpen(false);
                  }}
                  className="flex items-center gap-3 rounded-xl border border-bone-200/10 bg-ink-900/60 px-3 py-2 text-left hover:border-bone-200/30"
                >
                  <span
                    className="h-10 w-10 shrink-0 rounded-md border border-bone-200/10 bg-cover bg-center"
                    style={{ backgroundImage: `url(${alt.image})` }}
                  />
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-[13px] text-bone-50">{alt.brand} · {alt.name}</div>
                    <div className="text-[11px] text-bone-400">from {formatPrice(alt.priceMin)}</div>
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </div>

      <div className="flex shrink-0 items-end justify-between gap-3 md:flex-col md:items-end">
        <div className="text-right">
          <div className="text-[15px] font-semibold text-bone-50">{formatPrice(livePrice)}</div>
          <div className="label-mono mt-0.5">at {merchant?.name ?? "best price"}</div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setOpen((v) => !v)}
            className="inline-flex items-center gap-1 rounded-full border border-bone-200/15 bg-ink-900/60 px-3 py-1.5 text-[12px] text-bone-200 hover:border-bone-200/30"
          >
            <ArrowLeftRight className="h-3 w-3" />
            Swap
          </button>
          {bestOffer && merchant && (
            <a
              href={`${merchant.affiliateBaseUrl}?p=${encodeURIComponent(product.slug)}`}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="inline-flex items-center gap-1 rounded-full bg-bone-200 px-3 py-1.5 text-[12px] font-medium text-ink-900 hover:bg-bone-50"
            >
              Visit retailer
              <ArrowUpRight className="h-3 w-3" />
            </a>
          )}
        </div>
      </div>
    </li>
  );
}
