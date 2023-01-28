/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        "fade-in": {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        "fade-out": {
          "0%": { opacity: 1 },
          "100%": { opacity: 0 },
        },
        render: {
          "0%": { backgroundColor: "rgba(119, 201, 189, .4)" },
          "100%": { backgroundColor: "transparent" },
        },
        "render-form": {
          "0%": { borderColor: "rgba(119, 201, 189, .4)" },
          "100%": { borderColor: "transparent" },
        },
        rotate: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.3s",
        "fade-out": "fade-out 0.3s",
        render: "render 700ms ease-in-out",
        "render-form": "render-form 700ms ease-in-out",
        rotate: "rotate 300ms cubic-bezier(0.4, 0, 0.2, 1)",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
