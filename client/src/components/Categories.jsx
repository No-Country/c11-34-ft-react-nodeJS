import { Swiper, SwiperSlide } from 'swiper/react';

import { countries } from '../utils/Countries';
import SwiperCore, { Navigation, Pagination } from 'swiper';

SwiperCore.use([Navigation, Pagination]);

export function Categories() {
  const breakpoints = {
    360: {
      slidesPerView: 2,
    },
    380: {
      slidesPerView: 3,
    },
    768: {
      slidesPerView: 6,
 
    }
  };

  return (
    <Swiper
      loop={true}
      spaceBetween={10}
      breakpoints={breakpoints}
      slidesPerView={1}
      grabCursor={true}
      modules={[Navigation, Pagination]}
      className="lg:w-[70vw] w-[90vw]  overflow-hidden"
    >
      {countries.map((country, index) => (
        <SwiperSlide key={index}>
          <button
            className=" flex flex-row items-center justify-center h-10 px-2 gap-1 border border-border-color rounded-full text-xs text-subtitle transition ease-in-out duration-700 hover:bg-bg-hover"
            key={index}
          >
            <img src={country.image} alt={country.name} className='ml-2' />
            <span className="whitespace-nowrap mr-2">{country.name}</span>
          </button>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
