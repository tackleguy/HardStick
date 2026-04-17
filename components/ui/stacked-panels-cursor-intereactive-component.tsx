"use client";

import { useRef, useCallback } from "react";
import { motion, useSpring } from "motion/react";

const PANEL_COUNT = 22;
const WAVE_SPRING = { stiffness: 160, damping: 22, mass: 0.6 };
const SCENE_SPRING = { stiffness: 80, damping: 22, mass: 1 };
const Z_SPREAD = 42;
const SIGMA = 2.8;

// All panels are golf club imagery (drivers, irons, wedges, putters).
// We repeat the six verified Unsplash club photos with varied crops
// so every panel reads as a club, not shoes/apparel/accessories.
const CLUB_PHOTOS = [
  "photo-1535131749006-b7f58c99034b", // driver head
  "photo-1587174486073-ae5e5cff23aa", // iron set
  "photo-1622396481328-9b1b78cdd9fd", // wedge
  "photo-1593111774240-d529f12cf4bb", // putter / club
  "photo-1592919505780-303950717480", // club at address
  "photo-1535132011086-b8818f016104", // bag full of clubs
];

const CROPS = [
  "fit=crop&crop=center",
  "fit=crop&crop=entropy",
  "fit=crop&crop=focalpoint&fp-x=0.5&fp-y=0.45",
  "fit=crop&crop=focalpoint&fp-x=0.4&fp-y=0.55",
];

const PANEL_IMAGES = Array.from({ length: 22 }, (_, i) => {
  const id = CLUB_PHOTOS[i % CLUB_PHOTOS.length];
  const crop = CROPS[Math.floor(i / CLUB_PHOTOS.length) % CROPS.length];
  return `https://images.unsplash.com/${id}?w=600&q=80&auto=format&${crop}`;
});

// Premium golf palette tints (deep green, graphite, sand) — replaces the rainbow gradients.
const GRADIENT_OVERLAYS = [
  "linear-gradient(135deg, rgba(39,55,42,0.65) 0%, rgba(12,14,16,0.60) 100%)",
  "linear-gradient(135deg, rgba(62,85,56,0.55) 0%, rgba(8,9,11,0.65) 100%)",
  "linear-gradient(135deg, rgba(166,137,95,0.40) 0%, rgba(12,14,16,0.65) 100%)",
  "linear-gradient(135deg, rgba(109,139,93,0.45) 0%, rgba(21,24,28,0.60) 100%)",
  "linear-gradient(135deg, rgba(212,184,150,0.30) 0%, rgba(12,14,16,0.70) 100%)",
  "linear-gradient(135deg, rgba(39,55,42,0.55) 0%, rgba(21,24,28,0.65) 100%)",
  "linear-gradient(135deg, rgba(53,59,68,0.55) 0%, rgba(12,14,16,0.65) 100%)",
  "linear-gradient(135deg, rgba(62,85,56,0.50) 0%, rgba(166,137,95,0.30) 100%)",
  "linear-gradient(135deg, rgba(184,58,46,0.30) 0%, rgba(12,14,16,0.70) 100%)",
  "linear-gradient(135deg, rgba(109,139,93,0.40) 0%, rgba(8,9,11,0.65) 100%)",
  "linear-gradient(135deg, rgba(212,184,150,0.25) 0%, rgba(39,55,42,0.55) 100%)",
  "linear-gradient(135deg, rgba(39,55,42,0.65) 0%, rgba(53,59,68,0.55) 100%)",
  "linear-gradient(135deg, rgba(62,85,56,0.45) 0%, rgba(8,9,11,0.65) 100%)",
  "linear-gradient(135deg, rgba(166,137,95,0.40) 0%, rgba(21,24,28,0.65) 100%)",
  "linear-gradient(135deg, rgba(109,139,93,0.50) 0%, rgba(12,14,16,0.65) 100%)",
  "linear-gradient(135deg, rgba(53,59,68,0.50) 0%, rgba(62,85,56,0.45) 100%)",
  "linear-gradient(135deg, rgba(212,184,150,0.30) 0%, rgba(39,55,42,0.55) 100%)",
  "linear-gradient(135deg, rgba(184,58,46,0.25) 0%, rgba(12,14,16,0.70) 100%)",
  "linear-gradient(135deg, rgba(62,85,56,0.55) 0%, rgba(8,9,11,0.65) 100%)",
  "linear-gradient(135deg, rgba(39,55,42,0.55) 0%, rgba(166,137,95,0.30) 100%)",
  "linear-gradient(135deg, rgba(109,139,93,0.45) 0%, rgba(184,58,46,0.20) 100%)",
  "linear-gradient(135deg, rgba(53,59,68,0.55) 0%, rgba(212,184,150,0.25) 100%)",
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

  const opacity = 0.25 + t * 0.75;
  const imageUrl = PANEL_IMAGES[index % PANEL_IMAGES.length];
  const gradient = GRADIENT_OVERLAYS[index % GRADIENT_OVERLAYS.length];

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
            "linear-gradient(to bottom, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.45) 100%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "inherit",
          border: `1px solid rgba(214, 205, 185, ${0.06 + t * 0.18})`,
          boxSizing: "border-box",
        }}
      />
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
