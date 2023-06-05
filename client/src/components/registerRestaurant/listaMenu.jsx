// eslint-disable-next-line no-unused-vars
import React, {useState} from "react"
import Logo from '../../assets/logo.svg'
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";

export function ListaMenu() {
    const navigate = useNavigate();

    const photos = JSON.parse(localStorage.getItem('photosRestaurant'));
    const descrip = JSON.parse(localStorage.getItem('descriptionRestaurantData'));
    const daysTime = JSON.parse(localStorage.getItem('dataDayRestaurant'));
    const diners = JSON.parse(localStorage.getItem('dinersTables'));
    const foodType = JSON.parse(localStorage.getItem('tastesRestaurant'));
    const chars = JSON.parse(localStorage.getItem('characteristicsRestaurant'));
    const firstData = JSON.parse(localStorage.getItem('restaurantFirstData'));

    const [actions, setActions] = useState({
        error : false,
        loading : false
    })

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
        caracteristicasPrinc: [],
        otrosDetalles: [],
        costoReserva: '',
        cantidadComentarios: '',
        imagenes: [],
        capacidadMax: '',
        turnos: [],
    });

    const resetValue = () =>{
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
            caracteristicasPrinc: [],
            otrosDetalles: [],
            costoReserva: '',
            cantidadComentarios: '',
            imagenes: [],
        })
    }

    const dataNewRestaurant = async () => {
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
            descripcion: descrip.description,
            caracteristicasPrinc: chars.characteristics,
            otrosDetalles: chars.newChar,
            costoReserva: daysTime.reservationCost,
            images: photos,
        }
        console.log(data)
        try {
            const response = await axios.post('https://ncback-production.up.railway.app/api/restaurant',
            {
                data
            }, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });

            console.log(response)
            setActions({ loading : false , error : false})
            navigate("/");
            resetValue();
        }catch (error){
            console.error(error.message)
            setActions({ loading : false , error : true})
        }
    }

    async function onSubmit(e) {
        e.preventDefault();
        dataNewRestaurant();
    }


    return (
        <div>
            <div className={'flex mt-11 mb-16 mx-5'}>
                <img src={Logo} alt={'Morfi Logo'}/>
            </div>

            <form onSubmit={onSubmit} className='flex  flex-col gap-y-6 mb-8 mx-5'>
                <div className={'border-b border-border-color outline-none'}>
                    <Link
                        className={`p-2.5 text-slate-400`}
                        to={"/createRestaurant/restaurantdata/photos"}>
                        Fotos
                    </Link>
                </div>
                <div className={'border-b border-border-color outline-none'}>
                    <Link
                        className={`p-2.5 text-slate-400`}
                        to={"/createRestaurant/restaurantdata/description"}>
                        Descripción
                    </Link>
                </div>
                <div className={'border-b border-border-color outline-none'}>
                    <Link
                        className={`p-2.5 text-slate-400`}
                        to={"/createRestaurant/restaurantdata/reservationDays"}>
                        Días y Horarios
                    </Link>
                </div>
                <div className={'border-b border-border-color outline-none'}>
                    <Link
                        className={`p-2.5 text-slate-400`}
                        to={"/createRestaurant/restaurantdata/diners"}>
                        Cantiadad de comensales
                    </Link>
                </div>
                <div className={'border-b border-border-color outline-none'}>
                    <Link
                        className={`p-2.5 text-slate-400`}
                        to={"/createRestaurant/restaurantdata/listTastes"}>
                        Tipos de Comida
                    </Link>
                </div>
                <div className={'border-b border-border-color outline-none'}>
                    <Link
                        className={`p-2.5 text-slate-400`}
                        to={"/createRestaurant/restaurantdata/caracts"}>
                        Caracteristicas principales
                    </Link>
                </div>
                <div className='flex flex-col gap-y-6'>
                    <button type='submit'
                            className='bg-black text-white rounded-full p-2.5 font-inter flex w-full justify-center'>
                        Finalizar
                    </button>
                </div>
            </form>
        </div>

    )
}
