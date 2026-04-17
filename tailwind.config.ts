import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          950: "#08090B",
          900: "#0C0E10",
          850: "#111316",
          800: "#15181C",
          700: "#1D2126",
          600: "#262B32",
          500: "#353B44",
        },
        bone: {
          50: "#F6F3EA",
          100: "#EDE9DD",
          200: "#D8D2BE",
          300: "#B6AE94",
          400: "#8B8670",
          500: "#5F5B4C",
        },
        fairway: {
          DEFAULT: "#6D8B5D",
          deep: "#3E5538",
          dark: "#27372A",
          light: "#A6BE92",
        },
        sand: {
          DEFAULT: "#D4B896",
          deep: "#A6895F",
          warm: "#C9A77F",
        },
        flag: {
          DEFAULT: "#B83A2E",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
        serif: ["var(--font-serif)", "ui-serif", "Georgia", "serif"],
      },
      letterSpacing: {
        tightest: "-0.045em",
        tighter: "-0.03em",
      },
      boxShadow: {
        panel:
          "0 1px 0 0 rgba(255,255,255,0.04) inset, 0 24px 48px -24px rgba(0,0,0,0.75), 0 8px 24px -12px rgba(0,0,0,0.5)",
        lift: "0 1px 0 0 rgba(255,255,255,0.08) inset, 0 40px 80px -32px rgba(0,0,0,0.9)",
        card: "0 1px 0 0 rgba(255,255,255,0.04) inset, 0 12px 32px -16px rgba(0,0,0,0.8)",
      },
      backgroundImage: {
        "grid-fine":
          "linear-gradient(to right, rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.035) 1px, transparent 1px)",
        "radial-fade":
          "radial-gradient(ellipse at top, rgba(212,184,150,0.10), transparent 60%)",
        "fairway-glow":
          "radial-gradient(ellipse at center, rgba(109,139,93,0.18), transparent 65%)",
      },
      keyframes: {
        shimmer: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(200%)" },
        },
        drift: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-6px)" },
        },
        pulsedot: {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "1" },
        },
      },
      animation: {
        shimmer: "shimmer 2.4s linear infinite",
        drift: "drift 7s ease-in-out infinite",
        pulsedot: "pulsedot 2.2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
