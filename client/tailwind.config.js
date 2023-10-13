/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        'pixel': ['"Pixelify Sans"', 'cursive']
      },
      keyframes: {
        menuOpened: {
          "0%": { transform:"rotate(0)" },
          "100%": { transform:"rotate(3deg)" }
        },
        menuClosed: {
          "0%": { height:"100px" },
          "100%": { height:"50px" }
        }
      },
      animation: {
        menu: "menu 0.5s ease-in-out"
      },
      backgroundImage: {
        'home': "url('/public/try.jpg')",
        'arena': "url('/public/arena.jpg')"
      },
      colors: {
        custom: {
          pokeB: "#070741",
          menuBlue: "#0909F9",
               },
      },
      conicGradientStops: {
        stops: 'yellow-600 0%, yellow-400 25%, yellow-300 50%, yellow-200 75%, yellow-300 100%',
      },
    },
  },
  plugins: [require("tailwindcss"), require("autoprefixer")],
};
