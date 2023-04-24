/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      borderRadius: {
        large: "30px",
      },
      colors: {
        main: "#1ED760",
        white: "#E1E1E1",
        spotify: "#42C83C",
      },
    },
  },
  plugins: [],
};
