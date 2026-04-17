import Link from "next/link";
import { ArrowRight, Compass, Scale, ShieldCheck, Store } from "lucide-react";
import { AffiliateDisclosure } from "@/components/AffiliateDisclosure";
import RotatingEarth from "@/components/ui/wireframe-dotted-globe";

const CONTAINER = "mx-auto max-w-[1440px] px-6 lg:px-10";

export const metadata = {
  title: "How it works — Hardstick",
  description: "Hardstick is a golf gear search engine, not a retailer. Here's how we help you find the right gear faster.",
};

export default function AboutPage() {
  return (
    <div className="pb-20">
      <section className={`${CONTAINER} pt-16 pb-10`}>
        <div className="label-mono">How it works</div>
        <h1 className="mt-3 max-w-3xl text-[42px] font-medium leading-[1.04] tracking-tightest text-bone-50 md:text-[58px]">
          A search engine for golf gear — not a retailer.
        </h1>
        <p className="mt-5 max-w-2xl text-[15.5px] leading-relaxed text-bone-300">
          Hardstick is independent. We don&apos;t stock inventory, we don&apos;t run a checkout, and we don&apos;t take returns. What we do is compare top golf retailers side by side, route you to the best fit on price and shipping, and earn a small commission on referred sales — up to 10% where partner terms allow.
        </p>
      </section>

      <section className={`${CONTAINER} grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-center`}>
        <div className="order-2 lg:order-1">
          <div className="grid gap-4 sm:grid-cols-2">
            <AboutTile
              icon={<Compass className="h-5 w-5 text-sand" />}
              title="Discovery, done well"
              body="Search by product, brand, or shopper intent. We understand queries like 'best beginner irons' or 'rangefinder under 300'."
            />
            <AboutTile
              icon={<Store className="h-5 w-5 text-sand" />}
              title="Every major retailer"
              body="We track the stores serious golfers already shop — PGA Tour Superstore, Global Golf, Fairway Jockey, 2nd Swing, and more."
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
            title="Search"
            body="Start with a product, a brand, or a golfer&apos;s question. Results are ranked for quality, not paid placement."
          />
          <Step
            number="02"
            title="Compare"
            body="See live price and shipping terms across every partner store. We highlight the best price and common promos."
          />
          <Step
            number="03"
            title="Click through"
            body="You buy directly at the retailer. Hardstick earns a commission only if you purchase — no checkout on our side."
          />
        </div>
      </section>

      <section className={`${CONTAINER} mt-20 max-w-3xl`}>
        <h2 className="text-[28px] font-medium leading-[1.1] tracking-tightest text-bone-50">
          What we won&apos;t do.
        </h2>
        <ul className="mt-6 space-y-3 text-[14px] leading-relaxed text-bone-200">
          <li className="flex items-start gap-2.5">
            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-sand" />
            Rank products by commission. Editorial picks are independent.
          </li>
          <li className="flex items-start gap-2.5">
            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-sand" />
            Hide sale pricing. If a retailer is running a deal, we show it.
          </li>
          <li className="flex items-start gap-2.5">
            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-sand" />
            Over-recommend. If two products perform the same, we say so.
          </li>
          <li className="flex items-start gap-2.5">
            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-sand" />
            Pretend to be a retailer. Every click-out opens in a new tab with a clear disclosure.
          </li>
        </ul>

        <div className="mt-10 flex flex-wrap gap-3">
          <Link href="/" className="btn-primary">
            Start a search <ArrowRight className="h-3.5 w-3.5" />
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
