import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        bg: "#080808",
        surface: "#111111",
        elevated: "#1a1a1a",
        border: "#222222",
        "border-light": "#2a2a2a",
        primary: "#f0ece4",
        secondary: "#8a8580",
        muted: "#4a4540",
        accent: "#c8ff00",
        "accent-dim": "#9bbf00",
        "accent-glow": "rgba(200,255,0,0.15)",
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      fontSize: {
        "hero": ["clamp(4rem, 12vw, 14rem)", { lineHeight: "0.88", letterSpacing: "-0.04em" }],
        "hero-md": ["clamp(3rem, 8vw, 8rem)", { lineHeight: "0.9", letterSpacing: "-0.035em" }],
        "hero-sm": ["clamp(2.5rem, 6vw, 5rem)", { lineHeight: "0.92", letterSpacing: "-0.03em" }],
        "display": ["clamp(2rem, 4vw, 3.5rem)", { lineHeight: "1.05", letterSpacing: "-0.025em" }],
        "label": ["0.65rem", { lineHeight: "1", letterSpacing: "0.15em" }],
      },
      animation: {
        "fade-up": "fadeUp 0.8s ease forwards",
        "fade-in": "fadeIn 0.6s ease forwards",
        "marquee": "marquee 25s linear infinite",
        "grain": "grain 0.5s steps(1) infinite",
        "glow-pulse": "glowPulse 3s ease-in-out infinite",
      },
      keyframes: {
        fadeUp: {
          from: { opacity: "0", transform: "translateY(30px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        grain: {
          "0%, 100%": { transform: "translate(0,0)" },
          "10%": { transform: "translate(-2%,-3%)" },
          "20%": { transform: "translate(2%,3%)" },
          "30%": { transform: "translate(-1%,2%)" },
          "40%": { transform: "translate(3%,-1%)" },
          "50%": { transform: "translate(-2%,1%)" },
          "60%": { transform: "translate(2%,-2%)" },
          "70%": { transform: "translate(-3%,3%)" },
          "80%": { transform: "translate(1%,-3%)" },
          "90%": { transform: "translate(-1%,2%)" },
        },
        glowPulse: {
          "0%,100%": { boxShadow: "0 0 20px rgba(200,255,0,0.2)" },
          "50%": { boxShadow: "0 0 60px rgba(200,255,0,0.5)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
