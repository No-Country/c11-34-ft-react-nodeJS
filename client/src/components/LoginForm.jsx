import { useState } from "react"
import { loginUser } from "../services"
import { toast } from "react-hot-toast"
export  function LoginForm() {


const [dataLogin, setDataLogin] = useState({
    nombre : '',
    contrasena : ''
})


function handleChange (e) { setDataLogin({
    ...dataLogin,
    [e.target.name] : e.target.value}) }


async function handleSubmit (event) {
    event.preventDefault()
    try {
        const res = await loginUser(dataLogin)
        toast.success(res.mensaje)
    } catch (error) {
        const errorMessage = error.response.data.mensaje
        toast.error(errorMessage)
    }
}


return (
<form onSubmit={handleSubmit} className='flex  flex-col gap-y-6 mb-8 '>
    <input 
        name='nombre'
        type='text' 
        placeholder='Email' 
        onChange={(e) => handleChange(e)}
        className='p-2.5 border-b border-border-color outline-none'/>
    <input 
        name='contrasena'
        type='password' 
        placeholder='Contraseña' 
        onChange={(e) => handleChange(e)}
        className='p-2.5 border-b border-border-color outline-none'/>
    <div className='flex flex-col gap-y-6'>
    <button type='submit' className='bg-black text-white rounded-full p-2.5 font-inter '>Iniciar Sesion</button>
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
