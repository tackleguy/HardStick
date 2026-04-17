import type { Merchant } from "@/lib/types";

export const MERCHANTS: Merchant[] = [
  {
    id: "pga-superstore",
    name: "PGA Tour Superstore",
    logoText: "PGA·TSS",
    affiliateBaseUrl: "https://example.pga-tour-superstore.com/ref/hardstick",
    commissionRate: 0.08,
    cookieWindowDays: 14,
    trustLabel: "Verified Retailer",
    shippingNote: "Free shipping over $99",
  },
  {
    id: "golf-galaxy",
    name: "Golf Galaxy",
    logoText: "GLXY",
    affiliateBaseUrl: "https://example.golfgalaxy.com/ref/hardstick",
    commissionRate: 0.07,
    cookieWindowDays: 7,
    trustLabel: "Verified Retailer",
    shippingNote: "Free standard shipping over $75",
  },
  {
    id: "worldwide-golf",
    name: "Worldwide Golf Shops",
    logoText: "WWG",
    affiliateBaseUrl: "https://example.worldwidegolfshops.com/ref/hardstick",
    commissionRate: 0.1,
    cookieWindowDays: 30,
    trustLabel: "Authorized Dealer",
    shippingNote: "Free 3-day over $150",
  },
  {
    id: "global-golf",
    name: "Global Golf",
    logoText: "GG",
    affiliateBaseUrl: "https://example.globalgolf.com/ref/hardstick",
    commissionRate: 0.09,
    cookieWindowDays: 30,
    trustLabel: "Trade-in Partner",
    shippingNote: "Free returns on certified pre-owned",
  },
  {
    id: "fairway-jockey",
    name: "Fairway Jockey",
    logoText: "FWJ",
    affiliateBaseUrl: "https://example.fairwayjockey.com/ref/hardstick",
    commissionRate: 0.1,
    cookieWindowDays: 30,
    trustLabel: "Custom Fit Specialist",
    shippingNote: "Custom build, ships in 7–10 days",
  },
  {
    id: "2nd-swing",
    name: "2nd Swing Golf",
    logoText: "2SW",
    affiliateBaseUrl: "https://example.2ndswing.com/ref/hardstick",
    commissionRate: 0.06,
    cookieWindowDays: 14,
    trustLabel: "Pre-owned Verified",
    shippingNote: "Free shipping on orders $75+",
  },
];

export function getMerchant(id: string) {
  return MERCHANTS.find((m) => m.id === id);
}
