/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      'artists': ['HKGroteskWeb', 'sans-serif']
    },
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
        profile: "minmax(350px, 17.5%) 1fr",
        recentlyPlayed: "27.5px 60px auto 50px 50px"
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
