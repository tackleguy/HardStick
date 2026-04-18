// =============================================================================
// Hardstick Club Recommendation Engine
// =============================================================================
// This is a TypeScript implementation of a profile-weighted scoring model
// for recommending a 14-club golf bag. The architecture is intentionally
// modeled after a small Python recommendation system. The pseudocode below
// makes the algorithm explicit and reviewable.
//
// ----------------------- Python-style pseudocode -----------------------------
//
//   def build_profile(answers):
//       """Map raw quiz answers → a structured GolferProfile."""
//       return GolferProfile(
//           archetype     = ARCHETYPE_BY_HCP[answers['handicap']],
//           swing_speed   = answers['swing_speed'],
//           budget        = answers['budget'],
//           priority      = answers['priority'],
//           bag_pref      = answers['bag_pref'],
//           struggles     = answers['struggles'],          # multi-select
//           intent        = answers['intent'],
//           frequency     = answers['frequency'],
//       )
//
//   def score(product, profile, slot, weights=DEFAULT_WEIGHTS):
//       """Return a real-valued affinity score in [0, ~30]."""
//       s = 0
//       s += weights.priority   * priority_match(product, profile)
//       s += weights.skill      * skill_match(product, profile)
//       s += weights.swingspeed * swing_speed_match(product, profile)
//       s += weights.struggles  * sum(struggle_match(product, t) for t in profile.struggles)
//       s += weights.intent     * intent_match(product, profile)
//       s -= weights.budget     * budget_penalty(product, profile, slot)
//       return s
//
//   def assemble_bag(products, profile, template):
//       """Greedy per-slot pick + brand-cohesion bonus when bag_pref='one-brand'."""
//       picked, brand_anchor = [], None
//       for slot in template:
//           candidates = [p for p in products if p.category == slot.category]
//           ranked = sorted(candidates,
//                           key=lambda p: score(p, profile, slot)
//                                       + brand_bonus(p, brand_anchor, profile),
//                           reverse=True)
//           top = ranked[0]
//           picked.append(ClubRecommendation(top, slot, score(top, profile, slot),
//                                            rationale=explain(top, profile, slot)))
//           if slot.is_anchor: brand_anchor = top.brand_slug
//       return picked
//
//   def alternates(products, profile, template):
//       """Three alternative bag paths: value / forgiveness-max / premium."""
//       return {
//           'best-value':       assemble_bag(filter_value(products),       profile, template),
//           'most-forgiving':   assemble_bag(filter_forgiving(products),   profile, template),
//           'premium-upgrade':  assemble_bag(filter_premium(products),     profile, template),
//       }
//
// -----------------------------------------------------------------------------

import { PRODUCTS } from "@/data/products";
import type {
  CategorySlug,
  ClubRecommendation,
  GolferProfile,
  Priority,
  Product,
  QuizAnswers,
  SetRecommendation,
  SkillLevel,
  Struggle,
  SwingSpeedTier,
} from "@/lib/types";

// ----------------------------------------------------------------------------
// 1. Profile builder
// ----------------------------------------------------------------------------

const ARCHETYPE_BY_HCP: Record<string, SkillLevel> = {
  "scratch":      "tour",
  "low":          "advanced",   // 1-9
  "mid":          "intermediate", // 10-18
  "high":         "improver",   // 19-28
  "beginner":     "beginner",   // 29+ or first set
};

const ARCHETYPE_LABEL: Record<SkillLevel, string> = {
  beginner:     "First-Set Beginner",
  improver:     "Improving Mid-to-High Handicap",
  intermediate: "Mid-Handicap Player",
  advanced:     "Low-Handicap Player",
  tour:         "Single-Digit / Tour-Style Player",
};

const ARCHETYPE_SUMMARY: Record<SkillLevel, string> = {
  beginner:     "You're building a first serious bag. Forgiveness, easy launch, and value matter most.",
  improver:     "You're playing more and want clubs that protect you on misses while you keep building consistency.",
  intermediate: "You're a mid-handicap with a real swing. Balanced clubs that reward good swings without punishing the average ones.",
  advanced:    "You're a confident ball-striker. You want feel, control, and tour-tested gear.",
  tour:        "You're at or near scratch. Workability and shot-shape control take priority over forgiveness.",
};

