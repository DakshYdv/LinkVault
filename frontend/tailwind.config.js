/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        gray: {
          100: "#eeeeef",
          200: "#e2e8f0",
          200: "#e6e9ed",
          600: "#95989c"
        },
        purple: {
          200: "#d9ddee",
          500: "#9492db",
          600: "#7164c0"
        },
        blue: {
          100: "#e0e7ff",
          600: "#5046e4"
        },
        offwhite: "fefefe",
        ivory: "#f9fafb",
        slate: {
          400: "#9ca3af",
          900: "#101827"
        }
      }
    },
  },
  plugins: [],
}

