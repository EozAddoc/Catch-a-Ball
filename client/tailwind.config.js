/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        custom: {
          blue: '#070741',
        },
      },
    },
  },
  plugins: [
    require('tailwindcss'),
    require('autoprefixer')
  ]
}

