"use client";

import { cn } from "@/lib/utils";
import { BRANDS } from "@/data/brands";
import { CATEGORIES } from "@/data/categories";

export interface SidebarFilters {
  brand?: string;
  skill?: string;
  tag?: string;
  maxPrice?: number;
  category?: string;
}

interface Props {
  filters: SidebarFilters;
  onChange: (next: SidebarFilters) => void;
  showCategory?: boolean;
  className?: string;
}

const SKILLS = [
  { value: "beginner", label: "Beginner" },
  { value: "improver", label: "Improver" },
  { value: "intermediate", label: "Intermediate" },
  { value: "advanced", label: "Advanced" },
  { value: "tour", label: "Tour" },
];

const TAGS = [
  { value: "best-value", label: "Best value" },
  { value: "premium-pick", label: "Premium pick" },
  { value: "best-seller", label: "Best seller" },
  { value: "editor-pick", label: "Editor pick" },
  { value: "on-sale", label: "On sale" },
];

export function FilterSidebar({ filters, onChange, showCategory, className }: Props) {
  function update<K extends keyof SidebarFilters>(key: K, value: SidebarFilters[K]) {
    onChange({ ...filters, [key]: filters[key] === value ? undefined : value });
  }

  return (
    <aside
      className={cn(
        "w-full rounded-2xl border border-bone-200/10 bg-ink-850/60 p-5",
        className,
      )}
    >
      <FilterSection label="Refine" />

      {showCategory && (
        <FilterGroup title="Category">
          {CATEGORIES.slice(0, 10).map((c) => (
            <OptionBtn
              key={c.slug}
              active={filters.category === c.slug}
              onClick={() => update("category", c.slug as SidebarFilters["category"])}
            >
              {c.name}
            </OptionBtn>
          ))}
        </FilterGroup>
      )}

      <FilterGroup title="Brand">
        {BRANDS.map((b) => (
          <OptionBtn
            key={b.slug}
            active={filters.brand === b.slug}
            onClick={() => update("brand", b.slug)}
          >
            {b.name}
          </OptionBtn>
        ))}
      </FilterGroup>

      <FilterGroup title="Skill level">
        {SKILLS.map((s) => (
          <OptionBtn
            key={s.value}
            active={filters.skill === s.value}
            onClick={() => update("skill", s.value)}
          >
            {s.label}
          </OptionBtn>
        ))}
      </FilterGroup>

      <FilterGroup title="Tags">
        {TAGS.map((t) => (
          <OptionBtn
            key={t.value}
            active={filters.tag === t.value}
            onClick={() => update("tag", t.value)}
          >
            {t.label}
          </OptionBtn>
        ))}
      </FilterGroup>

      <FilterGroup title="Max price">
        <div className="px-1 pt-1">
          <input
            type="range"
            min={0}
            max={2000}
            step={50}
            value={filters.maxPrice ?? 2000}
            onChange={(e) => onChange({ ...filters, maxPrice: Number(e.target.value) })}
            className="w-full accent-sand"
          />
          <div className="mt-2 flex justify-between text-[11px] text-bone-400">
            <span>$0</span>
            <span className="text-bone-100">
              {filters.maxPrice && filters.maxPrice < 2000 ? `$${filters.maxPrice}` : "Any"}
            </span>
            <span>$2k+</span>
          </div>
        </div>
      </FilterGroup>

      <button
        type="button"
        className="mt-4 w-full rounded-full border border-bone-200/15 bg-ink-900/60 px-3 py-2 text-[12.5px] text-bone-200 transition-colors hover:border-bone-200/30"
        onClick={() => onChange({})}
      >
        Clear all filters
      </button>
    </aside>
  );
}

function FilterSection({ label }: { label: string }) {
  return <div className="label-mono mb-3 border-b border-bone-200/10 pb-3">{label}</div>;
}

function FilterGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-4 border-b border-bone-200/5 pb-4 last:border-0 last:pb-0">
      <div className="mb-2 text-[12px] font-medium tracking-wide text-bone-100">
        {title}
      </div>
      <div className="flex flex-wrap gap-1.5">{children}</div>
    </div>
  );
}

function OptionBtn({
  active,
  children,
  onClick,
}: {
  active?: boolean;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-full border px-2.5 py-1 text-[12px] transition-colors",
        active
          ? "border-sand/40 bg-sand/10 text-bone-50"
          : "border-bone-200/12 bg-ink-900/60 text-bone-200 hover:border-bone-200/25",
      )}
    >
      {children}
    </button>
  );
}
