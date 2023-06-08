// eslint-disable-next-line no-unused-vars
import {Link, useNavigate} from "react-router-dom";
import { newRestaurant } from "../../services";
import { toast } from "react-hot-toast";
import { createRestaurantValidate } from "../../utils";
import arrow from '../../assets/arrow-right.svg'
import done from '../../assets/done.svg'
import { PhotoField } from "./PhotoField";
import { useState } from "react";
import { Ring } from "@uiball/loaders";
export function ListaMenu() {

    const navigate = useNavigate();

    const [file, setFile] = useState(null)
    const [isLoad, setIsLoad] = useState(false)

    const descrip = JSON.parse(localStorage.getItem('descriptionRestaurantData')) || {};
    const daysTime = JSON.parse(localStorage.getItem('dataDayRestaurant')) || {};
    const diners = JSON.parse(localStorage.getItem('dinersTables')) || {};
    const foodType = JSON.parse(localStorage.getItem('tastesRestaurant')) || {};
    const chars = JSON.parse(localStorage.getItem('characteristicsRestaurant')) || {};
    const firstData = JSON.parse(localStorage.getItem('restaurantFirstData')) || {};

    const handleFile = (e) => setFile(e.target.files[0])

    const isDone = (data) => {
        const toArr = Object.values(data)
        return toArr && toArr.length > 0
    }

    const removeDataLocalStorage = () => {
        const items = ['descriptionRestaurantData', 'dataDayRestaurant', 'dinersTables', 'tastesRestaurant', 'characteristicsRestaurant', 'restaurantFirstData']
        items.forEach(item => {
            localStorage.removeItem(item)
        })
    }

    const dataNewRestaurant = () => {
        const data = {
            nombre: firstData.nombre,
            direccion: firstData.direccion,
            telefono: firstData.telefono,
            correo: firstData.correo,
            dias: JSON.stringify(daysTime.days),
            horarioIn: daysTime.openHour,
            horarioOut: daysTime.closeHour,
            tipoComida: JSON.stringify(foodType.tastes),
            mesas: diners.mesas,
            costoReserva : daysTime.reservationCost,
            sillasPorMesa: diners.sillasPorMesa,
            intervaloMesa: diners.sillasPorMesa,
            descripcion: descrip.description,
            caracteristicasPrinc: JSON.stringify(chars.characteristics),
            otrosDetalles: JSON.stringify(chars.newChar),
            images: file,
        }

        return data
    
    }

    async function handleSubmit(e) {
        e.preventDefault();
        const toValidate = {
            descrip,
            daysTime,
            diners,
            foodType,
            chars,
            firstData
        } 
        
        const isValidate = createRestaurantValidate(toValidate)

        if(!isValidate || file === null) {
            toast.error('Todos los campos deben estar completos')
            return
        }

        try {
            setIsLoad(true)
            const data = dataNewRestaurant()
            await newRestaurant(data)
            setIsLoad(false)
            toast.success('Su restaurante ha sido creado sastifactoriamente!')
            removeDataLocalStorage()
            navigate('/')
        } catch (error) {
            console.error(error)
            toast.error('Algo salio mal')
            setIsLoad(false)
        }
        
    }


    return (
        <div className="px-4 lg:px-0">
        
            <h2 className="text-2xl font-montserrat font-semibold mb-2">Completa cada unos de los Formularios</h2>
            <p className="text-sm font-inter  text-subtitle mb-4">Rellena los datos detalladamente, para obtener un mayor beneficio</p>
            <form onSubmit={handleSubmit} className='flex  flex-col gap-y-6 dt:w-[50vw] '>
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

                <PhotoField onFile={handleFile} file={file}/>
                <div className='flex  justify-between'>
                    <Link to='/create-restaurant' className="border shadow text-black rounded-full p-2.5 font-inter flex w-full justify-center">
                        Volver atras
                    </Link>
                    <button type='submit'
                            className='bg-black text-white rounded-full p-2.5 font-inter flex w-full justify-center'>
                        {
                            isLoad
                            ? <Ring size={20} lineWeight={5} speed={2} color="white"/>
                            : 'Finalizar'
                        }
                    </button>
                </div>
            </form>
        </div>

    )
}
