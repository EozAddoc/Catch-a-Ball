/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./src/**/*.{html,js,jsx}"],
  darkMode:'class',
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
        'landing': "url('/public/dark/night.jpeg')",
        'day':"url('/public/light/day2.webp')",
        'castleN': "url('/public/dark/tot.webp')",
        'waterN': "url('/public/dark/wat.jpg')",
        'shopN': "url('/public/dark/shop.jpg')",
        'arenaN': "url('/public/dark/route.jpg')",
        'arena': "url('/public/light/ArenaD.jpg')",
        'homeN': "url('/public/dark/try.jpg')",
        'home': "url('/public/light/roadD1.jpg')",
        'townYN': "url('/public/dark/townY.jpg')",
        'townY': "url('/public/light/fullCastle.webp')",
        'townNN': "url('/public/dark/jh.jpeg')",
        'townDN': "url('/public/light/castleLandscape.webp')",
        'townN': "url('/public/dark/tt.jpg')",
        'town': "url('/public/light/castle.jpg')",
        'homeTownN': "url('/public/dark/homeTownN.jpg')",
        'homeTown': "url('/public/light/town.jpg')",
        'profileN': "url('/public/dark/cave .jpg')",
        'profile': "url('/public/light/caveD.jpg')",
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
