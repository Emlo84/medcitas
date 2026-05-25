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
        // Brand colors extracted from Figma design
        primary: {
          50:  "#e6f0fa",
          100: "#cce1f5",
          200: "#99c3eb",
          300: "#66a5e0",
          400: "#3387d6",
          500: "#0066CC",
          600: "#0052a3",
          700: "#003d7a",
        },
        secondary: {
          500: "#00A896",
          600: "#008577",
        },
        purple: {
          500: "#7B2CBF",
          600: "#621fa0",
        },
        danger: {
          500: "#FF6B6B",
          600: "#e05454",
        },
        neutral: {
          0:   "#FFFFFF",
          50:  "#F9FAFB",
          100: "#F3F4F6",
          200: "#E5E7EB",
          500: "#6B7280",
          700: "#374151",
          900: "#0A0A0A",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "sans-serif"],
      },
      borderRadius: {
        card: "14px",
      },
      boxShadow: {
        card: "0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.05)",
        "card-hover": "0 4px 12px rgba(0,0,0,0.12)",
      },
    },
  },
  plugins: [],
};

export default config;
