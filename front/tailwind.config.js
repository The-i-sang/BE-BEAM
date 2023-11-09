/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      spacing: {
        "0calc": "calc(100% - 32px)",
        "1calc": "calc(100% - 164px)",
        "2calc": "calc(100% - 140px)",
      },
    },
  },
  corePlugins: {
    aspectRatio: true,
  },
  plugins: [require("tailwind-scrollbar-hide")],
  darkMode: "class",
};
