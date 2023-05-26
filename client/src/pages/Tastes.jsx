import { useState } from "react";
import { TastesList } from "../utils";
import { Swiper, SwiperSlide } from 'swiper/react'
import { CardTastes, NavBar } from "../components";
import { Navigation, Pagination, Thumbs } from "swiper";

import arrow from '../assets/arrow-black.svg'

export function Tastes() {
    const [selectedCategories, setSelectedCategories] = useState([]);
    const handleCategoryChange = (name) => {
        if (selectedCategories.includes(name)) {
            setSelectedCategories(selectedCategories.filter(cat => cat !== name));
        } else {
            setSelectedCategories([...selectedCategories, name]);

        }
    };
    const breakpoints = {
        320: {
            slidesPerView: 1,
        },
        768: {
            slidesPerView: 2,
        },
        1024: {
            slidesPerView: 3,
        },
        1440: {
            slidesPerView: 4,
        }
    }
    return (

        <section className="pb-6 dt:pb-0">

            <NavBar/>
        
           <div className="flex flex-col gap-y-4 lg:gap-y-6 dt:gap-y-12 mb-12 pt-12">
                <h2 className="font-inter text-3xl  lg:text-5xl dt:text-7xl text-center font-medium">¿Cuales son tus gustos culinarios? </h2>
                <p className="font-inter text-base lg:text-xl  dt:text-2xl font-bold w-auto lg:w-[86vw] text-center  mx-auto">Para ofrecerte recomendaciones personalizadas, cuéntanos tus comidas favoritas y si tienes alguna restricción alimentaria o preferencia especial. </p>
           </div>
                <Swiper
                    loop={true}
                    navigation={{
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev',
                    }}
                    spaceBetween={1}
                    breakpoints={breakpoints}
                    grabCursor={true}
                    modules={[Navigation, Thumbs, Pagination]}

                    pagination={{el: '.pagination', clickable: true}}
                    className=" lg:w-[80vw] mx-auto"
                >

                    {
                        TastesList.map(item => (
                            <SwiperSlide key={item.id} spaceBetween={20}>
                                <div
                                    key={item.id}
                                    className={`${selectedCategories.includes(item.name) ? 'selected ' : 'grayscale'}`}
                                    onClick={() => handleCategoryChange(item.name)}
                                >
                                <CardTastes name={item.name} img={item.img} />
                                </div>
                            </SwiperSlide>
                        ))
                    }
                </Swiper>
                {/* Buttons Slide */}
                <div className=' flex justify-center gap-x-12 pt-8 lg:pt-16 dt:pt-28'>
                    <button className='swiper-button-prev'>
                        <img src={arrow} className="rotate-180"/>
                    </button>
                    <button className='swiper-button-next'>
                        <img src={arrow}/>
                    </button>
                </div>
        </section>
    );
}
