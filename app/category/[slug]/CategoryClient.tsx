"use client";

import { useMemo, useState } from "react";
import { ProductCard } from "@/components/ProductCard";
import { FilterSidebar, SidebarFilters } from "@/components/FilterSidebar";
import { EmptyState } from "@/components/EmptyState";
import { AffiliateDisclosure } from "@/components/AffiliateDisclosure";
import { searchProducts, SortKey } from "@/lib/search";
import type { CategorySlug, Product, ProductTag, SkillLevel } from "@/lib/types";

const SORTS: { key: SortKey; label: string }[] = [
  { key: "popular", label: "Most popular" },
  { key: "price-asc", label: "Price: low to high" },
  { key: "price-desc", label: "Price: high to low" },
  { key: "best-deal", label: "Best deal" },
  { key: "newest", label: "Newest" },
];

export default function CategoryClient({
  categorySlug,
  products,
}: {
  categorySlug: string;
  products: Product[];
}) {
  const [filters, setFilters] = useState<SidebarFilters>({});
  const [sort, setSort] = useState<SortKey>("popular");

  const filtered = useMemo(() => {
    // Search within the category
    return searchProducts(
      {
        category: categorySlug as CategorySlug,
        brand: filters.brand,
        skill: filters.skill as SkillLevel | undefined,
        tag: filters.tag as ProductTag | undefined,
        maxPrice: filters.maxPrice,
      },
      sort,
    );
  }, [categorySlug, filters, sort]);

  // Avoid unused-var warning
  void products;

  return (
    <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
      <FilterSidebar
        filters={filters}
        onChange={setFilters}
        className="h-fit lg:sticky lg:top-20"
      />

      <div>
        <div className="flex items-center justify-between border-b border-bone-200/10 pb-4">
          <div className="text-[13.5px] text-bone-300">
            <span className="text-bone-50 font-medium">{filtered.length}</span>{" "}
            product{filtered.length === 1 ? "" : "s"}
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

        {filtered.length === 0 ? (
          <EmptyState
            className="mt-8"
            title="No matches in this category"
            description="Try removing a filter, or browse a related category from the sidebar."
          />
        ) : (
          <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        <AffiliateDisclosure className="mt-10" />
      </div>
    </div>
  );
}
