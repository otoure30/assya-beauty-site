import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        linen: "#f7f1e7",
        oat: "#e6d9c5",
        sage: "#9cac86",
        leaf: "#38513c",
        bark: "#6d583f",
        gold: "#b29458",
        ink: "#25251f"
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "Inter", "system-ui", "sans-serif"],
        serif: ["var(--font-cormorant)", "Georgia", "serif"]
      },
      boxShadow: {
        soft: "0 18px 60px rgba(47, 58, 43, 0.12)"
      }
    }
  },
  plugins: []
};

export default config;