export function buildProfile(answers: QuizAnswers): GolferProfile {
  const handicap = (answers.handicap as string) ?? "mid";
  const archetype = ARCHETYPE_BY_HCP[handicap] ?? "intermediate";
  const swingSpeed = (answers.swing_speed as SwingSpeedTier) ?? "moderate";
  const budget = (answers.budget as GolferProfile["budget"]) ?? "balanced";
  const priority = (answers.priority as Priority) ?? "balanced";
  const bagPref = (answers.bag_pref as GolferProfile["bagPref"]) ?? "mixed";
  const struggles = ((answers.struggles as string[]) ?? []) as Struggle[];
  const intent = (answers.intent as GolferProfile["intent"]) ?? "upgrade";
  const frequency = (answers.frequency as GolferProfile["frequency"]) ?? "weekly";

  return {
    archetype,
    swingSpeed,
    budget,
    priority,
    bagPref,
    struggles,
    intent,
    frequency,
    label: ARCHETYPE_LABEL[archetype],
    summary: ARCHETYPE_SUMMARY[archetype],
  };
}

// ----------------------------------------------------------------------------
// 2. Scoring model
// ----------------------------------------------------------------------------

const WEIGHTS = {
  priority: 1.0,
  skill: 1.0,
  swingSpeed: 1.0,
  struggle: 1.0,
  intent: 1.0,
  budget: 1.0,
} as const;

function priorityScore(p: Product, profile: GolferProfile): number {
  if (profile.priority === "forgiveness") return p.forgivenessRating * 2;
  if (profile.priority === "workability") return p.workability * 2;
  // balanced
  return (p.forgivenessRating + p.workability) * 0.8;
}

function skillScore(p: Product, profile: GolferProfile): number {
  return p.skillLevel.includes(profile.archetype) ? 5 : 0;
}

function swingSpeedScore(p: Product, profile: GolferProfile): number {
  return p.swingSpeedFit.includes(profile.swingSpeed) ? 4 : 0;
}

function struggleScore(p: Product, struggle: Struggle): number {
  switch (struggle) {
    case "distance":
      return p.tags.includes("low-spin") || p.spinProfile === "low" ? 2 : 0;
    case "consistency":
      return p.tags.includes("most-forgiving") || p.forgivenessRating >= 4 ? 3 : 0;
    case "slice":
      return p.tags.includes("game-improvement") || p.forgivenessRating >= 4 ? 2 : 0;
    case "launch":
      return p.launchProfile === "high" ? 3 : 0;
    case "short-game":
      return p.spinProfile === "high" && (p.category === "wedges" || p.category === "irons") ? 2 : 0;
    case "putting":
      return p.category === "putters" && p.forgivenessRating >= 4 ? 4 : 0;
  }
}

function intentScore(p: Product, profile: GolferProfile): number {
  let s = 0;
  if (profile.intent === "first-set" && p.tags.includes("best-for-beginners")) s += 3;
  if (profile.intent === "upgrade" && p.tags.includes("premium-pick")) s += 2;
  if (profile.frequency === "weekly" && p.tags.includes("tour-inspired")) s += 1;
  return s;
}

function budgetPenalty(p: Product, profile: GolferProfile, slot: BagSlot): number {
  // Penalty grows with how far the product exceeds the per-slot ceiling.
  const ceil = SLOT_BUDGET_CEIL[profile.budget][slot.category] ?? Infinity;
  if (p.priceMin <= ceil) return 0;
  return Math.min(8, (p.priceMin - ceil) / 60);
}

function brandBonus(p: Product, anchor: string | null, profile: GolferProfile): number {
  if (profile.bagPref !== "one-brand" || !anchor) return 0;
  return p.brandSlug === anchor ? 3 : 0;
}

