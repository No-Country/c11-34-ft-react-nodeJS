import { useState } from "react"
import { registerUser } from "../../services"
import { toast } from "react-hot-toast"

export function RegisterForm() {

    const [isError, setIsError] = useState(false)
    const [values, setValues] = useState({
        nombre : '',
        correo : '',
        contrasena: ''
    })


    function resetFields () { setValues({...values, nombre : '', correo : '', contrasena: ''})}
    function handleChange (event) {
        const {name, value} = event.target
        setValues({
            ...values,
            [name] : value
        })
    }

    async function handleSubmit (event) {
        event.preventDefault()
        try {
            const res = await registerUser(values)
            toast.success(res.data.mensaje)
            setIsError(false)
            resetFields()
        } catch (error) {
            const errorMessage = error.response.data.data.errors[0].msg
            toast.error(errorMessage)
            setIsError(true)
        }
    }


  return (
    <form onSubmit={handleSubmit} className='flex  flex-col gap-y-6 mb-8 '>
        <input 
            name='nombre'
            value={values.nombre}
            type='text' 
            placeholder='Nombre'
            onChange={(e) => handleChange(e)} 
            className={`${isError && 'border border-red-400'} p-2.5 border-b border-border-color outline-none`}/>
        <input 
            name='correo'
            value={values.correo}
            type='email' 
            placeholder='Email' 
            onChange={(e) => handleChange(e)}
            className={`${isError && 'border border-red-400'} p-2.5 border-b border-border-color outline-none`}/>
        <input 
            name='contrasena'
            value={values.contrasena}
            type='password' 
            placeholder='Contraseña' 
            onChange={(e) => handleChange(e)}
            className={`${isError && 'border border-red-400'} p-2.5 border-b border-border-color outline-none`}/>
        <div className='flex flex-col gap-y-6'>
        <button type='submit'  className='bg-black text-white rounded-full p-2.5 font-inter '>Crear cuenta</button>
        <button className='flex gap-x-4 items-center justify-center p-2.5 font-inter rounded-full border-2 border-border-color font-medium'>
            <img src='https://img.freepik.com/iconos-gratis/buscar_318-265146.jpg' alt='google logo' width='24' height='24'/>
            Ingresar con Google
        </button>
        <button className='flex gap-x-4 items-center justify-center p-2.5 font-inter rounded-full border-2 border-border-color font-medium'>
            <img src='https://cdn.icon-icons.com/icons2/2972/PNG/512/facebook_logo_icon_186880.png' alt='facebook logo' width='24' height='24' />
            Ingresar con Facebook
        </button>
        </div>
    </form>
  )
}
