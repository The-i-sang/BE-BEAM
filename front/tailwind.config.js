/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],

  theme: {
    extend: {
      spacing: {
        "0calc": "calc(100% - 32px)",
        "1calc": "calc(100% - 164px)",
        "2calc": "calc(100% - 140px)",
        "w-1calc": "calc(100% - 500px)",
        "w-2calc": "calc(100% - 380px)",
        "recomended-w-1calc": "calc(100% - 60px)",
        "recomended-w-2calc": "calc(100% - 40px)",
      },

      animation: {
        "slide-in": "slide-in 2s forwards",
        "slide-out": "slide-out 2s forwards",
        scale: "scale-up-down 2s infinite",
        fadeIn: "fadeIn 1s ease-out",
      },

      keyframes: {
        "slide-in": {
          "0%": { transform: "translateX(-20%)", opacity: 0 },
          "100%": { transform: "translateX(0)", opacity: 1 },
        },
        "slide-out": {
          "0%": { transform: "translateX(0)", opacity: 1 },
          "100%": { transform: "translateX(20%)", opacity: 0 },
        },
        fadeIn: {
          "0%": { transform: "translateX(100%)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
      },
    },
  },

  corePlugins: {
    aspectRatio: true,
    lineClamp: true,
  },

  plugins: [require("tailwind-scrollbar-hide")],
  darkMode: "class",
};
