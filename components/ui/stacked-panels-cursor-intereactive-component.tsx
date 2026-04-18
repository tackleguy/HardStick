"use client";

import { useRef, useCallback } from "react";
import { motion, useSpring } from "motion/react";

const PANEL_COUNT = 22;
const WAVE_SPRING = { stiffness: 160, damping: 22, mass: 0.6 };
const SCENE_SPRING = { stiffness: 80, damping: 22, mass: 1 };
const Z_SPREAD = 42;
const SIGMA = 2.8;

// Verified Unsplash photos that show real golf clubs.
const CLUB_PHOTOS = [
  "photo-1535131749006-b7f58c99034b", // driver
  "photo-1587174486073-ae5e5cff23aa", // irons
  "photo-1622396481328-9b1b78cdd9fd", // wedge
  "photo-1593111774240-d529f12cf4bb", // putter
  "photo-1592919505780-303950717480", // club at address
  "photo-1535132011086-b8818f016104", // bag of clubs
];

const CROPS = [
  "fit=crop&crop=center",
  "fit=crop&crop=entropy",
  "fit=crop&crop=focalpoint&fp-x=0.5&fp-y=0.45",
  "fit=crop&crop=focalpoint&fp-x=0.4&fp-y=0.55",
];

// Each panel is treated as a real catalog product card with a brand and model label.
// We rotate through real brands and category models so the motion reads as
// "browsing a club lineup" rather than abstract art.
const CATALOG_ITEMS: { brand: string; model: string; category: string }[] = [
  { brand: "TaylorMade", model: "Qi10",        category: "Driver" },
  { brand: "Titleist",   model: "TSR3",        category: "Driver" },
  { brand: "Callaway",   model: "Paradym Ai",  category: "Driver" },
  { brand: "PING",       model: "G430 Max 10K",category: "Driver" },
  { brand: "Cobra",      model: "Darkspeed LS",category: "Driver" },
  { brand: "Srixon",     model: "ZX5 Mk II",   category: "Driver" },

  { brand: "TaylorMade", model: "Qi10",        category: "Fairway" },
  { brand: "PING",       model: "G430 Max",    category: "Fairway" },
  { brand: "Callaway",   model: "Paradym MAX", category: "Fairway" },

  { brand: "Titleist",   model: "TSR2",        category: "Hybrid" },
  { brand: "PING",       model: "G430",        category: "Hybrid" },

  { brand: "Mizuno",     model: "Pro 245",     category: "Irons" },
  { brand: "TaylorMade", model: "P·790",       category: "Irons" },
  { brand: "PING",       model: "i230",        category: "Irons" },
  { brand: "Cleveland",  model: "HALO XL",     category: "Irons" },
  { brand: "PXG",        model: "0317 ST",     category: "Irons" },

  { brand: "Titleist",   model: "Vokey SM10",  category: "Wedge" },
  { brand: "Cleveland",  model: "RTX 6 ZipCore", category: "Wedge" },
  { brand: "PING",       model: "Glide 4.0",   category: "Wedge" },

  { brand: "Scotty Cameron", model: "Newport 2", category: "Putter" },
  { brand: "TaylorMade", model: "Spider Tour", category: "Putter" },
  { brand: "Odyssey",    model: "Ai-ONE 7",    category: "Putter" },
];

const PANEL_IMAGES = Array.from({ length: PANEL_COUNT }, (_, i) => {
  const id = CLUB_PHOTOS[i % CLUB_PHOTOS.length];
  const crop = CROPS[Math.floor(i / CLUB_PHOTOS.length) % CROPS.length];
  return `https://images.unsplash.com/${id}?w=600&q=85&auto=format&${crop}`;
});

// Premium golf palette tints (deep green, graphite, sand) — the panels should
// read as moody catalog cards, not rainbow art.
const GRADIENT_OVERLAYS = [
  "linear-gradient(160deg, rgba(39,55,42,0.62) 0%, rgba(8,9,11,0.78) 100%)",
  "linear-gradient(160deg, rgba(62,85,56,0.55) 0%, rgba(12,14,16,0.78) 100%)",
  "linear-gradient(160deg, rgba(166,137,95,0.40) 0%, rgba(12,14,16,0.80) 100%)",
  "linear-gradient(160deg, rgba(109,139,93,0.45) 0%, rgba(21,24,28,0.78) 100%)",
  "linear-gradient(160deg, rgba(53,59,68,0.55) 0%, rgba(12,14,16,0.80) 100%)",
];

