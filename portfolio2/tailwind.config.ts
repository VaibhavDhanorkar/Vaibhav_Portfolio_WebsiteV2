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
        ivory:        "#faf6ef",
        "ivory-dark": "#f2ece0",
        "ivory-deep": "#e8dfcc",
        parchment:    "#ede3d0",
        gold:         "#b8922a",
        "gold-light": "#d4a843",
        "gold-pale":  "#f0e2bc",
        "gold-glow":  "rgba(184,146,42,0.15)",
        ink:          "#1c1608",
        "ink-mid":    "#3d3420",
        "ink-soft":   "#6b5e3e",
        "ink-muted":  "#9c8d6e",
        "ink-faint":  "#c4b89a",
        border:       "#ddd0b3",
        "border-soft":"#e8dfc8",
      },
      fontFamily: {
        display: ["Cormorant Garamond", "Georgia", "serif"],
        sans:    ["Outfit", "system-ui", "sans-serif"],
        mono:    ["JetBrains Mono", "monospace"],
      },
      fontSize: {
        "hero":    ["clamp(3.375rem,9.75vw,10.5rem)", { lineHeight:"0.86", letterSpacing:"-0.035em" }],
        "display": ["clamp(2.2rem,4.5vw,4rem)",       { lineHeight:"1.05", letterSpacing:"-0.02em"  }],
        "label":   ["0.875rem",                       { lineHeight:"1.25", letterSpacing:"0.12em"  }],
        "nav":     ["0.875rem",                 { lineHeight:"1.25", letterSpacing:"0.12em"  }],
      },
    },
  },
  plugins: [],
};

export default config;