export function scoreProduct(
  p: Product,
  profile: GolferProfile,
  slot: BagSlot,
  anchor: string | null = null,
): number {
  let s = 0;
  s += WEIGHTS.priority   * priorityScore(p, profile);
  s += WEIGHTS.skill      * skillScore(p, profile);
  s += WEIGHTS.swingSpeed * swingSpeedScore(p, profile);
  s += WEIGHTS.struggle   * profile.struggles.reduce((acc, t) => acc + struggleScore(p, t), 0);
  s += WEIGHTS.intent     * intentScore(p, profile);
  s -= WEIGHTS.budget     * budgetPenalty(p, profile, slot);
  s += brandBonus(p, anchor, profile);
  return s;
}

// ----------------------------------------------------------------------------
// 3. 14-club bag templates
// ----------------------------------------------------------------------------

interface BagSlot {
  key: string;
  label: string;       // e.g. "5-Wood"
  category: CategorySlug;
  clubs: number;       // # of physical clubs this slot accounts for
  isAnchor?: boolean;  // anchor slot drives one-brand cohesion bonus for later picks
}

// Per-archetype 14-club templates. Each template sums to 14 physical clubs.
export const BAG_TEMPLATES: Record<SkillLevel, BagSlot[]> = {
  beginner: [
    { key: "drv",  label: "Driver",          category: "drivers",       clubs: 1 },
    { key: "fw1",  label: "5-Wood",          category: "fairway-woods", clubs: 1 },
    { key: "fw2",  label: "7-Wood",          category: "fairway-woods", clubs: 1 },
    { key: "hyb1", label: "4-Hybrid",        category: "hybrids",       clubs: 1 },
    { key: "hyb2", label: "5-Hybrid",        category: "hybrids",       clubs: 1 },
    { key: "irn",  label: "Iron Set (6-PW)", category: "irons",         clubs: 5, isAnchor: true },
    { key: "wg1",  label: "Gap Wedge (50°)", category: "wedges",        clubs: 1 },
    { key: "wg2",  label: "Sand Wedge (54°)",category: "wedges",        clubs: 1 },
    { key: "wg3",  label: "Lob Wedge (58°)", category: "wedges",        clubs: 1 },
    { key: "ptr",  label: "Putter",          category: "putters",       clubs: 1 },
  ],
  improver: [
    { key: "drv",  label: "Driver",          category: "drivers",       clubs: 1 },
    { key: "fw1",  label: "3-Wood",          category: "fairway-woods", clubs: 1 },
    { key: "fw2",  label: "5-Wood",          category: "fairway-woods", clubs: 1 },
    { key: "hyb1", label: "4-Hybrid",        category: "hybrids",       clubs: 1 },
    { key: "irn",  label: "Iron Set (5-PW)", category: "irons",         clubs: 6, isAnchor: true },
    { key: "wg1",  label: "Gap Wedge (50°)", category: "wedges",        clubs: 1 },
    { key: "wg2",  label: "Sand Wedge (54°)",category: "wedges",        clubs: 1 },
    { key: "wg3",  label: "Lob Wedge (60°)", category: "wedges",        clubs: 1 },
    { key: "ptr",  label: "Putter",          category: "putters",       clubs: 1 },
  ],
  intermediate: [
    { key: "drv",  label: "Driver",          category: "drivers",       clubs: 1 },
    { key: "fw1",  label: "3-Wood",          category: "fairway-woods", clubs: 1 },
    { key: "fw2",  label: "5-Wood",          category: "fairway-woods", clubs: 1 },
    { key: "hyb1", label: "4-Hybrid",        category: "hybrids",       clubs: 1 },
    { key: "irn",  label: "Iron Set (5-PW)", category: "irons",         clubs: 6, isAnchor: true },
    { key: "wg1",  label: "Gap Wedge (50°)", category: "wedges",        clubs: 1 },
    { key: "wg2",  label: "Sand Wedge (54°)",category: "wedges",        clubs: 1 },
    { key: "wg3",  label: "Lob Wedge (60°)", category: "wedges",        clubs: 1 },
    { key: "ptr",  label: "Putter",          category: "putters",       clubs: 1 },
  ],
  advanced: [
    { key: "drv",  label: "Driver",          category: "drivers",       clubs: 1 },
    { key: "fw1",  label: "3-Wood",          category: "fairway-woods", clubs: 1 },
    { key: "uti",  label: "2-Iron Utility",  category: "utility-irons", clubs: 1 },
    { key: "irn",  label: "Iron Set (4-PW)", category: "irons",         clubs: 7, isAnchor: true },
    { key: "wg1",  label: "Gap Wedge (50°)", category: "wedges",        clubs: 1 },
    { key: "wg2",  label: "Sand Wedge (54°)",category: "wedges",        clubs: 1 },
    { key: "wg3",  label: "Lob Wedge (58°)", category: "wedges",        clubs: 1 },
    { key: "ptr",  label: "Putter",          category: "putters",       clubs: 1 },
  ],
  tour: [
    { key: "drv",  label: "Driver",          category: "drivers",       clubs: 1 },
    { key: "fw1",  label: "3-Wood",          category: "fairway-woods", clubs: 1 },
    { key: "uti",  label: "2-Iron Utility",  category: "utility-irons", clubs: 1 },
    { key: "irn",  label: "Iron Set (4-PW)", category: "irons",         clubs: 7, isAnchor: true },
    { key: "wg1",  label: "Gap Wedge (50°)", category: "wedges",        clubs: 1 },
    { key: "wg2",  label: "Sand Wedge (54°)",category: "wedges",        clubs: 1 },
    { key: "wg3",  label: "Lob Wedge (60°)", category: "wedges",        clubs: 1 },
    { key: "ptr",  label: "Putter",          category: "putters",       clubs: 1 },
  ],
};

