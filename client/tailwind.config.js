/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      colors: {
        custom: {
          pokeB: "#070741",
        },
      },
    },
  },
  plugins: [require("tailwindcss"), require("autoprefixer")],
};
