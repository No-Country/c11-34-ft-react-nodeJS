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
import { Ring } from "@uiball/loaders";

export function Tastes() {
    const [selectedCategories, setSelectedCategories] = useState([]);

    const navigate = useNavigate()
    const {load, user} = useUser()

    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
      const handleResize = () => {
        setIsMobile(window.innerWidth < 768); // Establece isMobile en true si el ancho de la ventana es menor a 768px
      };
    
      handleResize(); // Llama a la función al cargar la página
    
      window.addEventListener('resize', handleResize); // Agrega un event listener para manejar cambios de tamaño de ventana
    
      return () => {
        window.removeEventListener('resize', handleResize); // Remueve el event listener al desmontar el componente
      };
    }, []);


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

    
    
    if(load) return <div className="h-[90vh] flex justify-center items-center w-full"><Ring size={40} lineWeight={5} speed={2} color="black"/></div>
    
    const breakpoints = {
        768: {
            slidesPerView: 6,
        },
        
    }

    return (
        <>
        <NavBarUI/>
        <section className="pb-28  lg:pb-6 dt:pb-0 ">


            <div className="flex flex-col gap-y-4 lg:gap-y-6 dt:gap-y-8 mb-4 pt-12">
                <h2 className="font-inter text-2xl  lg:text-5xl dt:text-6xl text-center font-bold lg:font-medium">¿Cuales son tus preferencias culinarias? </h2>
                <p className="hidden lg:block font-inter text-base lg:text-xl  dt:text-2xl font-bold w-auto lg:w-[86vw] text-center  mx-auto">Para
                    ofrecerte recomendaciones personalizadas, cuéntanos tus comidas favoritas y si tienes alguna
                    restricción alimentaria o preferencia especial. </p>
            </div>
            <div className={'mb-5'}>
                <form onSubmit={handleSubmit} className="flex justify-between md:px-16 w-full ">
                    <div className={'flex hover:bg-gray-200 transition-all p-1.5 rounded-xl'}>
                        <img className={'w-4'} src={arrowLeft} alt={'arrow Left'}/>
                        <Link to={"/"} className="font-inter font-bold">Volver</Link>
                    </div>
                    <div className={'flex hover:bg-gray-200 transition-all p-1.5 rounded-xl'}>
                        <button type="submit" className="font-inter font-bold ">Siguiente</button>
                        <img className={'w-4'} src={arrowRight} alt={'arrow Right'}/>
                    </div>
                </form>
            </div>
            {
                isMobile && 
                <section className="grid grid-cols-2 gap-2 px-4">
                    {
                        TastesList.map(taste => (
                            <div
                                key={taste.id}
                                onClick={() => handleCategoryChange(taste.name)}
                                >
                                <CardTastes
                                    isSelected={selectedCategories.includes(taste.name)}
                                    name={taste.name}
                                    img={taste.img}
                                />
                            </div>
                        ))
                    }
                </section>    
                
            }

            {

                !isMobile && 
                <section className={'ml-20'}>
                    <Swiper
                        loop={true}
                        spaceBetween={10}
                        breakpoints={breakpoints}
                        grabCursor={true}
                        modules={[Navigation, Thumbs, Pagination]}
                        pagination={{el: '.pagination', clickable: true}}
                        className="h-heightTastesCard  gap-2 pb-1.5"
                    >
                        {
                            TastesList.map(item => (
                                <SwiperSlide key={item.id} spaceBetween={20}>
                                    <div
                                        key={item.id}
                                        onClick={() => handleCategoryChange(item.name)}
                                    >
                                        <CardTastes
                                            isSelected={selectedCategories.includes(item.name)}
                                            name={item.name}
                                            img={item.img}
                                            height={'h-cardImgSwiperTastes'}/>
                                    </div>
                                </SwiperSlide>
                            ))
                        }
                    </Swiper>
                 
                </section>

            }
        </section>
        </>
    )
}
