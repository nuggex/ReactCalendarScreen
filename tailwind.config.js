/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {

    extend: {
      fontFamily:{
        'sans' :['Neon', 'Helvetica']
      },
      backgroundImage: {
        'hero-pattern': "url('/public/Flag_logo_1920_1200.png')",
        'background': "url('/public/background_calendar.png')"
      }
    },
  },
  plugins: [],
}

