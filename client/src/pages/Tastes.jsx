import {useState, useEffect } from "react";
import {TastesList} from "../utils";
import {Swiper, SwiperSlide} from 'swiper/react'
import {CardTastes, NavBarUI} from "../components";
import {Navigation, Pagination, Thumbs} from "swiper";
import {Link, useNavigate} from "react-router-dom";
import {addTastes} from "../services";
import {toast} from "react-hot-toast";
import { useUser } from "../hooks";
import arrowLeft from '../assets/caret-left-simple.svg'
import arrowRight from '../assets/caret-right-simple.svg'

export function Tastes() {
    const [selectedCategories, setSelectedCategories] = useState([]);

    const navigate = useNavigate()
    const {load, user} = useUser()

    useEffect(() => {
     if(!load && !Object.values(user).length) navigate('/auth')
    }, [user, navigate, load])

    useEffect(() => {
        if(!load && user) setSelectedCategories(user.gustos)
    }, [load, user])

    const handleCategoryChange = (name) => {
        if (selectedCategories.includes(name)) {
            setSelectedCategories(selectedCategories.filter(cat => cat !== name));
        } else {
            setSelectedCategories([...selectedCategories, name]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const email = localStorage.getItem('correo')
            const tastes = {correo: email, gustos: selectedCategories}
            await addTastes(tastes)
            toast.success('Tus gustos han sido agregados exitosamente')
            navigate('/')
        } catch (error) {
            console.error(error)
            toast.error('Error al actualizar los gustos')
        }
    }

    const breakpoints = {
        768: {
            slidesPerView: 3,
        },
        1024: {
            slidesPerView: 4,
        },
        1440: {
            slidesPerView: 5,
        }
    }
    return (

        <section className="pb-28  lg:pb-6 dt:pb-0">

            <NavBarUI/>

            <div className="flex flex-col gap-y-4 lg:gap-y-6 dt:gap-y-12 mb-12 pt-12">
                <h2 className="font-inter text-3xl  lg:text-5xl dt:text-7xl text-center font-medium">¿Cuales son tus
                    gustos culinarios? </h2>
                <p className="font-inter text-base lg:text-xl  dt:text-2xl font-bold w-auto lg:w-[86vw] text-center  mx-auto">Para
                    ofrecerte recomendaciones personalizadas, cuéntanos tus comidas favoritas y si tienes alguna
                    restricción alimentaria o preferencia especial. </p>
            </div>
            <div className={'pb-2'}>
                <form onSubmit={handleSubmit} className="flex justify-around w-full mb-4">
                    <div className={'flex hover:bg-gray-200 transition-all p-1.5 rounded-xl'}>
                        <img className={'w-4'} src={arrowLeft} alt={'arrow Left'}/>
                        <Link to={"/"} className="font-inter font-medium">Volver</Link>
                    </div>
                    <div className={'flex hover:bg-gray-200 transition-all p-1.5 rounded-xl'}>
                        <button type="submit" className="font-inter font-medium ">Siguiente</button>
                        <img className={'w-4'} src={arrowRight} alt={'arrow Right'}/>
                    </div>
                </form>
            </div>
            {window.innerWidth < 767 ?
                <div className=" mx-auto grid grid-cols-2 grid-rows-6 gap-x-px h-gridTastesMobile w-gridTastesMobile ">
                    {TastesList.map(item => (
                        <div
                            key={item.id}
                            className={`${selectedCategories.includes(item.name) ? 'selected ' : 'grayscale'}`}
                            onClick={() => handleCategoryChange(item.name)}
                        >
                            <div className={'h-cardMobileTastes w-cardMobileTastes'}>
                                <CardTastes
                                    height={'h-cardMobileImg'}
                                    width={'w-cardMobileImg'}
                                    name={item.name}
                                    img={item.img}/>
                            </div>
                        </div>
                    ))}
                </div> :
                <div className={'mx-5 gap-5 gb-violet-200 h-4/5'}>
                    <Swiper
                        loop={true}
                        navigation={{
                            nextEl: '.swiper-button-next',
                            prevEl: '.swiper-button-prev',
                        }}
                        spaceBetween={10}
                        breakpoints={breakpoints}
                        grabCursor={true}
                        modules={[Navigation, Thumbs, Pagination]}
                        pagination={{el: '.pagination', clickable: true}}
                        className="h-heightTastesCard w-[70vw] gap-2 pb-1.5"
                    >
                        {
                            TastesList.map(item => (
                                <SwiperSlide key={item.id} spaceBetween={20}>
                                    <div
                                        key={item.id}
                                        className={`${selectedCategories.includes(item.name) ? 'selected ' : 'grayscale'}`}
                                        onClick={() => handleCategoryChange(item.name)}
                                    >
                                        <CardTastes
                                            name={item.name}
                                            img={item.img}
                                            height={'h-cardImgSwiperTastes'}/>
                                    </div>
                                </SwiperSlide>
                            ))
                        }
                    </Swiper>
                    <div className=' flex justify-center gap-x-12 pt-8 lg:pt-16 dt:pt-28'>
                        <button className='swiper-button-prev'>
                            <img src={arrowLeft} alt={'arrow'} />
                        </button>
                        <button className='swiper-button-next'>
                            <img src={arrowRight} alt={'arrow'} />
                        </button>
                    </div>
                </div>
            }
        </section>
    )
}
