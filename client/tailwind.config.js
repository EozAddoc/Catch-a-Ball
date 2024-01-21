/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        'pixel': ['"Pixelify Sans"', 'cursive']
      },
      keyframes: {
        menuOpened: {
          "0%": { transform: "rotate(0)" },
          "100%": { transform: "rotate(3deg)" }
        },
        menuClosed: {
          "0%": { height: "100px" },
          "100%": { height: "50px" }
        }
      },
      animation: {
        menu: "menu 0.5s ease-in-out"
      },
      backgroundImage: {
        'night': "url('/public/dark/night.jpeg')",
        'castleN': "url('/public/dark/tot.webp')",
        'waterN': "url('/public/dark/wat.jpg')",
        'shopN': "url('/public/dark/shop.jpg')",
        'routeN': "url('/public/dark/route.jpg')",
        'homeN': "url('/public/dark/try.jpg')",
        'townYN': "url('/public/dark/townY.jpg')",
        'townNN': "url('/public/dark/jh.jpeg')",
        'townN': "url('/public/dark/tt.jpg')",
        'profileN': "url('/public/dark/r2.jpg')",
        'deckN': "url('/public/dark/deckR.jpg')",
        'search': "url('/public/dark/search2.png')"
      },
      filter: {
        'blue': 'brightness(80%) saturate(200%) hue-rotate(200deg)',
        'b': 'brightness(80%) saturate(200%) hue-rotate(200deg) rgba(9, 9, 249, 0.5)',
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
});
