import type { Category } from "@/lib/types";

export const CATEGORIES: Category[] = [
  {
    slug: "drivers",
    name: "Drivers",
    blurb: "The first club out of the bag. Distance, forgiveness, and shape.",
    heroCopy:
      "From tour-spec low spin to game-improvement draw-bias chassis. Compare current drivers across leading retailers.",
    image: "https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=1200&q=80",
    count: 8,
    bagSlots: 1,
  },
  {
    slug: "fairway-woods",
    name: "Fairway Woods",
    blurb: "Off the deck, off the tee, off the hook.",
    heroCopy: "High-launch 3-woods, versatile 5-woods, and strong-loft gap fillers.",
    image: "https://images.unsplash.com/photo-1535132011086-b8818f016104?w=1200&q=80",
    count: 5,
    bagSlots: 2,
  },
  {
    slug: "hybrids",
    name: "Hybrids",
    blurb: "Long-iron replacements that actually go in the air.",
    heroCopy: "Bridge the gap between your longest iron and your fairway with confidence.",
    image: "https://images.unsplash.com/photo-1592919505780-303950717480?w=1200&q=80",
    count: 4,
    bagSlots: 2,
  },
  {
    slug: "utility-irons",
    name: "Utility Irons",
    blurb: "Driving irons and utility long-irons for tour-style flight.",
    heroCopy: "Compact players-driving irons designed for low spin and tight dispersion.",
    image: "https://images.unsplash.com/photo-1622396481328-9b1b78cdd9fd?w=1200&q=80",
    count: 3,
    bagSlots: 1,
  },
  {
    slug: "irons",
    name: "Iron Sets",
    blurb: "Blades, players-distance, and game improvement.",
    heroCopy: "From compact muscle-backs to forgiving cavity backs with tour-level feel.",
    image: "https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?w=1200&q=80",
    count: 8,
    bagSlots: 6,
  },
  {
    slug: "wedges",
    name: "Wedges",
    blurb: "Spin, stop, and get close from anywhere.",
    heroCopy: "Grind options, bounce profiles, and finishes for every condition and swing type.",
    image: "https://images.unsplash.com/photo-1622396481328-9b1b78cdd9fd?w=1200&q=80",
    count: 5,
    bagSlots: 3,
  },
  {
    slug: "putters",
    name: "Putters",
    blurb: "Mallets, blades, and everything in between.",
    heroCopy: "Engineered insert technology and head shapes matched to your stroke.",
    image: "https://images.unsplash.com/photo-1593111774240-d529f12cf4bb?w=1200&q=80",
    count: 5,
    bagSlots: 1,
  },
];

export function getCategory(slug: string) {
  return CATEGORIES.find((c) => c.slug === slug);
}
