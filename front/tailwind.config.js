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

    colors: {
      transparent: "transparent",
      white: "#ffffff",
      black: "#000000",
      mainColor: "#f5aa15",
      subColor: "#ff9100",
      meeting: "#ffc655",
      toolkit: "#79B1FF",
      text: {
        light: {
          default: "#000000",
          10: "#ffffff",
          20: "adadad",
          30: "",
          40: "",
          50: "",
          60: "#6f6f6f",
          70: "#575757",
          80: "#383535",
          90: "#232426",
        },
        dark: {
          default: "#ffffff",
          10: "#ffffffb3",
          20: "#a5a5a5",
          30: "",
          40: "",
          50: "",
          60: "",
          70: "#6f6f6f",
          80: "#ededed",
          90: "#000000",
        },
      },
      bg: {
        light: {
          default: "#ffffff",
          10: "",
          20: "",
          30: "",
          40: "",
          50: "",
          60: "",
          70: "",
          80: "#282828",
          90: "#000000",
        },
        dark: {
          default: "#000000",
          10: "#ffffff",
          20: "",
          30: "",
          40: "",
          50: "",
          60: "",
          70: "",
          80: "#383a4a",
          90: "#232426",
        },
      },
    },

    screens: {
      "3sm": "320px",
      "2sm": "450px",
      sm: "625px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
      "3xl": "1921px",
    },
  },

  corePlugins: {
    aspectRatio: true,
    lineClamp: true,
  },

  plugins: [require("tailwind-scrollbar-hide")],
  darkMode: "class",
};
