import { useState } from "react"
import { loginUser } from "../../services"
import { toast } from "react-hot-toast"
import { LoginGoogleButton } from "./LoginGoogleButton"
import { Ring } from "@uiball/loaders"
export  function LoginForm() {



const [actions, setActions] = useState({
        error : false,
        loading : false
})

const [dataLogin, setDataLogin] = useState({
    correo : '',
    contrasena : ''
})


function handleChange (e) { setDataLogin({
    ...dataLogin,
    [e.target.name] : e.target.value}) }


async function handleSubmit (event) {
    event.preventDefault()
    try {
        setActions({...actions, loading : true})
        const res = await loginUser(dataLogin)
        toast.success(res.data.mensaje)
        setActions({ loading : false , error : false})
    } catch (error) {
        const errorMessage = 'La contraseña o el correo son incorrectas'
        toast.error(errorMessage)
        setActions({ loading : false , error : true})
    }
}


return (
<form onSubmit={handleSubmit} className='flex  flex-col gap-y-6 mb-8 '>
    <input 
        name='correo'
        required
        type='text' 
        placeholder='Email' 
        onChange={(e) => handleChange(e)}
        
        className={`${actions.error && 'border border-red-400'} p-2.5 border-b border-border-color outline-none`}/>
    <input 
        name='contrasena'
        required
        type='password' 
        placeholder='Contraseña' 
        onChange={(e) => handleChange(e)}
        className={`${actions.error && 'border border-red-400'} p-2.5 border-b border-border-color outline-none`}/>
    <div className='flex flex-col gap-y-6'>
        <button disabled={actions.loading} type='submit'  className='bg-black text-white rounded-full p-2.5 font-inter flex w-full justify-center'>
            {
                actions.loading 
                ? <Ring size={25} lineWeight={5} speed={2} color="white"/>
                : 'Ingresar'
            } 
        </button>
        <LoginGoogleButton />
        <button className='flex gap-x-4 items-center justify-center p-2.5 font-inter rounded-full border-2 border-border-color font-medium'>
            <img src='https://cdn.icon-icons.com/icons2/2972/PNG/512/facebook_logo_icon_186880.png' alt='facebook logo' width='24' height='24' />
            Ingresar con Facebook
        </button>
    </div>
</form>
)
}
