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
        'home': "url('/public/home-bg.png')"
      },
      colors: {
        custom: {
          pokeB: "#070741",
          menuBlue: "#0909F9",
        },
      },
    },
  },
  plugins: [require("tailwindcss"), require("autoprefixer")],
};
