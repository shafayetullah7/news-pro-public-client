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
        secondary:'#884A39',
        admin:'#884A39',
        instructor:'#C38154',
        student:'#FFC26F',
      }
    },
  },
  plugins: [require("daisyui")],
  // daisyui: {
  //   themes: ["light", "dark"],
  // },
  darkMode: 'class',
}