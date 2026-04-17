import type { Brand } from "@/lib/types";

export const BRANDS: Brand[] = [
  {
    slug: "titleist",
    name: "Titleist",
    blurb: "Tour-proven craftsmanship across clubs, balls, and gear.",
    heritage: "Since 1932 · Fairhaven, MA",
    accent: "#C0111F",
  },
  {
    slug: "taylormade",
    name: "TaylorMade",
    blurb: "Metalwoods innovation and speed-first iron design.",
    heritage: "Since 1979 · Carlsbad, CA",
    accent: "#FFFFFF",
  },
  {
    slug: "callaway",
    name: "Callaway",
    blurb: "AI-shaped faces, tour validation, and broad player fit.",
    heritage: "Since 1982 · Carlsbad, CA",
    accent: "#D4B896",
  },
  {
    slug: "ping",
    name: "PING",
    blurb: "Engineering-first with a custom-fit philosophy.",
    heritage: "Since 1959 · Phoenix, AZ",
    accent: "#6D8B5D",
  },
  {
    slug: "mizuno",
    name: "Mizuno",
    blurb: "Forged feel and a quiet cult following with real players.",
    heritage: "Since 1906 · Osaka, JP",
    accent: "#1E63A5",
  },
  {
    slug: "scotty-cameron",
    name: "Scotty Cameron",
    blurb: "Milled putters with tour-studio soul and iconic shapes.",
    heritage: "Since 1994 · Encinitas, CA",
    accent: "#B83A2E",
  },
  {
    slug: "footjoy",
    name: "FootJoy",
    blurb: "Category-defining golf shoes and glove leathers.",
    heritage: "Since 1857 · Fairhaven, MA",
    accent: "#3E5538",
  },
  {
    slug: "bushnell",
    name: "Bushnell",
    blurb: "Laser rangefinder standard-bearers with tour-used optics.",
    heritage: "Since 1948 · Overland Park, KS",
    accent: "#F08A1E",
  },
];

export function getBrand(slug: string) {
  return BRANDS.find((b) => b.slug === slug);
}
