import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#faf9f7",
        surface: "#f3f0eb",
        elevated: "#ede9e2",
        border: "#e0dbd2",
        "border-light": "#ebe7e0",
        primary: "#1a1714",
        secondary: "#4a4540",
        muted: "#9a958f",
        accent: "#1a6b3c",
        "accent-dim": "#155a32",
        "accent-light": "#e8f5ee",
        "accent-glow": "rgba(26,107,60,0.12)",
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
          "50%": { transform: "translate(-2%,1%)" },
          "90%": { transform: "translate(-1%,2%)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
