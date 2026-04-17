import type { Offer, Product } from "@/lib/types";

export const PRODUCTS: Product[] = [
  {
    id: "p-tm-qi10-driver",
    slug: "taylormade-qi10-driver",
    name: "Qi10 Driver",
    brand: "TaylorMade",
    brandSlug: "taylormade",
    category: "drivers",
    subtitle: "10K MOI chassis with infinity carbon crown",
    image:
      "https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=1400&q=80",
      "https://images.unsplash.com/photo-1593111774240-d529f12cf4bb?w=1400&q=80",
      "https://images.unsplash.com/photo-1592919505780-303950717480?w=1400&q=80",
    ],
    priceMin: 549,
    priceMax: 629,
    tags: ["most-popular", "premium-pick"],
    skillLevel: ["intermediate", "advanced", "tour"],
    handedness: ["right", "left"],
    specs: [
      { label: "Loft options", value: "9°, 10.5°, 12°" },
      { label: "Stock shaft", value: "Fujikura Ventus TR Blue" },
      { label: "Head volume", value: "460cc" },
      { label: "Adjustability", value: "±2° loft sleeve" },
    ],
    summary:
      "TaylorMade pushed forgiveness deeper than ever with a 10K MOI head that still keeps a tour-shaped face. Easy to launch, stable on misses, and built around a low-spin profile that holds up at speed.",
    highlights: [
      "10K MOI for stability across the face",
      "Infinity carbon crown saves 11g for low-back weight",
      "Loft sleeve and stock premium shaft included",
    ],
    idealFor: "Players chasing forgiveness without giving up workability.",
    rating: 4.7,
    reviewCount: 1284,
  },
  {
    id: "p-tit-tsr3-driver",
    slug: "titleist-tsr3-driver",
    name: "TSR3 Driver",
    brand: "Titleist",
    brandSlug: "titleist",
    category: "drivers",
    subtitle: "Tour-spec speed with SureFit CG track",
    image:
      "https://images.unsplash.com/photo-1593111774240-d529f12cf4bb?w=1200&q=80",
    priceMin: 599,
    priceMax: 599,
    tags: ["editor-pick"],
    skillLevel: ["advanced", "tour"],
    handedness: ["right", "left"],
    specs: [
      { label: "Loft options", value: "8°, 9°, 10°" },
      { label: "CG adjustability", value: "5-position track" },
      { label: "Head volume", value: "460cc" },
      { label: "Stock shaft", value: "HZRDUS Black Gen 4" },
    ],
    summary:
      "A precision instrument for players who deliver the club well. The SureFit CG track lets fitters tune ball flight in a way most adjustable drivers can't match.",
    highlights: [
      "Aerospace-grade titanium face for ball speed",
      "SureFit CG track for shot-shape tuning",
      "Premium tour shafts at no upcharge",
    ],
    idealFor: "Mid-to-low handicaps who want tour-like control.",
    rating: 4.8,
    reviewCount: 612,
  },
  {
    id: "p-cal-pdx-driver",
    slug: "callaway-paradym-x-driver",
    name: "Paradym Ai Smoke MAX",
    brand: "Callaway",
    brandSlug: "callaway",
    category: "drivers",
    subtitle: "AI Smart Face for misses across the entire pattern",
    image:
      "https://images.unsplash.com/photo-1592919505780-303950717480?w=1200&q=80",
    priceMin: 499,
    priceMax: 579,
    tags: ["best-value", "best-seller"],
    skillLevel: ["beginner", "improver", "intermediate"],
    handedness: ["right", "left"],
    specs: [
      { label: "Loft options", value: "9°, 10.5°, 12°" },
      { label: "Face tech", value: "AI Smart Face" },
      { label: "Adjustability", value: "Adjustable hosel" },
      { label: "Stock shaft", value: "Project X Cypher 2.0" },
    ],
    summary:
      "Callaway's AI face was trained on real player data, not just a single contact pattern. The MAX head is the easiest in the family to launch and the most forgiving on heel and toe misses.",
    highlights: [
      "AI Smart Face mapped to real swing data",
      "Easy launch profile for moderate speeds",
      "Heel/toe misses retain ball speed",
    ],
    idealFor: "Improvers who want a forgiving driver they can grow with.",
    rating: 4.6,
    reviewCount: 2104,
  },
  {
    id: "p-png-g430-driver",
    slug: "ping-g430-max-driver",
    name: "G430 Max 10K",
    brand: "PING",
    brandSlug: "ping",
    category: "drivers",
    subtitle: "Highest-MOI driver PING has ever produced",
    image:
      "https://images.unsplash.com/photo-1535132011086-b8818f016104?w=1200&q=80",
    priceMin: 549,
    priceMax: 549,
    tags: ["premium-pick"],
    skillLevel: ["improver", "intermediate", "advanced"],
    handedness: ["right", "left"],
    specs: [
      { label: "Head volume", value: "460cc" },
      { label: "MOI", value: "10,000+ g·cm²" },
      { label: "Loft options", value: "9°, 10.5°, 12°" },
      { label: "Adjustability", value: "Trajectory tuning hosel" },
    ],
    summary:
      "PING's engineering-first approach taken to the limit. If you want straight, predictable distance, this is the gold standard for forgiveness in 2025.",
    highlights: [
      "10K+ MOI for unmatched stability",
      "Carbonfly Wrap composite crown",
      "Tighter dispersion across the face",
    ],
    idealFor: "Anyone who values straight over far.",
    rating: 4.8,
    reviewCount: 977,
  },
  {
    id: "p-tm-stealth2-fw",
    slug: "taylormade-qi10-fairway",
    name: "Qi10 Fairway",
    brand: "TaylorMade",
    brandSlug: "taylormade",
    category: "fairway-woods",
    subtitle: "High-launch carbon-crown fairway",
    image:
      "https://images.unsplash.com/photo-1535132011086-b8818f016104?w=1200&q=80",
    priceMin: 349,
    priceMax: 399,
    tags: ["best-seller"],
    skillLevel: ["improver", "intermediate", "advanced"],
    handedness: ["right", "left"],
    specs: [
      { label: "Lofts", value: "15°, 18°, 21°" },
      { label: "Crown", value: "Infinity carbon" },
      { label: "Adjustability", value: "Loft sleeve" },
    ],
    summary: "A versatile high-launch fairway that gets airborne off the deck and still goes off the tee.",
    highlights: ["Carbon crown for low CG", "Tour-tested face curvature", "Stock premium shaft"],
    idealFor: "Players replacing a tired 3-wood or filling a long-club gap.",
    rating: 4.6,
    reviewCount: 540,
  },
  {
    id: "p-tit-tsr2-hybrid",
    slug: "titleist-tsr2-hybrid",
    name: "TSR2 Hybrid",
    brand: "Titleist",
    brandSlug: "titleist",
    category: "hybrids",
    subtitle: "High-launch utility built for confidence",
    image:
      "https://images.unsplash.com/photo-1592919505780-303950717480?w=1200&q=80",
    priceMin: 299,
    priceMax: 299,
    tags: ["editor-pick"],
    skillLevel: ["beginner", "improver", "intermediate"],
    handedness: ["right", "left"],
    specs: [
      { label: "Lofts", value: "18°, 21°, 24°" },
      { label: "Stock shaft", value: "HZRDUS Red CB" },
      { label: "SureFit hosel", value: "Yes" },
    ],
    summary: "A clean, high-launching hybrid that replaces a 3-iron without feeling like a fairway wood.",
    highlights: ["High MOI head", "Easy launch with full forgiveness", "SureFit adjustability"],
    idealFor: "Anyone struggling with long irons.",
    rating: 4.7,
    reviewCount: 388,
  },
  {
    id: "p-mzn-pro225-iron",
    slug: "mizuno-pro-245-irons",
    name: "Mizuno Pro 245 Irons",
    brand: "Mizuno",
    brandSlug: "mizuno",
    category: "irons",
    subtitle: "Hollow-body players distance with grain-flow forging",
    image:
      "https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?w=1400&q=80",
      "https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=1400&q=80",
    ],
    priceMin: 1399,
    priceMax: 1599,
    tags: ["premium-pick", "editor-pick"],
    skillLevel: ["intermediate", "advanced"],
    handedness: ["right"],
    specs: [
      { label: "Set composition", value: "4-PW (7 clubs)" },
      { label: "Stock shaft", value: "Dynamic Gold Mid 100" },
      { label: "Construction", value: "Forged hollow body, long irons" },
      { label: "Finish", value: "Pearl brush" },
    ],
    summary:
      "Mizuno's player's distance set with the feel signature you only get from grain-flow forged carbon steel. The hollow long irons launch easily without feeling like cavities.",
    highlights: [
      "Grain Flow Forged HD construction",
      "Hollow long irons, blade-like short irons",
      "Pearl brush finish reduces glare",
    ],
    idealFor: "Better players who want feel without giving up speed.",
    rating: 4.8,
    reviewCount: 421,
  },
  {
    id: "p-png-i230-iron",
    slug: "ping-i230-irons",
    name: "PING i230 Irons",
    brand: "PING",
    brandSlug: "ping",
    category: "irons",
    subtitle: "Compact players cavity with tour-trusted control",
    image:
      "https://images.unsplash.com/photo-1622396481328-9b1b78cdd9fd?w=1200&q=80",
    priceMin: 1199,
    priceMax: 1299,
    tags: ["best-seller"],
    skillLevel: ["intermediate", "advanced", "tour"],
    handedness: ["right", "left"],
    specs: [
      { label: "Set composition", value: "4-PW" },
      { label: "Stock shaft", value: "True Temper Dynamic Gold 105" },
      { label: "Construction", value: "Forged 8620 carbon steel" },
    ],
    summary: "A modern compact players cavity that flies the right window with workable trajectories.",
    highlights: ["Tour-trusted shape", "Soft 8620 forging", "Premium stock options"],
    idealFor: "Single-digit handicaps who want feel and control.",
    rating: 4.7,
    reviewCount: 615,
  },
  {
    id: "p-cly-zx5-iron",
    slug: "callaway-apex-pro-irons",
    name: "Apex Pro Irons",
    brand: "Callaway",
    brandSlug: "callaway",
    category: "irons",
    subtitle: "Forged players distance with tour-validated shape",
    image:
      "https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?w=1200&q=80",
    priceMin: 1399,
    priceMax: 1499,
    tags: ["premium-pick"],
    skillLevel: ["intermediate", "advanced"],
    handedness: ["right", "left"],
    specs: [
      { label: "Set composition", value: "4-PW" },
      { label: "Construction", value: "Forged 1025 carbon steel" },
      { label: "Stock shaft", value: "True Temper Elevate MPH" },
    ],
    summary: "Forged feel, AI-designed face, and a compact head shape that any better player will appreciate.",
    highlights: ["Forged 1025 carbon steel", "AI-designed face", "Tungsten weighting in long irons"],
    idealFor: "Players who want forged feel with extra speed.",
    rating: 4.6,
    reviewCount: 488,
  },
  {
    id: "p-tit-vokey-sm10",
    slug: "titleist-vokey-sm10-wedge",
    name: "Vokey SM10 Wedge",
    brand: "Titleist",
    brandSlug: "titleist",
    category: "wedges",
    subtitle: "Six grinds, tour-tested spin",
    image:
      "https://images.unsplash.com/photo-1622396481328-9b1b78cdd9fd?w=1200&q=80",
    priceMin: 189,
    priceMax: 199,
    tags: ["best-seller", "editor-pick"],
    skillLevel: ["intermediate", "advanced", "tour"],
    handedness: ["right", "left"],
    specs: [
      { label: "Lofts", value: "46° – 62°" },
      { label: "Grinds", value: "F, S, M, K, D, L" },
      { label: "Finishes", value: "Tour Chrome, Jet Black, Brushed Steel" },
    ],
    summary: "The wedge tour pros choose more than any other. Six grinds let your fitter match bounce to your turf and swing.",
    highlights: ["Spin-Milled grooves for max friction", "Updated CG for tighter dispersion", "Wide grind selection"],
    idealFor: "Any player serious about scoring from 100 yards in.",
    rating: 4.9,
    reviewCount: 2432,
  },
  {
    id: "p-sc-newport2",
    slug: "scotty-cameron-newport-2-putter",
    name: "Newport 2 Putter",
    brand: "Scotty Cameron",
    brandSlug: "scotty-cameron",
    category: "putters",
    subtitle: "Milled 303 stainless with the iconic Newport profile",
    image:
      "https://images.unsplash.com/photo-1593111774240-d529f12cf4bb?w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1593111774240-d529f12cf4bb?w=1400&q=80",
      "https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=1400&q=80",
    ],
    priceMin: 549,
    priceMax: 599,
    tags: ["premium-pick", "most-popular"],
    skillLevel: ["intermediate", "advanced", "tour"],
    handedness: ["right", "left"],
    specs: [
      { label: "Material", value: "Milled 303 stainless" },
      { label: "Length options", value: "33\", 34\", 35\"" },
      { label: "Toe hang", value: "~35°" },
    ],
    summary: "The most iconic blade in the game, with refined milling and a softer feel than the previous generation.",
    highlights: ["Milled 303 stainless head", "Performance-balanced sole weights", "Updated graphics package"],
    idealFor: "Players with an arcing stroke who want tour pedigree.",
    rating: 4.8,
    reviewCount: 941,
  },
  {
    id: "p-tit-prov1",
    slug: "titleist-pro-v1-balls",
    name: "Pro V1 Golf Balls (Dozen)",
    brand: "Titleist",
    brandSlug: "titleist",
    category: "golf-balls",
    subtitle: "Tour-validated three-piece urethane",
    image:
      "https://images.unsplash.com/photo-1592919505780-303950717480?w=1200&q=80",
    priceMin: 54,
    priceMax: 59,
    tags: ["best-seller"],
    skillLevel: ["intermediate", "advanced", "tour"],
    handedness: ["right", "left"],
    specs: [
      { label: "Construction", value: "Three-piece urethane" },
      { label: "Compression", value: "~90" },
      { label: "Spin", value: "Mid-launch, soft feel" },
    ],
    summary: "The benchmark golf ball for total performance. Tour-validated for distance, soft feel, and short-game spin.",
    highlights: ["Soft urethane cover for greenside spin", "Consistent dispersion off the driver", "Quality control trusted by tour"],
    idealFor: "Anyone playing for score who can value spin and feel.",
    rating: 4.9,
    reviewCount: 5421,
  },
  {
    id: "p-cly-chrome-balls",
    slug: "callaway-chrome-tour-balls",
    name: "Chrome Tour Golf Balls (Dozen)",
    brand: "Callaway",
    brandSlug: "callaway",
    category: "golf-balls",
    subtitle: "Hyper-fast soft urethane with tour-level spin",
    image:
      "https://images.unsplash.com/photo-1530028828-25e8270793c5?w=1200&q=80",
    priceMin: 49,
    priceMax: 54,
    tags: ["best-value"],
    skillLevel: ["improver", "intermediate", "advanced"],
    handedness: ["right", "left"],
    specs: [
      { label: "Construction", value: "Four-piece urethane" },
      { label: "Compression", value: "~88" },
    ],
    summary: "A real alternative to the dominant tour ball, with a softer feel and excellent greenside spin.",
    highlights: ["Soft urethane cover", "Hyper-elastic SoftFast core", "Tour-level short-game performance"],
    idealFor: "Players looking for tour ball performance without paying the top tier price.",
    rating: 4.6,
    reviewCount: 1102,
  },
  {
    id: "p-png-hoofer-bag",
    slug: "ping-hoofer-14-stand-bag",
    name: "Hoofer 14 Stand Bag",
    brand: "PING",
    brandSlug: "ping",
    category: "bags",
    subtitle: "14-way top, four-point strap, weatherproof pockets",
    image:
      "https://images.unsplash.com/photo-1535132011086-b8818f016104?w=1200&q=80",
    priceMin: 269,
    priceMax: 299,
    tags: ["best-seller", "editor-pick"],
    skillLevel: ["beginner", "improver", "intermediate", "advanced", "tour"],
    handedness: ["right", "left"],
    specs: [
      { label: "Weight", value: "5.5 lb" },
      { label: "Top", value: "14-way full-length dividers" },
      { label: "Strap", value: "Adjustable double" },
    ],
    summary: "The category standard for carry bags. Comfortable to walk, organized to play, and built to last seasons.",
    highlights: ["Full-length 14-way top", "Insulated cooler pocket", "Comfort-shaped strap system"],
    idealFor: "Anyone who walks the course.",
    rating: 4.9,
    reviewCount: 2204,
  },
  {
    id: "p-fj-pro-slx",
    slug: "footjoy-pro-slx-shoes",
    name: "Pro|SLX Spikeless",
    brand: "FootJoy",
    brandSlug: "footjoy",
    category: "shoes",
    subtitle: "Stratolite midsole with ChromoSkin upper",
    image:
      "https://images.unsplash.com/photo-1552346154-21d32810aba3?w=1200&q=80",
    priceMin: 199,
    priceMax: 219,
    tags: ["premium-pick"],
    skillLevel: ["beginner", "improver", "intermediate", "advanced", "tour"],
    handedness: ["right", "left"],
    specs: [
      { label: "Sole", value: "PowerPlate spikeless traction" },
      { label: "Upper", value: "ChromoSkin waterproof" },
      { label: "Warranty", value: "2-year waterproof" },
    ],
    summary: "Premium FootJoy build quality in a comfortable spikeless silhouette that walks 36 holes.",
    highlights: ["ChromoSkin waterproof upper", "All-day Stratolite midsole", "Two-year waterproof warranty"],
    idealFor: "Players who want a clubhouse-to-course shoe.",
    rating: 4.7,
    reviewCount: 812,
  },
  {
    id: "p-bsh-prox3",
    slug: "bushnell-pro-x3-rangefinder",
    name: "Pro X3+ Laser Rangefinder",
    brand: "Bushnell",
    brandSlug: "bushnell",
    category: "rangefinders",
    subtitle: "Slope, BITE magnet, and integrated GPS overlays",
    image:
      "https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=1200&q=80",
    priceMin: 599,
    priceMax: 649,
    tags: ["editor-pick", "premium-pick"],
    skillLevel: ["intermediate", "advanced", "tour"],
    handedness: ["right", "left"],
    specs: [
      { label: "Range", value: "5 – 600 yards" },
      { label: "Magnification", value: "7x" },
      { label: "Slope", value: "Switchable + tournament legal mode" },
    ],
    summary: "The flagship laser. Lightning-fast acquisition, locked-on PinSeeker pulse, and integrated GPS context.",
    highlights: ["Locked-on PinSeeker pulse", "BITE magnetic mount", "Integrated GPS overlays"],
    idealFor: "Serious players who want the gold-standard rangefinder.",
    rating: 4.9,
    reviewCount: 1874,
  },
  {
    id: "p-gms-pro-launch",
    slug: "garmin-r10-launch-monitor",
    name: "R10 Portable Launch Monitor",
    brand: "PING",
    brandSlug: "ping",
    category: "simulators",
    subtitle: "Portable doppler launch monitor with home sim",
    image:
      "https://images.unsplash.com/photo-1622396481328-9b1b78cdd9fd?w=1200&q=80",
    priceMin: 599,
    priceMax: 599,
    tags: ["best-value", "best-seller"],
    skillLevel: ["beginner", "improver", "intermediate"],
    handedness: ["right", "left"],
    specs: [
      { label: "Tracking", value: "Doppler radar, ball + club" },
      { label: "Battery", value: "Up to 10 hours" },
      { label: "Sim play", value: "42,000+ courses via app" },
    ],
    summary: "The best entry to launch monitor data and indoor sim play. A range tool you can also play virtual rounds on.",
    highlights: ["Portable doppler radar", "Ball and club metrics", "Indoor sim play included"],
    idealFor: "Improvers serious about practicing with data.",
    rating: 4.5,
    reviewCount: 4030,
  },
  {
    id: "p-tit-perfectfit-glove",
    slug: "titleist-players-glove",
    name: "Players Cabretta Glove",
    brand: "Titleist",
    brandSlug: "titleist",
    category: "gifts",
    subtitle: "Premium AAA cabretta leather",
    image:
      "https://images.unsplash.com/photo-1530028828-25e8270793c5?w=1200&q=80",
    priceMin: 27,
    priceMax: 29,
    tags: ["best-seller"],
    skillLevel: ["beginner", "improver", "intermediate", "advanced", "tour"],
    handedness: ["right", "left"],
    specs: [
      { label: "Leather", value: "AAA cabretta" },
      { label: "Sizes", value: "S – XXL, cadet" },
    ],
    summary: "The most popular tour-grade glove for a reason. A soft, premium feel and a precise fit.",
    highlights: ["Premium AAA cabretta leather", "Tour-grade fit", "Long-lasting durability"],
    idealFor: "Anyone who values feel.",
    rating: 4.8,
    reviewCount: 6540,
  },
  {
    id: "p-cly-apparel-quarter",
    slug: "callaway-quarter-zip",
    name: "Tech Quarter Zip",
    brand: "Callaway",
    brandSlug: "callaway",
    category: "apparel",
    subtitle: "Brushed-back midweight layer for shoulder season",
    image:
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=1200&q=80",
    priceMin: 79,
    priceMax: 95,
    tags: ["best-value", "new"],
    skillLevel: ["beginner", "improver", "intermediate", "advanced", "tour"],
    handedness: ["right", "left"],
    specs: [
      { label: "Fabric", value: "Brushed back tech knit" },
      { label: "Fit", value: "Standard" },
      { label: "Sizes", value: "S – 2XL" },
    ],
    summary: "A clean, soft, midweight layer for cooler rounds and the post-round patio.",
    highlights: ["Brushed-back warmth without bulk", "Stretch and recovery", "Wears well off course"],
    idealFor: "Cooler rounds and clubhouse hangs.",
    rating: 4.6,
    reviewCount: 318,
  },
];

