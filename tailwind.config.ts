import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primary: {
          1: "#1D8FE4",
          2: "#D4EEFF",
        },

        neutral: {
          1: "#343458",
          2: "#464962",
          3: "#5A5C6F",
          4: "#6D6F81",
          5: "#ADAEBA",
          6: "#E1E3E9",
          7: "#F3F4F8",
        },

        background: {
          1: "#F5F5F9",
          2: "#F5F9FD",
        },
        success: "#439F6E",
        warning: "#EBBC2E",
        info: "#2F80ED",
        error: "#ED3A3A",
        white: "#FFFFFF",
        red: "#ff0000",
        black: "#1B1B33",
        border: "#E1E3E9",
      },
      boxShadow: {
        sidebar: "0 4px 8px 0 rgba(0, 0, 0, 0.25)",
        forumBox:
          "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px",
      },

      height: {
        custom: "calc(100vh - 64px)",
      },
    },
  },
  plugins: [],
};
export default config;
