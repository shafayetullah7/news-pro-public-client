/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        merri:['Merriweather', 'serif'],
        abril:['Abril Fatface', 'cursive']
      },
      colors:{
        primary:'#002147',
      }
    },
  },
  plugins: [require("daisyui")],
  // daisyui: {
  //   themes: ["light", "dark"],
  // },
  darkMode: 'class',
}