export const OFFERS: Offer[] = (() => {
  const offers: Offer[] = [];
  const merchantIds = [
    "pga-superstore",
    "golf-galaxy",
    "worldwide-golf",
    "global-golf",
    "fairway-jockey",
    "2nd-swing",
  ];
  for (const product of PRODUCTS) {
    const center = (product.priceMin + product.priceMax) / 2;
    const used = new Set<string>();
    const merchantCount = 3 + (product.id.length % 3);
    for (let i = 0; i < merchantCount; i++) {
      let merchantId = merchantIds[(i + product.id.length) % merchantIds.length];
      while (used.has(merchantId)) {
        merchantId = merchantIds[(merchantIds.indexOf(merchantId) + 1) % merchantIds.length];
      }
      used.add(merchantId);
      const variance = ((i * 7) % 13) - 6;
      const price = Math.max(product.priceMin - 20, Math.round(center + variance));
      const onSale = i === 0 && product.tags.includes("on-sale");
      offers.push({
        id: `${product.id}-${merchantId}`,
        productId: product.id,
        merchantId,
        price,
        salePrice: onSale ? Math.round(price * 0.92) : undefined,
        url: `https://example.com/out/${merchantId}/${product.slug}`,
        inStock: !(i === 2 && product.id.endsWith("e")),
        shippingNote: i === 0 ? "Ships free, in stock" : undefined,
        promoCode: i === 1 && merchantId === "fairway-jockey" ? "HARDSTICK10" : undefined,
      });
    }
  }
  return offers;
})();

export function getProduct(slug: string) {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function getProductsByCategory(slug: string) {
  return PRODUCTS.filter((p) => p.category === slug);
}

export function getProductsByBrand(brandSlug: string) {
  return PRODUCTS.filter((p) => p.brandSlug === brandSlug);
}

export function getOffersForProduct(productId: string) {
  return OFFERS.filter((o) => o.productId === productId);
}

export function getMerchantCountForProduct(productId: string) {
  return getOffersForProduct(productId).length;
}

export function getBestOfferForProduct(productId: string) {
  const offers = getOffersForProduct(productId);
  if (!offers.length) return undefined;
  return offers.reduce((best, o) =>
    (o.salePrice ?? o.price) < (best.salePrice ?? best.price) ? o : best,
  );
}

export function getDealsProducts() {
  return PRODUCTS.filter((p) =>
    p.tags.includes("on-sale") ||
    p.tags.includes("best-value") ||
    OFFERS.some((o) => o.productId === p.id && o.salePrice),
  );
}
