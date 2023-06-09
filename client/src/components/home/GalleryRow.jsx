import {Swiper, SwiperSlide} from 'swiper/react'
import {CardRestoHome} from "..";
import {Navigation, Pagination, Thumbs} from "swiper";
import {Ring} from '@uiball/loaders';


export function GalleryRow({cards, title, isLoad}) {
    const breakpoints = {
        320: {
            slidesPerView: 1,
        },
        768: {
            slidesPerView: 2,
        },
        1024: {
            slidesPerView: 4,
        },
        1440: {
            slidesPerView: 4,
        }

    }

    if (isLoad) return <div className="flex justify-center items-center w-full"><Ring size={40} lineWeight={5} speed={2}
                                                                                      color="black"/></div>

    return (

        <div className='select-none'>
            <div className="px-5 font-black lg:text-xl">{title}</div>

            <div className="px-5">
                <Swiper
                    loop={true}
                    spaceBetween={50}
                    breakpoints={breakpoints}
                    slidesPerView={1}
                    grabCursor={true}
                    modules={[Navigation, Thumbs, Pagination]}

                    pagination={{el: '.pagination', clickable: true}}
                >
                    <div
                        className="grid grid-cols-1  sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 md:gap-8 lg:gap-10 xl:gap-12 mx-4 sm:mx-8 md:mx-12 lg:mx-40 xl:mx-52">
                        {
                            cards.map(item => (
                                <SwiperSlide key={item._id}>
                                    <CardRestoHome {...item} />
                                </SwiperSlide>
                            ))
                        }
                    </div>
                </Swiper>
            </div>
        </div>
    );
}