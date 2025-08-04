/** @type {import('tailwindcss').Config} */
const animate = require('tailwindcss-animate')

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    animate
  ],
}
