import { PRODUCTS } from "@/data/products";
import type { CategorySlug, Product, ProductTag, SkillLevel } from "@/lib/types";

export interface SearchFilters {
  q?: string;
  category?: CategorySlug;
  brand?: string;
  skill?: SkillLevel;
  tag?: ProductTag;
  minPrice?: number;
  maxPrice?: number;
}

export type SortKey = "relevance" | "price-asc" | "price-desc" | "popular" | "newest" | "best-deal";

const INTENT_BOOSTS: Record<string, { tags?: ProductTag[]; skills?: SkillLevel[]; categories?: CategorySlug[] }> = {
  beginner: { skills: ["beginner", "improver"], tags: ["best-value"] },
  improver: { skills: ["beginner", "improver"] },
  premium: { tags: ["premium-pick"] },
  best: { tags: ["editor-pick", "best-seller"] },
  cheap: { tags: ["best-value"] },
  value: { tags: ["best-value"] },
  "on sale": { tags: ["on-sale"] },
  popular: { tags: ["most-popular", "best-seller"] },
  pro: { skills: ["advanced", "tour"] },
  forgiving: { skills: ["beginner", "improver"], tags: ["best-value"] },
  rangefinder: { categories: ["rangefinders"] },
  iron: { categories: ["irons"] },
  irons: { categories: ["irons"] },
  driver: { categories: ["drivers"] },
  drivers: { categories: ["drivers"] },
  wedge: { categories: ["wedges"] },
  wedges: { categories: ["wedges"] },
  putter: { categories: ["putters"] },
  putters: { categories: ["putters"] },
  ball: { categories: ["golf-balls"] },
  balls: { categories: ["golf-balls"] },
  shoe: { categories: ["shoes"] },
  shoes: { categories: ["shoes"] },
  bag: { categories: ["bags"] },
  bags: { categories: ["bags"] },
  glove: { categories: ["gifts"] },
  gift: { categories: ["gifts"] },
  gifts: { categories: ["gifts"] },
};

function scoreProduct(product: Product, q: string): number {
  if (!q) return 0;
  const needle = q.toLowerCase();
  let score = 0;
  if (product.name.toLowerCase().includes(needle)) score += 8;
  if (product.brand.toLowerCase().includes(needle)) score += 5;
  if (product.subtitle.toLowerCase().includes(needle)) score += 3;
  if (product.summary.toLowerCase().includes(needle)) score += 1;
  if (product.category.toLowerCase().includes(needle)) score += 4;
  for (const word of needle.split(/\s+/)) {
    const boost = INTENT_BOOSTS[word];
    if (!boost) continue;
    if (boost.tags?.some((t) => product.tags.includes(t))) score += 2;
    if (boost.skills?.some((s) => product.skillLevel.includes(s))) score += 2;
    if (boost.categories?.includes(product.category)) score += 4;
  }
  return score;
}

export function searchProducts(filters: SearchFilters, sort: SortKey = "relevance"): Product[] {
  let results = PRODUCTS.slice();

  if (filters.category) {
    results = results.filter((p) => p.category === filters.category);
  }
  if (filters.brand) {
    results = results.filter((p) => p.brandSlug === filters.brand);
  }
  if (filters.skill) {
    results = results.filter((p) => p.skillLevel.includes(filters.skill!));
  }
  if (filters.tag) {
    results = results.filter((p) => p.tags.includes(filters.tag!));
  }
  if (typeof filters.minPrice === "number") {
    results = results.filter((p) => p.priceMax >= filters.minPrice!);
  }
  if (typeof filters.maxPrice === "number") {
    results = results.filter((p) => p.priceMin <= filters.maxPrice!);
  }

  if (filters.q) {
    const scored = results
      .map((p) => ({ p, s: scoreProduct(p, filters.q!) }))
      .filter((r) => r.s > 0);
    results = scored
      .sort((a, b) => b.s - a.s)
      .map((r) => r.p);
  }

  switch (sort) {
    case "price-asc":
      results.sort((a, b) => a.priceMin - b.priceMin);
      break;
    case "price-desc":
      results.sort((a, b) => b.priceMax - a.priceMax);
      break;
    case "popular":
      results.sort((a, b) => b.reviewCount - a.reviewCount);
      break;
    case "newest":
      results.sort((a, b) => (b.tags.includes("new") ? 1 : 0) - (a.tags.includes("new") ? 1 : 0));
      break;
    case "best-deal":
      results.sort((a, b) => {
        const ad = a.tags.includes("on-sale") || a.tags.includes("best-value") ? 1 : 0;
        const bd = b.tags.includes("on-sale") || b.tags.includes("best-value") ? 1 : 0;
        return bd - ad;
      });
      break;
  }

  return results;
}

export function suggest(q: string, limit = 6): Product[] {
  if (!q.trim()) return [];
  return PRODUCTS
    .map((p) => ({ p, s: scoreProduct(p, q) }))
    .filter((r) => r.s > 0)
    .sort((a, b) => b.s - a.s)
    .slice(0, limit)
    .map((r) => r.p);
}
