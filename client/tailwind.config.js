/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "custom-black": "#111",
        "custom-white": "#FAF0E0",
        "custom-red": "#FF2B55",
        "custom-yellow": "#FBBD0D",
      },
      fontFamily: {
        montserrat: ["Montserrat", "sans-serif"],
      },
      animation: {
        "dot-expansion": "expansion 2s infinite",
      },
      keyframes: {
        expansion: {
          "0%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.2)" },
          "100%": { transform: "scale(1)" },
        },
      },
    },
  },
  plugins: [],
};
