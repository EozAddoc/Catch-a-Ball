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
        'night': "url('/public/night.jpeg')",
        'castleN': "url('/public/tot.webp')",
        'waterN': "url('/public/wat.jpg')",
        'shopN': "url('/public/shop.jpg')",
        'routeN': "url('/public/route.jpg')",
        'homeN': "url('/public/try.jpg')",
        'townYN': "url('/public/townY.jpg')",
        'townNN': "url('/public/townNn.jpg')",
        'townN': "url('/public/tttt.png')",
        'profileN':"url('/public/r2.jpg')",
        'deckN':"url('/public/deckR.jpg')",
        'search': "url('/public/search2.png')"
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
};
