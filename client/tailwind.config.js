/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors : {
        subtitle : '#BAC0C7',
        'border-color' : '#E6E8EA',
        'icon-color': '#E6E8EA',
        'bg-color': '#FFFFFF',
        'letter-color': '#FFFFFF',
        'bg-hover': '#E6E8EA',
        'bg-dark': '#000000',
      },
      screens : {
        dt : '1440px'
      },
      fontFamily : {
        'inter' : ['Inter', 'sans-serif'],
        'montserrat' : ['Montserrat', 'sans-serif']
      },
      height:{
        'galleryDesktop': '300px',
        'galleryMobile': '250px'
      },
      width:{
        'galleryDesktop': '300px',
        'galleryMobile': '250px'
      }
    },
  },
  plugins: [],
}