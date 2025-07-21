/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./App.tsx", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        red: {
          50: "#fee6e6",
          100: "#fcb0b0",
          200: "#fb8a8a",
          300: "#f95454",
          400: "#f83333",
          500: "#f60000",
          600: "#e00000",
          700: "#af0000",
          800: "#870000",
          900: "#670000",
        },
        cyan: {
          50: "#f4ffff",
          100: "#ddffff",
          200: "#ccffff",
          300: "#b5ffff",
          400: "#a7ffff",
          500: "#91ffff",
          600: "#84e8e8",
          700: "#67b5b5",
          800: "#508c8c",
          900: "#3d6b6b",
        },
        violet: {
          50: "#f4ebfd",
          100: "#dec0f8",
          200: "#cda1f5",
          300: "#b776f1",
          400: "#a95cee",
          500: "#9333ea",
          600: "#862ed5",
          700: "#6824a6",
          800: "#511c81",
          900: "#3e1562",
        },
      },
    },
  },
  plugins: [],
};
