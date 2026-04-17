import type { Category } from "@/lib/types";

export const CATEGORIES: Category[] = [
  {
    slug: "drivers",
    name: "Drivers",
    blurb: "Distance, forgiveness, and shape you can shape.",
    heroCopy:
      "From tour-spec low spin to game-improvement draw-bias chassis. Compare current drivers across leading retailers.",
    image:
      "https://images.unsplash.com/photo-1593111774240-d529f12cf4bb?w=1200&q=80",
    count: 38,
  },
  {
    slug: "fairway-woods",
    name: "Fairway Woods",
    blurb: "Off the deck, off the tee, off the hook.",
    heroCopy: "High-launch 3-woods, versatile 5-woods, and strong-loft gap fillers.",
    image:
      "https://images.unsplash.com/photo-1535132011086-b8818f016104?w=1200&q=80",
    count: 22,
  },
  {
    slug: "hybrids",
    name: "Hybrids",
    blurb: "Long iron replacements that actually go in the air.",
    heroCopy: "Bridge the gap between your longest iron and your fairway with confidence.",
    image:
      "https://images.unsplash.com/photo-1592919505780-303950717480?w=1200&q=80",
    count: 18,
  },
  {
    slug: "irons",
    name: "Irons",
    blurb: "Blades, players distance, and game improvement.",
    heroCopy: "From compact muscle-backs to forgiving cavity backs with tour-level feel.",
    image:
      "https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?w=1200&q=80",
    count: 44,
  },
  {
    slug: "wedges",
    name: "Wedges",
    blurb: "Spin, stop, and get close from anywhere.",
    heroCopy: "Grind options, bounce profiles, and finishes for every condition and swing type.",
    image:
      "https://images.unsplash.com/photo-1622396481328-9b1b78cdd9fd?w=1200&q=80",
    count: 26,
  },
  {
    slug: "putters",
    name: "Putters",
    blurb: "Mallets, blades, and everything in between.",
    heroCopy: "Engineered insert technology and head shapes matched to your stroke.",
    image:
      "https://images.unsplash.com/photo-1593111774240-d529f12cf4bb?w=1200&q=80",
    count: 31,
  },
  {
    slug: "golf-balls",
    name: "Golf Balls",
    blurb: "Tour urethane, surlyn value, and everything in between.",
    heroCopy: "The right construction for your swing speed, budget, and feel preference.",
    image:
      "https://images.unsplash.com/photo-1592919505780-303950717480?w=1200&q=80",
    count: 29,
  },
  {
    slug: "bags",
    name: "Bags",
    blurb: "Cart, carry, and staff bags built to last.",
    heroCopy: "Premium materials, thoughtful organization, and weather-sealed pockets.",
    image:
      "https://images.unsplash.com/photo-1535132011086-b8818f016104?w=1200&q=80",
    count: 24,
  },
  {
    slug: "shoes",
    name: "Shoes",
    blurb: "Spiked, spikeless, waterproof, and walkable.",
    heroCopy: "Traction systems and uppers designed for 36 holes and every fairway condition.",
    image:
      "https://images.unsplash.com/photo-1552346154-21d32810aba3?w=1200&q=80",
    count: 33,
  },
  {
    slug: "apparel",
    name: "Apparel",
    blurb: "Polos, layers, outerwear, headwear.",
    heroCopy: "Performance fabrics that look great in the clubhouse and travel anywhere.",
    image:
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=1200&q=80",
    count: 47,
  },
  {
    slug: "rangefinders",
    name: "Rangefinders & GPS",
    blurb: "Know your number before you stand over the ball.",
    heroCopy: "Laser rangefinders, GPS watches, and hybrid units with slope and pin lock.",
    image:
      "https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=1200&q=80",
    count: 19,
  },
  {
    slug: "simulators",
    name: "Simulators & Training",
    blurb: "Launch monitors, mats, and practice nets.",
    heroCopy: "Data-grade launch monitors and simulator setups for garage and studio.",
    image:
      "https://images.unsplash.com/photo-1622396481328-9b1b78cdd9fd?w=1200&q=80",
    count: 14,
  },
  {
    slug: "gifts",
    name: "Gifts & Accessories",
    blurb: "Head covers, gloves, tees, and extras.",
    heroCopy: "Thoughtful picks for birthdays, holidays, and buddies-trip essentials.",
    image:
      "https://images.unsplash.com/photo-1530028828-25e8270793c5?w=1200&q=80",
    count: 56,
  },
];

export function getCategory(slug: string) {
  return CATEGORIES.find((c) => c.slug === slug);
}