// Per-budget price ceiling per slot (used in budget_penalty).
const SLOT_BUDGET_CEIL: Record<GolferProfile["budget"], Partial<Record<CategorySlug, number>>> = {
  value: {
    drivers: 450, "fairway-woods": 320, hybrids: 250, "utility-irons": 220,
    irons: 800, wedges: 170, putters: 250,
  },
  balanced: {
    drivers: 600, "fairway-woods": 400, hybrids: 320, "utility-irons": 260,
    irons: 1300, wedges: 200, putters: 400,
  },
  premium: {
    drivers: 800, "fairway-woods": 500, hybrids: 400, "utility-irons": 320,
    irons: 1700, wedges: 220, putters: 600,
  },
  "no-cap": {},
};

// ----------------------------------------------------------------------------
// 4. Bag assembly
// ----------------------------------------------------------------------------

function explain(p: Product, profile: GolferProfile, slot: BagSlot): string {
  const bits: string[] = [];
  if (slot.category === "drivers") {
    if (profile.priority === "forgiveness" && p.forgivenessRating >= 4) bits.push("max-forgiveness driver head");
    if (profile.struggles.includes("slice")) bits.push("draw-bias / high-MOI to fight the slice");
    if (profile.struggles.includes("launch") && p.launchProfile === "high") bits.push("high-launch profile");
    if (p.tags.includes("low-spin") && profile.swingSpeed === "tour") bits.push("low-spin for tour-speed players");
  }
  if (slot.category === "irons") {
    if (profile.archetype === "beginner" || profile.archetype === "improver") bits.push("game-improvement set with hybrid replacements");
    if (profile.archetype === "advanced" || profile.archetype === "tour") bits.push("forged players-set with workable shape");
  }
  if (slot.category === "wedges") {
    bits.push("matched wedge family for consistent feel and bounce");
  }
  if (slot.category === "putters") {
    if (profile.struggles.includes("putting")) bits.push("higher-MOI mallet for forgiveness on start line");
    else bits.push("matches your stroke and feel preference");
  }
  if (bits.length === 0) bits.push("strong fit for your profile across the key dimensions");
  return bits.join("; ");
}

interface AssembleOptions {
  filter?: (p: Product) => boolean;
}

