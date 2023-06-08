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
        'black-light' : '#353535', 
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
        'galleryMobile': '250px',
        'mapViewRestaurant': '526px',
        'cardViewRestaurantGrid': '191.67px',
        'firstCardViewRestaurantGrid': '615px',
        'reservationForm':'304px',
        'cardMobileImg': '156px',
        'cardMobileTastes': '155px',
        'gridTastesMobile': '1260px',
        'cardImgSwiperTastes': '402px',
        'heightTastesCard': '458',
        'xlarge': '550px'
      },
      width:{
        'galleryDesktop': '300px',
        'galleryMobile': '250px',
        'mapViewRestaurant': '1240px',
        'cardViewRestaurantGrid': '295px',
        'firstCardViewRestaurantGrid': '925px',
        'reservationForm':'400px',
        'cardMobileTastes': '184px',
        'cardMobileImg': '156px',
        'gridTastesMobile': '320px',
        'cardImgSwiperTastes': '190px',
        'marginSwiper': '100px',
        'tableView': '678px',
        'largeView': '860px',
        'xlarge': '1000px'
      },
      gridTemplateColumns:{
        'viewRestaurant': '925px, 295px',
      },
      gridTemplateRows:{
        'viewRestaurant': '192px, 192px,192px',
      },
      borderRadius:{
        'btnReservation': '99px',
      }
    },
  },
  plugins: [],
}