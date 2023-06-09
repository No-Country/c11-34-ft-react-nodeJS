import {Swiper, SwiperSlide} from 'swiper/react'
import {CardRestoHome} from "..";
import {Navigation, Pagination, Thumbs} from "swiper";
import {Ring} from '@uiball/loaders';


export function GalleryRow({cards, title, isLoad}) {
    const breakpoints = {
        320: {
            slidesPerView: 2,
            slidesPerGroup: 2,
            
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
        <div className='md:px-12 dt:px-24'>
            <h3 className='font-montserrat text-xl font-medium'> {title}</h3>
            <div className="">
                <Swiper
                    loop={true}
                    spaceBetween={50}
                    breakpoints={breakpoints}
                    slidesPerView={1}
                    grabCursor={true}
                    modules={[Navigation, Thumbs, Pagination]}
                    pagination={{el: '.pagination', clickable: true}}
                    className='w-[100vw] md:w-full overflow-hidden'
                >

                        {
                            cards.map(item => (
                                <SwiperSlide key={item._id}>
                                    <CardRestoHome {...item} />
                                </SwiperSlide>
                            ))
                        }
                </Swiper>
            </div>
        </div>
    );
}