/** @type {import('tailwindcss').Config} */
module.exports = {
  // purge:[],
  darkMode: "media",
  content: ["./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",],
  theme: {
    extend: {
      fontFamily: {
        nunito: ["'Nunito Sans'", "sans-serif"], // Add Nunito Sans globally
      },
    },
  },
  plugins: [],
}
