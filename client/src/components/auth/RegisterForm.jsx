import { useState } from "react"
import { registerUser } from "../../services"
import { toast } from "react-hot-toast"
import { Ring } from "@uiball/loaders"
import { useNavigate } from "react-router-dom"

export function RegisterForm() {

    const [actions, setActions] = useState({
        error : false,
        loading : false
    })

    const navigate = useNavigate()

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
            setActions({...actions, loading : true})
            await registerUser(values)
            localStorage.setItem('correo', values.correo)
            toast.success('Bienvenido a Morfi')
            setActions({ loading : false , error : false})
            resetFields()
            navigate('/tastes')
        } catch (error) {
            const errorMessage = error.response.data.data.errors[0].msg
            toast.error(errorMessage)
            setActions({ loading : false , error : true})
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
            className={`${actions.error && 'border border-red-400'} p-2.5 border-b border-border-color outline-none`}/>
        <input 
            name='correo'
            value={values.correo}
            type='email' 
            placeholder='Email' 
            onChange={(e) => handleChange(e)}
            className={`${actions.error && 'border border-red-400'} p-2.5 border-b border-border-color outline-none`}/>
        <input 
            name='contrasena'
            value={values.contrasena}
            type='password' 
            placeholder='Contraseña' 
            onChange={(e) => handleChange(e)}
            className={`${actions.error && 'border border-red-400'} p-2.5 border-b border-border-color outline-none`}/>
        <div className='flex flex-col gap-y-6'>
        <button disabled={actions.loading} type='submit'  className='bg-black text-white rounded-full p-2.5 font-inter flex w-full justify-center'>
           {
                actions.loading 
                ? <Ring size={25} lineWeight={5} speed={2} color="white"/>
                : 'Crear Cuenta'
            } 
        </button>
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
