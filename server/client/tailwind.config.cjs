/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors :{
        yellow :{
          "light" : "#F3F7FD"
        }
      }
    },
  },
  plugins: [],
}