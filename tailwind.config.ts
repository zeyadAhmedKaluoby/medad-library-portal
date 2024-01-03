
/** @type {import("tailwindcss").Config} */

const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    "./index.html"
  ],
  theme: {
    extend: {
      colors: {
        "primary-color": "var(--primary-color)",
        "primary-color-light": "var(--primary-color-light)",
        "primary-color-dark": "var(--primary-color-dark)",
        "secondary-color": "var(--secondary-color)",
        "secondary-color-light": "var(--secondary-color-light)",
        "secondary-color-dark": "var(--secondary-color-dark)",
      },
      transitionProperty: {
        spacing: "margin, padding",
        height: "height",
        width: "width",
      },
      fontFamily: {
        sans: ["Dubai", ...defaultTheme.fontFamily.sans],
      },
      screens: {
        xs: "375px",
        "3xl": "1740px",
        "4xl": "1920px",
      },
      animation: {
        "spin-reverse": "spin-reverse 1.5s linear infinite",
      },
      keyframes: {
        "spin-reverse": {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(-360deg)" },
        },
      },
    },
  },
  plugins: [require("tailwindcss-rtl")],
};

