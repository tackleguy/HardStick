export type CategorySlug =
  | "drivers"
  | "fairway-woods"
  | "hybrids"
  | "utility-irons"
  | "irons"
  | "wedges"
  | "putters";

export type SkillLevel = "beginner" | "improver" | "intermediate" | "advanced" | "tour";

export type ProductTag =
  | "best-value"
  | "premium-pick"
  | "most-popular"
  | "on-sale"
  | "editor-pick"
  | "new"
  | "best-seller"
  | "most-forgiving"
  | "low-spin"
  | "tour-inspired"
  | "best-for-beginners"
  | "game-improvement";

export type LaunchProfile = "low" | "mid" | "high";
export type SpinProfile = "low" | "mid" | "high";
export type ForgivenessTier = 1 | 2 | 3 | 4 | 5;
export type SwingSpeedTier = "slow" | "moderate" | "fast" | "tour";

export interface Category {
  slug: CategorySlug;
  name: string;
  blurb: string;
  heroCopy: string;
  image: string;
  count: number;
  bagSlots: number;
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
  // Club-specific recommendation fields
  forgivenessRating: ForgivenessTier;
  launchProfile: LaunchProfile;
  spinProfile: SpinProfile;
  swingSpeedFit: SwingSpeedTier[];
  workability: 1 | 2 | 3 | 4 | 5;
  // Iron-set / wedge sub-properties
  setComposition?: string;
  loftDeg?: number;
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

// =====================================================================
// Quiz + recommendation engine types
// =====================================================================

export type BudgetTier = "value" | "balanced" | "premium" | "no-cap";
export type Priority = "forgiveness" | "balanced" | "workability";
export type BagPreference = "one-brand" | "mixed";
export type BuyerIntent = "first-set" | "upgrade" | "specific-clubs";
export type PlayFrequency = "weekly" | "monthly" | "casual";
export type Struggle = "distance" | "consistency" | "slice" | "launch" | "short-game" | "putting";

export interface QuizOption {
  value: string;
  label: string;
  description?: string;
}

export interface QuizQuestion {
  id: string;
  prompt: string;
  helper?: string;
  type: "single" | "multi";
  options: QuizOption[];
  conditional?: (answers: QuizAnswers) => boolean;
}

export type QuizAnswerValue = string | string[];
export type QuizAnswers = Record<string, QuizAnswerValue>;

export interface GolferProfile {
  archetype: SkillLevel;
  swingSpeed: SwingSpeedTier;
  budget: BudgetTier;
  priority: Priority;
  bagPref: BagPreference;
  struggles: Struggle[];
  intent: BuyerIntent;
  frequency: PlayFrequency;
  handicap?: number;
  label: string; // human-friendly profile name
  summary: string; // 1-2 sentence rationale
}

export interface ClubRecommendation {
  productId: string;
  category: CategorySlug;
  bagSlotLabel: string; // e.g. "3-Wood", "Pitching Wedge", "Putter"
  rationale: string;
  score: number;
}

export interface SetRecommendation {
  profile: GolferProfile;
  composition: ClubRecommendation[];
  totalEstimatedPrice: number;
  alternates: {
    "best-value": ClubRecommendation[];
    "most-forgiving": ClubRecommendation[];
    "premium-upgrade": ClubRecommendation[];
  };
}
