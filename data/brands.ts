import type { Brand } from "@/lib/types";

export const BRANDS: Brand[] = [
  {
    slug: "titleist",
    name: "Titleist",
    blurb: "Tour-proven craftsmanship across drivers, irons, wedges, and putters.",
    heritage: "Since 1932 · Fairhaven, MA",
    accent: "#C0111F",
  },
  {
    slug: "taylormade",
    name: "TaylorMade",
    blurb: "Metalwoods innovation and speed-first iron design.",
    heritage: "Since 1979 · Carlsbad, CA",
    accent: "#F2F2F2",
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
    blurb: "Engineering-first clubs with a custom-fit philosophy.",
    heritage: "Since 1959 · Phoenix, AZ",
    accent: "#A6BE92",
  },
  {
    slug: "cobra",
    name: "Cobra",
    blurb: "Speed-forward design with a strong game-improvement lineup.",
    heritage: "Since 1973 · Carlsbad, CA",
    accent: "#F5A300",
  },
  {
    slug: "mizuno",
    name: "Mizuno",
    blurb: "Forged feel and a quiet cult following with real players.",
    heritage: "Since 1906 · Osaka, JP",
    accent: "#1E63A5",
  },
  {
    slug: "srixon",
    name: "Srixon",
    blurb: "Forged irons, tour balls, and a no-nonsense player ethos.",
    heritage: "Since 1930 · Hyogo, JP",
    accent: "#E5232C",
  },
  {
    slug: "cleveland",
    name: "Cleveland",
    blurb: "Wedges and short-game tools trusted at every level.",
    heritage: "Since 1979 · Huntington Beach, CA",
    accent: "#F08A1E",
  },
  {
    slug: "scotty-cameron",
    name: "Scotty Cameron",
    blurb: "Milled putters with tour-studio soul and iconic shapes.",
    heritage: "Since 1994 · Encinitas, CA",
    accent: "#B83A2E",
  },
  {
    slug: "pxg",
    name: "PXG",
    blurb: "Premium engineering, fully customized, no-compromise pricing.",
    heritage: "Since 2014 · Scottsdale, AZ",
    accent: "#9DA0A2",
  },
  {
    slug: "wilson",
    name: "Wilson",
    blurb: "American heritage at honest prices — Staff and value lines.",
    heritage: "Since 1914 · Chicago, IL",
    accent: "#D11212",
  },
  {
    slug: "xxio",
    name: "XXIO",
    blurb: "Lightweight, easy-launching clubs built for moderate swing speeds.",
    heritage: "Since 2000 · Hyogo, JP",
    accent: "#0F2F6B",
  },
];

export function getBrand(slug: string) {
  return BRANDS.find((b) => b.slug === slug);
}
