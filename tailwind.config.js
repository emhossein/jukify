/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      borderRadius: {
        def: "8px",
      },
      colors: {
        main: "#1C1B1B",
        accent: "#333333",
        white: "#E1E1E1",
        "white-light": "#D3D3D3",
        spotify: "#1ED760",
      },
    },
  },
  plugins: [],
};
