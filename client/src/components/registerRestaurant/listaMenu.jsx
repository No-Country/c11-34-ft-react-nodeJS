// eslint-disable-next-line no-unused-vars
import {Link, useNavigate} from "react-router-dom";
import { newRestaurant } from "../../services";
import { toast } from "react-hot-toast";
import { createRestaurantValidate } from "../../utils";
import arrow from '../../assets/arrow-right.svg'
import done from '../../assets/done.svg'
export function ListaMenu() {

    const navigate = useNavigate();

    const photos = JSON.parse(localStorage.getItem('photoRestaurant')) || {};
    const descrip = JSON.parse(localStorage.getItem('descriptionRestaurantData')) || {};
    const daysTime = JSON.parse(localStorage.getItem('dataDayRestaurant')) || {};
    const diners = JSON.parse(localStorage.getItem('dinersTables')) || {};
    const foodType = JSON.parse(localStorage.getItem('tastesRestaurant')) || {};
    const chars = JSON.parse(localStorage.getItem('characteristicsRestaurant')) || {};
    const firstData = JSON.parse(localStorage.getItem('restaurantFirstData')) || {};

    const isDone = (data) => {
        const toArr = Object.values(data)
        return toArr && toArr.length > 0
    }

    const dataNewRestaurant = () => {
        const data = {
            nombre: firstData.nombre,
            direccion: firstData.direccion,
            telefono: firstData.telefono,
            correo: firstData.correo,
            dias: daysTime.days,
            horarioIn: daysTime.openHour,
            horarioOut: daysTime.closeHour,
            tipoComida: foodType.tastes,
            mesas: diners.mesas,
            sillasPorMesa: diners.sillasPorMesa,
            intervaloMesa: daysTime.duration,
            descripcion: descrip.description,
            caracteristicasPrinc: chars.characteristics,
            otrosDetalles: chars.newChar,
            costoReserva: daysTime.reservationCost,
            cantidadComentarios: 0,
            imagenes: photos,
            turnos: 12,
        }
        return data
    
    }

    async function handleSubmit(e) {
        e.preventDefault();
        const toValidate = {
            photos,
            descrip,
            daysTime,
            diners,
            foodType,
            chars,
            firstData
        } 
        
        const isValidate = createRestaurantValidate(toValidate)

        if(!isValidate) {
            toast.error('Todos los campos deben estar completos')
            return
        }

        try {
            //TODO: Averiguar como enviar las imagenes - components/registerRestaurant/photo
            // const data = dataNewRestaurant()
            // await newRestaurant(data)
            // toast.success('Su restaurante a sido  creado sastifactoriamente!')
            //navigate('/')
        } catch (error) {
            console.error(error)
            toast.error('Algo salio mal')
        }
        
    }


    return (
        <div className="px-4 lg:px-0">
        
            <h2 className="text-2xl font-montserrat font-semibold mb-2">Completa cada unos de los Formularios</h2>
            <p className="text-sm font-inter  text-subtitle mb-4">Rellena los datos detalladamente, para obtener un mayor beneficio</p>
            <form onSubmit={handleSubmit} className='flex  flex-col gap-y-6 dt:w-[50vw] '>
                <div className={'w-full flex items-center justify-between rounded-lg py-2 outline-none hover:bg-black hover:text-white transition-all cursor-pointer px-4 font-inter'}>
                    <Link
                        className={` hover:text-white transition-colorsc text-subtitle  flex gap-x-2 items-center`}
                        to={"/create-restaurant/photos"}>
                        Fotos
                        <img src={arrow} alt="arrow svg icon" className="w-6 h-6"/>
                    </Link>
                    {
                        isDone(photos) && <img src={done} className="w-6 h-6"/>
                    }
                </div>
                <div className={'w-full flex items-center justify-between rounded-lg py-2 outline-none hover:bg-black hover:text-white transition-all cursor-pointer px-4 font-inter'}>
                    <Link
                        className={` hover:text-white transition-colorsc text-subtitle font-inter flex gap-x-2 items-center`}
                        to={"/create-restaurant/description"}>
                        Descripción
                        <img src={arrow} alt="arrow svg icon" className="w-6 h-6"/>
                    </Link>
                    {
                        isDone(descrip) && <img src={done} className="w-6 h-6"/>
                    }
                </div>
                <div className={'w-full flex items-center justify-between rounded-lg py-2 outline-none hover:bg-black hover:text-white transition-all cursor-pointer px-4 font-inter'}>
                    <Link
                        className={` hover:text-white transition-colorsc text-subtitle flex gap-x-2 items-center`}
                        to={"/create-restaurant/reservationDays"}>
                        Días y Horarios
                        <img src={arrow} alt="arrow svg icon" className="w-6 h-6"/>
                    </Link>
                    {
                        isDone(daysTime) && <img src={done} className="w-6 h-6"/>
                    }
                </div>
                <div className={'w-full flex items-center justify-between rounded-lg py-2 outline-none hover:bg-black hover:text-white transition-all cursor-pointer px-4 font-inter'}>
                    <Link
                        className={` hover:text-white transition-colorsc text-subtitle rounded-lg  flex gap-x-2 items-center`}
                        to={"/create-restaurant/diners"}>
                        Cantiadad de comensales
                        <img src={arrow} alt="arrow svg icon" className="w-6 h-6"/>
                    </Link>
                    {
                        isDone(diners) && <img src={done} className="w-6 h-6"/>
                    }
                </div>
                <div className={'w-full flex items-center justify-between rounded-lg py-2 outline-none hover:bg-black hover:text-white transition-all cursor-pointer px-4 font-inter'}>
                    <Link
                        className={` hover:text-white transition-colorsc text-subtitle rounded-lg flex gap-x-2 items-center`}
                        to={"/create-restaurant/listTastes"}>
                        Tipos de Comida
                        <img src={arrow} alt="arrow svg icon" className="w-6 h-6"/>
                    </Link>
                    {
                        isDone(foodType) && <img src={done} className="w-6 h-6"/>
                    }
                </div>
                <div className={'w-full flex items-center justify-between rounded-lg py-2 outline-none hover:bg-black hover:text-white transition-all cursor-pointer px-4 font-inter'}>
                    <Link
                        className={` hover:text-white transition-colorsc text-subtitle rounded-lg flex gap-x-2 items-center`}
                        to={"/create-restaurant/caracts"}>
                        Caracteristicas principales
                        <img src={arrow} alt="arrow svg icon" className="w-6 h-6"/>

                    </Link>
                    {
                        isDone(chars) && <img src={done} className="w-6 h-6"/>
                    }
                </div>
                <div className='flex  justify-between'>
                    <Link to='/create-restaurant' className="border shadow text-black rounded-full p-2.5 font-inter flex w-full justify-center">
                        Volver atras
                    </Link>
                    <button type='submit'
                            className='bg-black text-white rounded-full w-full font-inter flex py-2  justify-center hover:scale-105 transition-transform'>
                        Finalizar
                    </button>
                </div>
            </form>
        </div>

    )
}
