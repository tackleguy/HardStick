import type { EditorialGuide } from "@/lib/types";

export const GUIDES: EditorialGuide[] = [
  {
    slug: "best-drivers-for-improvers-2025",
    title: "Best drivers for improvers in 2025",
    excerpt:
      "Forgiveness has come a long way. Here are the four heads we'd put a beginner-to-improver behind today, plus how we'd shaft them.",
    readingTime: "6 min read",
    publishedAt: "Mar 4, 2025",
    cover:
      "https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=1600&q=80",
    relatedCategories: ["drivers"],
    featuredProductIds: [
      "p-cal-pdx-driver",
      "p-png-g430-driver",
      "p-tm-qi10-driver",
    ],
    body: [
      {
        heading: "What we look for",
        text: "MOI above 9,500, a face profile that doesn't intimidate at address, and a stock shaft you wouldn't immediately replace. We focus on misses, not pure-strike numbers.",
      },
      {
        heading: "Why MOI matters more than ever",
        text: "Improvers don't strike the center of the face on every swing. A 10K MOI head holds onto more ball speed across the entire pattern, so your bad swings still find playable spots.",
      },
      {
        heading: "The list",
        text: "PING G430 Max 10K, Callaway Paradym Ai Smoke MAX, and the TaylorMade Qi10 lead the field. All three are forgiving without sacrificing stock-shaft quality.",
      },
    ],
  },
  {
    slug: "best-golf-gifts-under-200",
    title: "Best golf gifts under $200",
    excerpt:
      "From rangefinders to glove subscriptions, here are the gifts that actually get used the next round.",
    readingTime: "5 min read",
    publishedAt: "Feb 18, 2025",
    cover:
      "https://images.unsplash.com/photo-1530028828-25e8270793c5?w=1600&q=80",
    relatedCategories: ["gifts", "rangefinders", "apparel"],
    featuredProductIds: [
      "p-tit-perfectfit-glove",
      "p-cly-apparel-quarter",
      "p-tit-prov1",
    ],
    body: [
      {
        heading: "Skip the gimmicks",
        text: "Golfers don't need another novelty divot tool. Pick something they'd actually buy themselves: gloves, balls, layers, and quality accessories.",
      },
      {
        heading: "Three winners",
        text: "A dozen Pro V1s never disappoint. A premium cabretta glove pack pays off every round. A clean midweight layer wears for years.",
      },
    ],
  },
  {
    slug: "best-rangefinders-2025",
    title: "Best rangefinders this year",
    excerpt:
      "We compared lock speed, slope accuracy, and battery life across the three rangefinders that matter in 2025.",
    readingTime: "7 min read",
    publishedAt: "Jan 22, 2025",
    cover:
      "https://images.unsplash.com/photo-1622396481328-9b1b78cdd9fd?w=1600&q=80",
    relatedCategories: ["rangefinders"],
    featuredProductIds: ["p-bsh-prox3"],
    body: [
      {
        heading: "What separates great from good",
        text: "Lock speed under two seconds, an unmistakable confirmation pulse, and slope you can switch off for tournament play.",
      },
      {
        heading: "Our pick",
        text: "Bushnell's Pro X3+ remains the gold standard for laser. Garmin and Nikon make excellent units too, but Bushnell's PinSeeker pulse is still the easiest way to confirm a flag lock.",
      },
    ],
  },
  {
    slug: "premium-golf-shoes-compared",
    title: "Premium golf shoes compared",
    excerpt:
      "FootJoy, Ecco, and adidas at the top end. We tested all three over a full season of walking rounds.",
    readingTime: "8 min read",
    publishedAt: "Dec 12, 2024",
    cover:
      "https://images.unsplash.com/photo-1552346154-21d32810aba3?w=1600&q=80",
    relatedCategories: ["shoes"],
    featuredProductIds: ["p-fj-pro-slx"],
    body: [
      {
        heading: "How we tested",
        text: "Six months of walking rounds, including wet conditions, heat, and tournament use. We graded comfort, traction, waterproofing, and how they wore out.",
      },
      {
        heading: "Where the FootJoy Pro|SLX wins",
        text: "Long-haul comfort. The Stratolite midsole is the closest premium golf shoe to feeling like a daily trainer.",
      },
    ],
  },
  {
    slug: "used-vs-new-clubs",
    title: "Used vs new clubs: what to buy",
    excerpt:
      "Certified pre-owned can be the smartest move in golf. Here's where the value lives and where it doesn't.",
    readingTime: "6 min read",
    publishedAt: "Nov 28, 2024",
    cover:
      "https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?w=1600&q=80",
    relatedCategories: ["irons", "drivers", "wedges"],
    featuredProductIds: ["p-png-i230-iron", "p-tit-vokey-sm10"],
    body: [
      {
        heading: "When used wins",
        text: "Drivers from the previous one or two cycles are often within a yard or two of new and 30–40% cheaper. Iron sets are even better value.",
      },
      {
        heading: "When new wins",
        text: "Wedges (groove life), and any club where you need a precise fit. New custom orders pay back over time.",
      },
    ],
  },
  {
    slug: "what-tour-pros-actually-carry",
    title: "What tour pros actually carry",
    excerpt:
      "We broke down the bags of the top fifty in the world to find what's really in play, not what's in the ad.",
    readingTime: "9 min read",
    publishedAt: "Oct 30, 2024",
    cover:
      "https://images.unsplash.com/photo-1593111774240-d529f12cf4bb?w=1600&q=80",
    relatedCategories: ["drivers", "irons", "wedges", "putters"],
    featuredProductIds: ["p-tit-tsr3-driver", "p-mzn-pro225-iron", "p-sc-newport2"],
    body: [
      {
        heading: "Driver",
        text: "Tour preference still skews toward the lower-spin, more workable heads. Qi10 and TSR3 lead the count.",
      },
      {
        heading: "Wedges and putter",
        text: "Vokey is still dominant in wedge counts, with Scotty Cameron Newport 2 the most-played putter shape on the planet.",
      },
    ],
  },
];

export function getGuide(slug: string) {
  return GUIDES.find((g) => g.slug === slug);
}