function assembleBag(
  profile: GolferProfile,
  template: BagSlot[],
  options: AssembleOptions = {},
): ClubRecommendation[] {
  const picked: ClubRecommendation[] = [];
  let anchor: string | null = null;

  // de-dup so the same product line isn't recommended for two adjacent slots
  // when there's a real alternative
  const usedIds = new Set<string>();

  for (const slot of template) {
    const allInSlot = PRODUCTS.filter((p) => p.category === slot.category);
    const candidates = (options.filter ? allInSlot.filter(options.filter) : allInSlot);
    if (candidates.length === 0) continue;

    const ranked = candidates
      .map((p) => ({
        p,
        s: scoreProduct(p, profile, slot, anchor)
          - (usedIds.has(p.id) ? 1.5 : 0),
      }))
      .sort((a, b) => b.s - a.s);

    const top = ranked[0];
    if (slot.isAnchor) anchor = top.p.brandSlug;

    // For multi-slot wedge sequence: if we already picked a wedge product,
    // re-prefer same line for continuity (matched wedge family is real-world advice).
    if (slot.category === "wedges" && picked.some((c) => c.category === "wedges")) {
      const last = picked.find((c) => c.category === "wedges")!;
      const lastBrand = PRODUCTS.find((p) => p.id === last.productId)?.brandSlug;
      const sameBrand = ranked.find((r) => r.p.brandSlug === lastBrand && !usedIds.has(r.p.id));
      if (sameBrand) {
        picked.push({
          productId: sameBrand.p.id,
          category: slot.category,
          bagSlotLabel: slot.label,
          rationale: "Matched wedge family for consistent feel across lofts",
          score: sameBrand.s,
        });
        usedIds.add(sameBrand.p.id);
        continue;
      }
    }

    picked.push({
      productId: top.p.id,
      category: slot.category,
      bagSlotLabel: slot.label,
      rationale: explain(top.p, profile, slot),
      score: top.s,
    });
    usedIds.add(top.p.id);
  }

  return picked;
}

// ----------------------------------------------------------------------------
// 5. Alternate-set generators
// ----------------------------------------------------------------------------

function alternateBags(profile: GolferProfile, template: BagSlot[]) {
  const valueProfile: GolferProfile = { ...profile, budget: "value" };
  const forgivingProfile: GolferProfile = { ...profile, priority: "forgiveness" };
  const premiumProfile: GolferProfile = { ...profile, budget: "premium" };

  return {
    "best-value": assembleBag(valueProfile, template, {
      filter: (p) => p.priceMin <= (SLOT_BUDGET_CEIL.value[p.category] ?? Infinity),
    }),
    "most-forgiving": assembleBag(forgivingProfile, template, {
      filter: (p) => p.forgivenessRating >= 4,
    }),
    "premium-upgrade": assembleBag(premiumProfile, template, {
      filter: (p) =>
        p.tags.includes("premium-pick") ||
        p.tags.includes("tour-inspired") ||
        p.priceMin >= (SLOT_BUDGET_CEIL.balanced[p.category] ?? 0),
    }),
  };
}

// ----------------------------------------------------------------------------
// 6. Public API
// ----------------------------------------------------------------------------

export function recommendSet(answers: QuizAnswers): SetRecommendation {
  const profile = buildProfile(answers);
  const template = BAG_TEMPLATES[profile.archetype];
  const composition = assembleBag(profile, template);
  const alternates = alternateBags(profile, template);

  const totalEstimatedPrice = composition.reduce((sum, rec) => {
    const product = PRODUCTS.find((p) => p.id === rec.productId);
    if (!product) return sum;
    // Account for # of physical clubs covered by this slot (mostly relevant for iron sets).
    const slot = template.find((s) => s.label === rec.bagSlotLabel);
    const clubs = slot?.clubs ?? 1;
    // Iron sets are priced as a set; everything else is a single club price.
    if (product.category === "irons") return sum + product.priceMin;
    return sum + product.priceMin * clubs;
  }, 0);

  return { profile, composition, totalEstimatedPrice, alternates };
}
