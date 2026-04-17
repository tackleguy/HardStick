"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { SearchInput } from "@/components/SearchInput";
import { ProductCard } from "@/components/ProductCard";
import { FilterSidebar, SidebarFilters } from "@/components/FilterSidebar";
import { FilterChips } from "@/components/FilterChips";
import { EmptyState } from "@/components/EmptyState";
import { AffiliateDisclosure } from "@/components/AffiliateDisclosure";
import { searchProducts, SortKey } from "@/lib/search";
import type { CategorySlug, ProductTag, SkillLevel } from "@/lib/types";

const CONTAINER = "mx-auto max-w-[1440px] px-6 lg:px-10";

const QUICK_CHIPS: { label: string; tag: ProductTag }[] = [
  { label: "Best value", tag: "best-value" },
  { label: "Most popular", tag: "most-popular" },
  { label: "Editor pick", tag: "editor-pick" },
  { label: "On sale", tag: "on-sale" },
];

const SORTS: { key: SortKey; label: string }[] = [
  { key: "relevance", label: "Relevance" },
  { key: "price-asc", label: "Price: low to high" },
  { key: "price-desc", label: "Price: high to low" },
  { key: "popular", label: "Most popular" },
  { key: "newest", label: "Newest" },
  { key: "best-deal", label: "Best deal" },
];

export default function SearchClient() {
  const params = useSearchParams();
  const q = params.get("q") ?? "";

  const [filters, setFilters] = useState<SidebarFilters>({});
  const [sort, setSort] = useState<SortKey>("relevance");

  const results = useMemo(
    () =>
      searchProducts(
        {
          q,
          brand: filters.brand,
          category: filters.category as CategorySlug | undefined,
          skill: filters.skill as SkillLevel | undefined,
          tag: filters.tag as ProductTag | undefined,
          maxPrice: filters.maxPrice,
        },
        sort,
      ),
    [q, filters, sort],
  );

  return (
    <div className="py-12">
      <div className={CONTAINER}>
        <div className="label-mono">Search</div>
        <h1 className="mt-3 text-[32px] font-medium tracking-tightest text-bone-50 md:text-[40px]">
          {q ? (
            <>
              Results for <span className="text-bone-200">&ldquo;{q}&rdquo;</span>
            </>
          ) : (
            "Search Hardstick"
          )}
        </h1>

        <div className="mt-6 max-w-3xl">
          <SearchInput initialValue={q} size="md" />
        </div>

        <div className="mt-4">
          <FilterChips
            chips={QUICK_CHIPS.map((chip) => ({
              label: chip.label,
              value: chip.tag,
              active: filters.tag === chip.tag,
              onToggle: () =>
                setFilters((f) => ({
                  ...f,
                  tag: f.tag === chip.tag ? undefined : chip.tag,
                })),
            }))}
          />
        </div>
      </div>

      <div className={`${CONTAINER} mt-10 grid gap-8 lg:grid-cols-[260px_1fr]`}>
        <FilterSidebar
          filters={filters}
          onChange={setFilters}
          showCategory
          className="h-fit lg:sticky lg:top-20"
        />

        <div>
          <div className="flex items-center justify-between border-b border-bone-200/10 pb-4">
            <div className="text-[13.5px] text-bone-300">
              <span className="text-bone-50 font-medium">{results.length}</span>{" "}
              product{results.length === 1 ? "" : "s"}
              {q && <span> for &ldquo;{q}&rdquo;</span>}
            </div>
            <label className="flex items-center gap-2 text-[12.5px] text-bone-300">
              <span className="label-mono">Sort</span>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortKey)}
                className="rounded-full border border-bone-200/15 bg-ink-900/70 px-3 py-1.5 text-[12.5px] text-bone-100 focus:outline-none focus:ring-2 focus:ring-bone-200/15"
              >
                {SORTS.map((s) => (
                  <option key={s.key} value={s.key}>
                    {s.label}
                  </option>
                ))}
              </select>
            </label>
          </div>

          {results.length === 0 ? (
            <EmptyState className="mt-8" />
          ) : (
            <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {results.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

          <AffiliateDisclosure className="mt-10" />
        </div>
      </div>
    </div>
  );
}
