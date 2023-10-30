/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {},
  },
  corePlugins: {
    aspectRatio: true,
  },
  plugins: [require("tailwind-scrollbar-hide")],
  darkMode: "class",
};
