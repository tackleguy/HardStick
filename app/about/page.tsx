import Link from "next/link";
import { ArrowRight, Compass, Scale, ShieldCheck, Sparkles, Store } from "lucide-react";
import { AffiliateDisclosure } from "@/components/AffiliateDisclosure";
import RotatingEarth from "@/components/ui/wireframe-dotted-globe";

const CONTAINER = "mx-auto max-w-[1440px] px-6 lg:px-10";

export const metadata = {
  title: "How it works — Hardstick",
  description: "Hardstick is a 14-club search engine and affiliate catalog. Here's how the quiz and recommendation engine work.",
};

export default function AboutPage() {
  return (
    <div className="pb-20">
      <section className={`${CONTAINER} pt-16 pb-10`}>
        <div className="label-mono">How it works</div>
        <h1 className="mt-3 max-w-3xl text-[42px] font-medium leading-[1.04] tracking-tightest text-bone-50 md:text-[58px]">
          A research-driven search engine for golf clubs.
        </h1>
        <p className="mt-5 max-w-2xl text-[15.5px] leading-relaxed text-bone-300">
          Hardstick focuses on the 14-club bag — drivers, woods, hybrids, irons, wedges, and putters. Take the quiz and our weighted scoring model picks a complete setup for your profile. We don&apos;t stock inventory. We route you to the retailer offering the best fit, and may earn a small commission when you buy.
        </p>

        <div className="mt-7 flex flex-wrap gap-3">
          <Link href="/quiz" className="btn-primary">
            <Sparkles className="h-3.5 w-3.5" /> Take the 14-club quiz
          </Link>
          <Link href="/build-your-bag" className="btn-ghost">Build a bag manually</Link>
        </div>
      </section>

      <section className={`${CONTAINER} grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-center`}>
        <div className="order-2 lg:order-1">
          <div className="grid gap-4 sm:grid-cols-2">
            <AboutTile
              icon={<Compass className="h-5 w-5 text-sand" />}
              title="The 14-club quiz"
              body="Nine questions. Conditional logic. A profile-weighted scoring model picks the right club for every slot in the bag."
            />
            <AboutTile
              icon={<Store className="h-5 w-5 text-sand" />}
              title="Every major club brand"
              body="Titleist, TaylorMade, Callaway, PING, Cobra, Mizuno, Srixon, Cleveland, Scotty Cameron, PXG, Wilson, XXIO — all in one catalog."
            />
            <AboutTile
              icon={<Scale className="h-5 w-5 text-sand" />}
              title="Honest comparison"
              body="We surface the best price and the best fit, not the highest commission. Editorial picks are independent of affiliate terms."
            />
            <AboutTile
              icon={<ShieldCheck className="h-5 w-5 text-sand" />}
              title="Transparent economics"
              body="We may earn a commission when you click a partner link and buy. We aim for 10% where partner terms allow."
            />
          </div>
        </div>
        <div className="order-1 lg:order-2">
          <RotatingEarth width={620} height={520} className="mx-auto" />
          <p className="mt-4 max-w-lg text-[12.5px] leading-relaxed text-bone-400 lg:mx-auto">
            Retailer coverage spans North America, the UK, and Australia — and expands weekly as we sign new partners.
          </p>
        </div>
      </section>

      <section className={`${CONTAINER} mt-24`}>
        <div className="grid gap-8 rounded-[28px] border border-bone-200/10 bg-ink-850/60 p-10 md:grid-cols-3 md:p-12">
          <Step
            number="01"
            title="Take the quiz"
            body="Skill, swing speed, budget, priority, struggles, and intent. Nine questions total — two minutes."
          />
          <Step
            number="02"
            title="Get your bag"
            body="Our Python-style scoring engine ranks every product against your profile and assembles a full 14-club setup."
          />
          <Step
            number="03"
            title="Click through"
            body="You buy directly at the retailer. Hardstick earns a commission only if you purchase — no checkout on our side."
          />
        </div>
      </section>

      <section className={`${CONTAINER} mt-20 grid gap-10 lg:grid-cols-[1.1fr_1fr]`}>
        <div>
          <div className="label-mono">The recommendation engine</div>
          <h2 className="mt-2 text-[28px] font-medium leading-[1.1] tracking-tightest text-bone-50 md:text-[34px]">
            Weighted scoring, not vibes.
          </h2>
          <p className="mt-4 text-[14.5px] leading-relaxed text-bone-200">
            The engine mirrors a small Python recommendation system. Every answer feeds into a <code className="font-mono text-bone-50">GolferProfile</code>. Every product in the catalog is scored against the profile along six dimensions. Slots in the 14-club template get the highest-scoring product, with a brand-cohesion bonus if you chose a single-brand bag.
          </p>
          <ul className="mt-5 space-y-3 text-[13.5px] leading-relaxed text-bone-200">
            <li className="flex items-start gap-2.5">
              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-sand" />
              <span><span className="font-mono text-bone-50">priority_match</span> weights forgiveness vs workability per product.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-sand" />
              <span><span className="font-mono text-bone-50">skill_match</span> and <span className="font-mono text-bone-50">swing_speed_match</span> reward products fit for your archetype.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-sand" />
              <span><span className="font-mono text-bone-50">struggle_match</span> maps answers like &ldquo;slice&rdquo; or &ldquo;launch&rdquo; to club tags and launch profiles.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-sand" />
              <span><span className="font-mono text-bone-50">budget_penalty</span> down-weights products exceeding your per-slot ceiling.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-sand" />
              <span>Three alternate bags are generated in parallel: best-value, most-forgiving, and premium-upgrade.</span>
            </li>
          </ul>
        </div>
        <div className="rounded-2xl border border-bone-200/10 bg-ink-900/60 p-6 font-mono text-[12px] leading-relaxed text-bone-200">
          <div className="label-mono mb-3">Engine pseudocode</div>
          <pre className="overflow-x-auto whitespace-pre-wrap text-[11.5px] leading-[1.55]">{`def score(p, profile, slot):
  s = 0
  s += priority_match(p, profile)         # forgiveness vs workability
  s += skill_match(p, profile.archetype)
  s += swing_speed_match(p, profile)
  s += sum(struggle_match(p, t)
           for t in profile.struggles)
  s += intent_match(p, profile)
  s -= budget_penalty(p, profile, slot)
  return s

def assemble_bag(products, profile, template):
  bag, anchor = [], None
  for slot in template:
    best = max(
      products_in(slot.category),
      key=lambda p: score(p, profile, slot)
                  + brand_bonus(p, anchor, profile),
    )
    bag.append(ClubRecommendation(best, slot))
    if slot.is_anchor: anchor = best.brand
  return bag`}</pre>
        </div>
      </section>

      <section className={`${CONTAINER} mt-20 max-w-3xl`}>
        <h2 className="text-[28px] font-medium leading-[1.1] tracking-tightest text-bone-50">
          What we won&apos;t do.
        </h2>
        <ul className="mt-6 space-y-3 text-[14px] leading-relaxed text-bone-200">
          <li className="flex items-start gap-2.5">
            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-sand" />
            Rank products by commission. Editorial picks and quiz outputs are independent.
          </li>
          <li className="flex items-start gap-2.5">
            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-sand" />
            Hide sale pricing. If a retailer is running a deal, we show it.
          </li>
          <li className="flex items-start gap-2.5">
            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-sand" />
            Over-recommend. If two clubs perform the same, we say so.
          </li>
          <li className="flex items-start gap-2.5">
            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-sand" />
            Pretend to be a retailer. Every click-out opens in a new tab with a clear disclosure.
          </li>
        </ul>

        <div className="mt-10 flex flex-wrap gap-3">
          <Link href="/quiz" className="btn-primary">
            Take the quiz <ArrowRight className="h-3.5 w-3.5" />
          </Link>
          <Link href="/disclosure" className="btn-ghost">
            Read our full disclosure
          </Link>
        </div>
      </section>

      <section className={`${CONTAINER} mt-16`}>
        <AffiliateDisclosure variant="block" />
      </section>
    </div>
  );
}

function AboutTile({
  icon,
  title,
  body,
}: {
  icon: React.ReactNode;
  title: string;
  body: string;
}) {
  return (
    <div className="rounded-2xl border border-bone-200/10 bg-ink-850/60 p-5">
      <div className="flex h-10 w-10 items-center justify-center rounded-full border border-bone-200/15 bg-ink-800/80">
        {icon}
      </div>
      <h3 className="mt-4 text-[16px] font-medium tracking-tight text-bone-50">{title}</h3>
      <p className="mt-2 text-[13px] leading-relaxed text-bone-300">{body}</p>
    </div>
  );
}

function Step({ number, title, body }: { number: string; title: string; body: string }) {
  return (
    <div>
      <div className="label-mono text-sand">{number}</div>
      <h3 className="mt-3 text-[22px] font-medium tracking-tight text-bone-50">{title}</h3>
      <p className="mt-2 text-[13.5px] leading-relaxed text-bone-300">{body}</p>
    </div>
  );
}
