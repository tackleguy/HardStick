export type CategorySlug =
  | "drivers"
  | "fairway-woods"
  | "hybrids"
  | "irons"
  | "wedges"
  | "putters"
  | "golf-balls"
  | "bags"
  | "shoes"
  | "apparel"
  | "rangefinders"
  | "simulators"
  | "gifts";

export type SkillLevel = "beginner" | "improver" | "intermediate" | "advanced" | "tour";

export type ProductTag =
  | "best-value"
  | "premium-pick"
  | "most-popular"
  | "on-sale"
  | "editor-pick"
  | "new"
  | "best-seller";

export interface Category {
  slug: CategorySlug;
  name: string;
  blurb: string;
  heroCopy: string;
  image: string;
  count: number;
}

export interface Brand {
  slug: string;
  name: string;
  blurb: string;
  heritage: string;
  accent?: string;
}

export interface Merchant {
  id: string;
  name: string;
  logoText: string;
  affiliateBaseUrl: string;
  commissionRate: number;
  cookieWindowDays: number;
  trustLabel: string;
  shippingNote: string;
}

export interface Offer {
  id: string;
  productId: string;
  merchantId: string;
  price: number;
  salePrice?: number;
  url: string;
  inStock: boolean;
  shippingNote?: string;
  promoCode?: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  brand: string;
  brandSlug: string;
  category: CategorySlug;
  subtitle: string;
  image: string;
  gallery?: string[];
  priceMin: number;
  priceMax: number;
  tags: ProductTag[];
  skillLevel: SkillLevel[];
  handedness: ("right" | "left")[];
  specs: { label: string; value: string }[];
  summary: string;
  highlights: string[];
  idealFor: string;
  rating: number;
  reviewCount: number;
}

export interface EditorialGuide {
  slug: string;
  title: string;
  excerpt: string;
  readingTime: string;
  publishedAt: string;
  cover: string;
  relatedCategories: CategorySlug[];
  featuredProductIds: string[];
  body: { heading: string; text: string }[];
}
