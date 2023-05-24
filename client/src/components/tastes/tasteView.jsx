// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import tasteJSON from './tastesCategory.json'
import CardTastes from './Tastes.jsx'
import {NavBar} from "../NavBar.jsx";
import {Swiper, SwiperSlide} from "swiper/react";
import {Navigation, Pagination, Thumbs} from "swiper";
import arrowLeft from "../../assets/caret-left-simple.svg";
import arrowRight from "../../assets/caret-right-simple.svg";

const CategorySelection = () => {
    const [selectedCategories, setSelectedCategories] = useState([]);
    console.log(setSelectedCategories)
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

        <div>

            <NavBar/>
            <div className="flex justify-center m-8 text-4xl font-medium py-2">
                <h1>¿Cuales son tus gustos culinarios?</h1>
            </div>

            <div className="flex w-11/12 text-center items-center text-2xl font-medium py-3 my-3 mx-auto">
                <h3 >Para ofrecerte recomendaciones personalizadas, cuéntanos tus comidas favoritas y si tienes alguna restricción alimentaria o preferencia especial. </h3>
            </div>
            <div>
                <Swiper
                    loop={true}
                    navigation={{
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev',
                    }}
                    spaceBetween={0}
                    breakpoints={breakpoints}
                    slidesPerView={1}
                    grabCursor={true}
                    modules={[Navigation, Thumbs, Pagination]}

                    pagination={{el: '.pagination', clickable: true}}
                >
                    <div className="grid grid-cols-1 mx-auto sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 md:gap-8 lg:gap-10 xl:gap-12 mx-4 sm:mx-8 md:mx-12 lg:mx-40 xl:mx-52">
                    {
                        tasteJSON.map(item => (
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
                    </div>
                </Swiper>
                {/* Buttons Slide */}
                <div className=' flex flex-row justify-center items-center my-14'>
                    <button className='swiper-button-prev'>
                        <img src={arrowLeft}/>
                    </button>
                    <button className='swiper-button-next'>
                        <img src={arrowRight}/>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CategorySelection;