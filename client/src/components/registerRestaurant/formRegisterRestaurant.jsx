// eslint-disable-next-line no-unused-vars
import React, {useEffect, useState} from "react"
import Logo from '../../assets/logo.svg'
import {useNavigate} from "react-router-dom";

export function FormRegisterRestaurant() {
    const navigate = useNavigate();

    const [values, setValues] = useState({
        nombreRestauante: '',
        correo: '',
        direccion: '',
        telefono: ''
    });

    const {nombreRestauante, correo, direccion, telefono} = values;

    const onChange = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value
        })
    };

    useEffect(() => {
        document.getElementById("nombreRestauante").focus();
    }, []);

    const newRestaurantAccount = async () => {
        const dataRestaurant = {
            nombreRestauante: values.nombreRestauante,
            correo: values.correo,
            direccion: values.direccion,
            telefono: values.telefono
        }

        localStorage.setItem("restaurantFirstData", JSON.stringify(dataRestaurant));
        navigate('/createRestaurant/restaurantdata')
        setValues({
            nombreRestauante: '',
            correo: '',
            direccion: '',
            telefono: ''
        });
    }

    const onSubmit = (e) => {
        e.preventDefault();
        newRestaurantAccount();
    };

    return (
        <div>
            <div className={'flex mt-11 mb-9 mx-5'}>
                <img src={Logo} alt={'Morfi Logo'}/>
            </div>
            <div className={'mx-5'}>
                <h1 className={'text-2xl font-semibold mb-4'}>Registrá tu restaurante</h1>
                <p className={'text-sm fond-normal text-gray-400'}>Conectá con los amantes de la buena comida en Morfi y
                    recibí reservas en tu rincón gastronómico</p>
            </div>
            <form onSubmit={onSubmit} className='flex  flex-col gap-y-6 mb-8 mx-5'>
                <input
                    name='nombreRestauante'
                    id='nombreRestauante'
                    value={values.nombreRestauante}
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
