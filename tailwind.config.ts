import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        surface: "#ffffff",
        background: "#f6f3ef",
        primary: {
          DEFAULT: "#0e7490",
          dark: "#0a5d73"
        }
      },
      fontFamily: {
        vazir: ["var(--font-vazir)", "sans-serif"]
      },
      boxShadow: {
        card: "0 12px 30px rgba(15, 23, 42, 0.08)"
      }
    }
  },
  plugins: []
};

export default config;
