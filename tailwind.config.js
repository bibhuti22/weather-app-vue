/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/**.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "weather-primary": "#6F9B3C",
        "weather-secondary": "#264E49",
        "weather-card": "1C5C34",
      },
    },
    fontFamily: {
      Roboto: ["Roboto, sans-serif"],
    },
    container: {
      padding: "2rem",
      center: true,
    },
    screens: {
      sm: "640px",
      md: "768px",
    },
  },
  plugins: [],
};
