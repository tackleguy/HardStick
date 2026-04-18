"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "motion/react";
import { ArrowRight, RotateCcw, ShoppingBag, Sparkles } from "lucide-react";
import type { SetRecommendation } from "@/lib/types";
import { BagComposition } from "@/components/quiz/BagComposition";
import { AffiliateDisclosure } from "@/components/AffiliateDisclosure";
import { formatPrice, cn } from "@/lib/utils";

interface Props {
  recommendation: SetRecommendation;
  onRestart: () => void;
}

const ALT_TABS: { key: keyof SetRecommendation["alternates"]; label: string; blurb: string }[] = [
  { key: "best-value", label: "Best value", blurb: "Top-scoring 14-club bag inside a value-first budget." },
  { key: "most-forgiving", label: "Most forgiving", blurb: "Forgiveness-first build for maximum playability." },
  { key: "premium-upgrade", label: "Premium upgrade", blurb: "Premium and tour-grade picks for the upgraded bag." },
];

export function QuizResult({ recommendation, onRestart }: Props) {
  const [tab, setTab] = useState<keyof SetRecommendation["alternates"]>("best-value");
  const { profile, composition, totalEstimatedPrice, alternates } = recommendation;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="space-y-12"
    >
      {/* Profile result */}
      <section>
        <div className="label-mono inline-flex items-center gap-2">
          <Sparkles className="h-3.5 w-3.5 text-sand" />
          Your golfer profile
        </div>
        <h1 className="mt-3 text-[36px] font-medium leading-[1.05] tracking-tightest text-bone-50 md:text-[48px]">
          {profile.label}
        </h1>
        <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-bone-200">
          {profile.summary}
        </p>

        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          <ProfileChip label="Skill" value={profile.archetype} />
          <ProfileChip label="Swing speed" value={profile.swingSpeed} />
          <ProfileChip label="Budget" value={profile.budget} />
          <ProfileChip label="Priority" value={profile.priority} />
          <ProfileChip label="Bag pref" value={profile.bagPref === "one-brand" ? "single brand" : "mixed"} />
          <ProfileChip label="Plays" value={profile.frequency} />
        </div>
      </section>

      {/* Recommended bag */}
      <section>
        <div className="flex flex-col gap-1 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="label-mono">Your recommended 14-club bag</div>
            <h2 className="mt-2 text-[26px] font-medium leading-tight tracking-tightest text-bone-50 md:text-[32px]">
              Built around your profile across all 14 slots.
            </h2>
          </div>
          <div className="rounded-2xl border border-bone-200/15 bg-ink-850/60 px-4 py-3">
            <div className="label-mono">Estimated total</div>
            <div className="text-[20px] font-semibold tracking-tight text-bone-50">
              {formatPrice(totalEstimatedPrice)}
            </div>
          </div>
        </div>

        <BagComposition composition={composition} className="mt-6" />

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <Link href="/build-your-bag" className="btn-primary">
            <ShoppingBag className="h-3.5 w-3.5" /> Open in Bag Builder
          </Link>
          <button onClick={onRestart} className="btn-ghost">
            <RotateCcw className="h-3.5 w-3.5" /> Retake the quiz
          </button>
        </div>
      </section>

      {/* Alternate paths */}
      <section>
        <div className="label-mono">Alternate paths</div>
        <h2 className="mt-2 text-[24px] font-medium leading-tight tracking-tightest text-bone-50 md:text-[28px]">
          Three other bags that fit your profile.
        </h2>

        <div className="mt-6 flex flex-wrap gap-2">
          {ALT_TABS.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={cn(
                "rounded-full border px-4 py-1.5 text-[12.5px] transition-colors",
                tab === t.key
                  ? "border-sand/40 bg-sand/10 text-bone-50"
                  : "border-bone-200/15 bg-ink-900/60 text-bone-200 hover:border-bone-200/30",
              )}
            >
              {t.label}
            </button>
          ))}
        </div>

        <p className="mt-4 max-w-2xl text-[13.5px] leading-relaxed text-bone-300">
          {ALT_TABS.find((t) => t.key === tab)?.blurb}
        </p>

        <BagComposition composition={alternates[tab]} className="mt-5" compact />
      </section>

      <section>
        <div className="rounded-2xl border border-bone-200/10 bg-ink-850/60 p-6">
          <div className="label-mono">Next move</div>
          <h3 className="mt-2 text-[22px] font-medium tracking-tight text-bone-50">
            Compare retailers on every club in your bag.
          </h3>
          <p className="mt-2 max-w-2xl text-[13.5px] text-bone-300">
            Tap any club above to compare current retailer prices, shipping, and promos. Hardstick may earn a small commission if you buy through a partner — at no cost to you.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link href="/category/drivers" className="btn-ghost">Browse drivers <ArrowRight className="h-3.5 w-3.5" /></Link>
            <Link href="/brands" className="btn-ghost">Shop by brand</Link>
            <Link href="/guides" className="btn-ghost">Read buying guides</Link>
          </div>
        </div>
        <AffiliateDisclosure className="mt-6" />
      </section>
    </motion.div>
  );
}

function ProfileChip({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-bone-200/10 bg-ink-900/40 px-3 py-2">
      <div className="label-mono">{label}</div>
      <div className="mt-1 text-[13px] font-medium capitalize text-bone-100">{value}</div>
    </div>
  );
}
