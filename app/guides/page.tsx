import { GUIDES } from "@/data/guides";
import { EditorialCard } from "@/components/EditorialCard";

const CONTAINER = "mx-auto max-w-[1440px] px-6 lg:px-10";

export const metadata = {
  title: "Buying guides — Hardstick",
  description: "Editorial buying guides, seasonal picks, and category breakdowns from actual golfers.",
};

export default function GuidesPage() {
  const featured = GUIDES[0];
  const rest = GUIDES.slice(1);

  return (
    <div className="pb-20">
      <section className={`${CONTAINER} pt-16 pb-10`}>
        <div className="label-mono">Editorial</div>
        <h1 className="mt-3 text-[42px] font-medium leading-[1.05] tracking-tightest text-bone-50 md:text-[54px]">
          Golf gear, written by golfers.
        </h1>
        <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-bone-300">
          Seasonal picks, category breakdowns, and honest opinions on what we&apos;d put in our own bag.
        </p>
      </section>

      {featured && (
        <section className={`${CONTAINER}`}>
          <EditorialCard guide={featured} size="lg" className="max-w-none" />
        </section>
      )}

      <section className={`${CONTAINER} mt-10`}>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {rest.map((guide) => (
            <EditorialCard key={guide.slug} guide={guide} />
          ))}
        </div>
      </section>
    </div>
  );
}
