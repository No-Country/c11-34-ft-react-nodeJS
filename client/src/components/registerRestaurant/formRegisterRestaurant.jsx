// eslint-disable-next-line no-unused-vars
import React, {useEffect, useState} from "react"
import {useNavigate} from "react-router-dom";
export function FormRegisterRestaurant() {
    const navigate = useNavigate();

    const [values, setValues] = useState({
        nombre: '',
        correo: '',
        direccion: '',
        telefono: ''
    });

    const [error, setError ] = useState('')

    const onChange = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value
        })
    };


    const newRestaurantAccount = async () => {
        const dataRestaurant = {
            nombre: values.nombre,
            correo: values.correo,
            direccion: values.direccion,
            telefono: values.telefono
        }

        localStorage.setItem("restaurantFirstData", JSON.stringify(dataRestaurant));
        navigate('/create-restaurant/restaurant-detail')
        setValues({
            nombre: '',
            correo: '',
            direccion: '',
            telefono: ''
        });
    }

    const onSubmit = (e) => {
        e.preventDefault();
        if(Object.values(values).includes(''))  {
            setError('Los campos no deben estar vacios *')
            setTimeout(() => setError(' '), 2500)
            return
        }
        newRestaurantAccount();
    };

    return (
        <div className="px-4 lg:px-0">
            <div className={'mb-6'}>
                <h1 className={'text-2xl font-semibold mb-2 font-montserrat'}>Registrá tu restaurante</h1>
                <p className={'text-sm font-normal text-subtitle  font-inter'}>Conectá con los amantes de la buena comida en Morfi y
                    recibí reservas en tu rincón gastronómico</p>
            </div>
   
            <form onSubmit={onSubmit} className='flex  flex-col gap-y-6  font-inter relative'>           
                {
                    error && 
                    <p className="text-red-500 font-inter text-sm absolute -top-4 left-0">{error}</p>
                }
                <input
                    name='nombre'
                    id='nombre'
                    value={values.nombre}
                    type='text'
                    onChange={onChange}
                    placeholder='Nombre del negocio'
                    className={`p-2.5 border-b border-border-color outline-none`}/>
                <input
                    name='correo'
                    id='correo'
                    value={values.correo}
                    type='email'
                    onChange={onChange}
                    placeholder='Email'
                    className={`p-2.5 border-b border-border-color outline-none`}/>
                <input
                    name='direccion'
                    id='direccion'
                    value={values.direccion}
                    type='text'
                    onChange={onChange}
                    placeholder='Direccion'
                    className={`p-2.5 border-b border-border-color outline-none`}/>
                <input
                    name='telefono'
                    id='telefono'
                    value={values.telefono}
                    type='number'
                    onChange={onChange}
                    placeholder='Telefono'
                    className={`p-2.5 border-b border-border-color outline-none`}/>
                <div className='flex flex-col gap-y-6'>
                    <button type={'submit'}
                            className='bg-black text-white rounded-full p-2.5 font-inter flex w-full justify-center'>
                        Comenzar
                    </button>
                </div>
            </form>
        </div>

    )
}