function Panel({
  index,
  total,
  waveY,
  scaleY,
}: {
  index: number;
  total: number;
  waveY: ReturnType<typeof useSpring>;
  scaleY: ReturnType<typeof useSpring>;
}) {
  const t = index / (total - 1);
  const baseZ = (index - (total - 1)) * Z_SPREAD;

  const w = 200 + t * 80;
  const h = 280 + t * 120;

  const opacity = 0.30 + t * 0.70;
  const imageUrl = PANEL_IMAGES[index % PANEL_IMAGES.length];
  const gradient = GRADIENT_OVERLAYS[index % GRADIENT_OVERLAYS.length];
  const item = CATALOG_ITEMS[index % CATALOG_ITEMS.length];

  return (
    <motion.div
      className="absolute rounded-xl pointer-events-none overflow-hidden"
      style={{
        width: w,
        height: h,
        marginLeft: -w / 2,
        marginTop: -h / 2,
        translateZ: baseZ,
        y: waveY,
        scaleY,
        transformOrigin: "bottom center",
        opacity,
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url(${imageUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: gradient,
          mixBlendMode: "multiply",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.55) 100%)",
        }}
      />

      {/* Catalog card frame */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "inherit",
          border: `1px solid rgba(214, 205, 185, ${0.10 + t * 0.18})`,
          boxSizing: "border-box",
        }}
      />

      {/* Catalog card content */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "12px 14px",
          color: "#F6F3EA",
        }}
      >
        <div
          style={{
            fontSize: "9.5px",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "rgba(216,210,190,0.82)",
            fontFamily: "var(--font-mono), ui-monospace, monospace",
          }}
        >
          {item.category}
        </div>
        <div>
          <div
            style={{
              fontSize: "10px",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "rgba(216,210,190,0.70)",
              fontFamily: "var(--font-mono), ui-monospace, monospace",
            }}
          >
            {item.brand}
          </div>
          <div
            style={{
              fontSize: "13.5px",
              fontWeight: 500,
              letterSpacing: "-0.01em",
              marginTop: 2,
              lineHeight: 1.15,
            }}
          >
            {item.model}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function StackedPanels() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isHovering = useRef(false);

  const waveYSprings = Array.from({ length: PANEL_COUNT }, () =>
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useSpring(0, WAVE_SPRING),
  );

  const scaleYSprings = Array.from({ length: PANEL_COUNT }, () =>
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useSpring(1, WAVE_SPRING),
  );

  const rotY = useSpring(-42, SCENE_SPRING);
  const rotX = useSpring(18, SCENE_SPRING);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      isHovering.current = true;

      const cx = (e.clientX - rect.left) / rect.width;
      const cy = (e.clientY - rect.top) / rect.height;

      rotY.set(-42 + (cx - 0.5) * 14);
      rotX.set(18 + (cy - 0.5) * -10);

      const cursorCardPos = cx * (PANEL_COUNT - 1);

      waveYSprings.forEach((spring, i) => {
        const dist = Math.abs(i - cursorCardPos);
        const influence = Math.exp(-(dist * dist) / (2 * SIGMA * SIGMA));
        spring.set(-influence * 70);
      });

      scaleYSprings.forEach((spring, i) => {
        const dist = Math.abs(i - cursorCardPos);
        const influence = Math.exp(-(dist * dist) / (2 * SIGMA * SIGMA));
        spring.set(0.35 + influence * 0.65);
      });
    },
    [rotY, rotX, waveYSprings, scaleYSprings],
  );

  const handleMouseLeave = useCallback(() => {
    isHovering.current = false;
    rotY.set(-42);
    rotX.set(18);
    waveYSprings.forEach((s) => s.set(0));
    scaleYSprings.forEach((s) => s.set(1));
  }, [rotY, rotX, waveYSprings, scaleYSprings]);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full h-full flex items-center justify-center select-none"
      style={{ perspective: "900px" }}
    >
      <motion.div
        style={{
          rotateY: rotY,
          rotateX: rotX,
          transformStyle: "preserve-3d",
          position: "relative",
          width: 0,
          height: 0,
        }}
      >
        {Array.from({ length: PANEL_COUNT }).map((_, i) => (
          <Panel
            key={i}
            index={i}
            total={PANEL_COUNT}
            waveY={waveYSprings[i]}
            scaleY={scaleYSprings[i]}
          />
        ))}
      </motion.div>
    </div>
  );
}
