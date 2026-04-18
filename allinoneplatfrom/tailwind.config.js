/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class", // ⭐ IMPORTANT (enables dark mode)

  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],

  theme: {
    extend: {
      colors: {
        brand: {
          primary: "var(--brand-primary)",
          "primary-light": "var(--brand-primary-light)",
          dark: "var(--brand-dark)",
          "dark-lighter": "var(--brand-dark-lighter)",
          accent: "var(--brand-accent)",
          bg: "var(--brand-bg)",
          success: "var(--brand-success)",
        }
      },

      keyframes: {
        bgFade: {
          "0%": { opacity: "0", transform: "scale(1.05)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        cardPop: {
          "0%": { opacity: "0", transform: "translateY(30px) scale(0.95)" },
          "100%": { opacity: "1", transform: "translateY(0) scale(1)" },
        },
        reveal: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
        avatarPulse: {
          "0%": {
            transform: "scale(1)",
            boxShadow: "0 0 0px rgba(99,102,241,0.2)",
          },
          "50%": {
            transform: "scale(1.06)",
            boxShadow: "0 0 15px rgba(99,102,241,0.5)",
          },
          "100%": {
            transform: "scale(1)",
            boxShadow: "0 0 0px rgba(99,102,241,0.2)",
          },
        },
      },

      animation: {
        bgFade: "bgFade 1.3s ease-out",
        cardPop: "cardPop 0.7s ease-out",
        avatarPulse: "avatarPulse 2.2s ease-in-out infinite",
        reveal: "reveal 0.6s ease-out forwards",
        shimmer: "shimmer 2s infinite",
      },
    },
  },

  plugins: [],
};