/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      fontFamily: {
        "primary": ['Lexend Deca', "sans-serif"],
      }
    },
  },
  plugins: [
    require("tailwind-scrollbar-hide"),
    require('@tailwindcss/line-clamp'),
  ],
  darkMode: "class",
};
