import { useState } from "react"
import { newUser } from "../services"


export function RegisterForm() {

    const [values, setValues] = useState({
        nombre : '',
        correo : '',
        contrasena: ''
    })


    function handleChange (event) {
        const {name, value} = event.target
        setValues({
            ...values,
            [name] : value
        })
    }

    async function handleSubmit (event) {
        event.preventDefault()
        await newUser(values)
        alert('Usuario creado')
    }


  return (
    <form onSubmit={handleSubmit} className='flex  flex-col gap-y-6 mb-8 '>
        <input 
            name='nombre'
            type='text' 
            placeholder='Nombre'
            onChange={(e) => handleChange(e)} 
            className='p-2.5 border-b border-[#E6E8EA] outline-none w-full'/>
        <input 
            name='correo'
            type='email' 
            placeholder='Email' 
            onChange={(e) => handleChange(e)}
            className='p-2.5 border-b border-[#E6E8EA] outline-none'/>
        <input 
            name='contrasena'
            type='password' 
            placeholder='Contraseña' 
            onChange={(e) => handleChange(e)}
            className='p-2.5 border-b border-[#E6E8EA] outline-none'/>
        <div className='flex flex-col gap-y-6'>
        <button type='submit' className='bg-black text-white rounded-full p-2.5 '>Crear cuenta</button>
        <button className='flex gap-x-4 items-center justify-center p-2.5 rounded-full border-2 border-[#E6E8EA] font-medium'>
            <img src='https://img.freepik.com/iconos-gratis/buscar_318-265146.jpg' alt='google logo' width='24' height='24'/>
            Ingresar con Google
        </button>
        <button className='flex gap-x-4 items-center justify-center p-2.5 rounded-full border-2 border-[#E6E8EA] font-medium'>
            <img src='https://cdn.icon-icons.com/icons2/2972/PNG/512/facebook_logo_icon_186880.png' alt='facebook logo' width='24' height='24' />
            Ingresar con Facebook
        </button>
        </div>
    </form>
  )
}
