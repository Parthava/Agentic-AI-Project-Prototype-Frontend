import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        serif: ["var(--font-instrument)", "Georgia", "serif"],
      },
      boxShadow: {
        soft: "0 4px 24px rgba(0,0,0,0.04)",
        "soft-dark": "0 4px 24px rgba(0,150,255,0.06)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        bounceDot: {
          "0%, 80%, 100%": { transform: "translateY(0)", opacity: "0.5" },
          "40%": { transform: "translateY(-6px)", opacity: "1" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.25s ease-out",
        "bounce-dot": "bounceDot 1.2s infinite",
      },
    },
  },
  plugins: [],
};

export default config;