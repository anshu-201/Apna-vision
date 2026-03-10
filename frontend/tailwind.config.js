/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["ui-sans-serif", "system-ui", "Segoe UI", "Roboto", "Arial"]
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(99,102,241,0.25), 0 10px 30px rgba(99,102,241,0.15)"
      }
    }
  },
  plugins: []
};

