import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        lato: ["Lato", "sans-serif"],
      },
      colors: {
        'brand-red': '#BF2323',
        'brand-gray': {
          DEFAULT: '#888888', // text-gray-500 is #6B7280, text-gray-600 is #4B5563
          light: '#AAAAAA',   // header p color
          dark: '#777777',    // h1-h6 color, strong/b color
          border: '#E4E4E4',  // border color for links, inputs
          extralight: '#F4F4F4', // hr border, ul.alt li border
        }
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
