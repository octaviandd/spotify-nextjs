/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      gridTemplateRows: {
        layout: "auto 1fr auto",
        mockup: "150px 1fr",
        hero: "auto 1fr 1fr 1fr 1fr",
        hero2: "300px 300px 300px",
        search: "auto",
        item: "auto",
      },
      gridTemplateColumns: {
        hero: "minmax(700px, 25%) 1fr",
        hero2: "minmax(700px, 25%) 1fr",
        mockup: "1fr",
        search: "minmax(500px, 25%) 1fr",
        item: "repeat(auto-fill, minmax(170px, 1fr))",
         profile: "auto 1fr"
      },
      keyframes: {
        loud: {
          "25%": {
            transform: "scaleY(1)",
          },
          "50%": {
            transform: "scaleY(0.4)",
          },
          "75%": {
            transform: "scaleY(1.2)",
          },
        },
        slow: {
          "25%": {
            transform: "scaleY(1)",
          },
          "50%": {
            transform: "scaleY(0.4)",
          },
          "75%": {
            transform: "scaleY(0.6)",
          },
        },
        quiet: {
          "25%": {
            transform: "scaleY(0.6)",
          },
          "50%": {
            transform: "scaleY(0.4)",
          },
          "75%": {
            transform: "scaleY(0.8)",
          },
        },
      },
      animation: {
        "bounce-loud": "loud 1.2s ease-in-out infinite",
        "bounce-slow": "slow 1.2s ease-in-out infinite",
        "bounce-quiet": "quiet 1.2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
}
