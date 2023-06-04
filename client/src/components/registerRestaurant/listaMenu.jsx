// eslint-disable-next-line no-unused-vars
import React, {useState} from "react"
import {Link, useNavigate} from "react-router-dom";
import arrow from '../../assets/arrow-right.svg'

export function ListaMenu() {
    const navigate = useNavigate();

    const photos = JSON.parse(localStorage.getItem('photosRestaurant'));
    const descrip = JSON.parse(localStorage.getItem('descriptionRestaurantData'));
    const daysTime = JSON.parse(localStorage.getItem('dataDayRestaurant'));
    const diners = JSON.parse(localStorage.getItem('dinersTables'));
    const foodType = JSON.parse(localStorage.getItem('tastesRestaurant'));
    const chars = JSON.parse(localStorage.getItem('characteristicsRestaurant'));
    const firstData = JSON.parse(localStorage.getItem('restaurantFirstData'));


    const [values, setValues] = useState({
        nombre: '',
        direccion: '',
        telefono: '',
        correo: '',
        dias: [],
        horarioIn: '',
        horarioOut: '',
        tipoComida: [],
        mesas: '',
        sillasPorMesa: '',
        intervaloMesa: '',
        descripcion: '',
        caracteristicasPrincipales: [],
        otrosDetalles: [],
        costoReserva: '',
        cantidadComentarios: '',
        imagenes: [],
        capacidadMax: '',
        turnos: [],
    });

    const dataNewRestaurant = () => {
        const data = {
            nombre: firstData.nombreRestauante,
            direccion: firstData.direccion,
            telefono: firstData.telefono,
            correo: firstData.correo,
            dias: daysTime.days,
            horarioIn: daysTime.openHour,
            horarioOut: daysTime.closeHour,
            tipoComida: foodType.tastes,
            mesas: diners.cantidadMesas,
            sillasPorMesa: diners.cantidadSillasPorMesa,
            intervaloMesa: daysTime.duration,
            descripcion: descrip.descripcion,
            caracteristicasPrincipales: chars.characteristics,
            otrosDetalles: chars.newChar,
            costoReserva: daysTime.reservationCost,
            cantidadComentarios: '',
            imagenes: photos,
            capacidadMax: diners.cantidadMesas*diners.cantidadSillasPorMesa,
            turnos: [],
        }
        navigate("/");
        console.log(data)
        setValues({
            nombre: '',
            direccion: '',
            telefono: '',
            correo: '',
            dias: [],
            horarioIn: '',
            horarioOut: '',
            tipoComida: [],
            mesas: '',
            sillasPorMesa: '',
            intervaloMesa: '',
            descripcion: '',
            caracteristicasPrincipales: [],
            otrosDetalles: [],
            costoReserva: '',
            cantidadComentarios: '',
            imagenes: [],
            capacidadMax: '',
            turnos: [],
        })
    }

    async function onSubmit(e) {
        e.preventDefault();
        dataNewRestaurant();
    }


    return (
        <div className="px-4 lg:px-0">
        
            <h2 className="text-2xl font-montserrat font-semibold mb-2">Completa cada unos de los Formularios</h2>
            <p className="text-sm font-inter text-subtitle mb-4">Rellena los datos detalladamente, para obtener un mayor beneficio</p>
            <form onSubmit={onSubmit} className='flex  flex-col gap-y-6 dt:w-[50vw] '>
                <div className={'w-full b'}>
                    <Link
                        className={`border-b border-border-color text-subtitle rounded-lg py-2 outline-none hover:bg-black hover:text-white transition-all cursor-pointer w-full  px-4 font-inter flex gap-x-2 items-center`}
                        to={"/create-restaurant/photos"}>
                        Fotos
                        <img src={arrow} alt="arrow svg icon" className="w-6 h-6"/>
                    </Link>
                </div>
                <div className={''}>
                    <Link
                        className={`border-b border-border-color text-subtitle rounded-lg py-2 outline-none hover:bg-black hover:text-white transition-all cursor-pointer w-full  px-4 font-inter flex gap-x-2 items-center`}
                        to={"/create-restaurant/description"}>
                        Descripción
                        <img src={arrow} alt="arrow svg icon" className="w-6 h-6"/>
                    </Link>
                </div>
                <div className={''}>
                    <Link
                        className={`border-b border-border-color text-subtitle rounded-lg py-2 outline-none hover:bg-black hover:text-white transition-all cursor-pointer w-full  px-4 font-inter flex gap-x-2 items-center`}
                        to={"/create-restaurant/reservationDays"}>
                        Días y Horarios
                        <img src={arrow} alt="arrow svg icon" className="w-6 h-6"/>
                    </Link>
                </div>
                <div className={''}>
                    <Link
                        className={`border-b border-border-color text-subtitle rounded-lg py-2 outline-none hover:bg-black hover:text-white transition-all cursor-pointer w-full  px-4 font-inter flex gap-x-2 items-center`}
                        to={"/create-restaurant/diners"}>
                        Cantiadad de comensales
                        <img src={arrow} alt="arrow svg icon" className="w-6 h-6"/>
                    </Link>
                </div>
                <div className={''}>
                    <Link
                        className={`border-b border-border-color text-subtitle rounded-lg py-2 outline-none hover:bg-black hover:text-white transition-all cursor-pointer w-full  px-4 font-inter flex gap-x-2 items-center`}
                        to={"/create-restaurant/listTastes"}>
                        Tipos de Comida
                        <img src={arrow} alt="arrow svg icon" className="w-6 h-6"/>
                    </Link>
                </div>
                <div className={''}>
                    <Link
                        className={`border-b border-border-color text-subtitle rounded-lg py-2 outline-none hover:bg-black hover:text-white transition-all cursor-pointer w-full  px-4 font-inter flex gap-x-2 items-center`}
                        to={"/create-restaurant/caracts"}>
                        Caracteristicas principales
                        <img src={arrow} alt="arrow svg icon" className="w-6 h-6"/>

                    </Link>
                </div>
                <div className='flex flex-col gap-y-6'>
                    <button type='submit'
                            className='bg-black text-white rounded-full w-full font-inter flex py-2  justify-center hover:scale-105 transition-transform'>
                        Finalizar
                    </button>
                </div>
            </form>
        </div>

    )
}
