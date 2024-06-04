import { nextui } from "@nextui-org/react"

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      blue: "#37BBE7",
      darkBlue: "#3C7B90",
      red: "#FC4A47",
      white: "#F0F0F0",
      green: "#58E69F",
      black: "#000000",
    },
    extend: {},
  },
  darkMode: "class",
  plugins: [
    nextui({
      // addCommonColors: true,
    }),
  ],
}
