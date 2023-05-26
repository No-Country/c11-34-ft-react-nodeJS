import { Link } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import {Navigation, Thumbs, Pagination} from 'swiper'
import { SwiperCard } from './SwiperCard'
import { swiperCards } from '../../utils'

import logoWhite from '../../assets/logo-white.svg'
import arrowLeft from '../../assets/arrow-left.svg'
import arrowRight from '../../assets/arrow-right.svg'

import 'swiper/css'

export function BackgroundAuth() {
  return (
    <section className="hidden lg:col-span-5 dt:col-span-7 w-full lg:h-[92vh] dt:h-[94vh]  overflow-hidden rounded-3xl  lg:flex justify-between items-end  relative ">
      <Swiper
        loop={true}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }}
        grabCursor={true}
        modules={[Navigation, Thumbs, Pagination]}
        className=''
      >
      {
        swiperCards.map(card => (
          <SwiperSlide key={card.id}>
            <SwiperCard card={card}/>
          </SwiperSlide>
        ))
      }
        
      </Swiper>

      {/* Buttons Slide */}
      <div className='absolute bottom-12  right-8 flex gap-x-6 items-center z-10'>
          <button className='swiper-button-prev'>
              <img src={arrowLeft}/> 
          </button>
          <button className='swiper-button-next'>
                <img src={arrowRight}/>
          </button>
      </div>
  
      <Link to='/' className=' transition-transform cursor-pointer z-10'>
        <img src={logoWhite} alt='logo morfi' className='absolute top-8 left-10 hover:scale-95'/>
      </Link> 
    </section>
  )
}
