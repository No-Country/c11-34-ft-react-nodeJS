import { Link } from 'react-router-dom'
import { LoginForm } from '../components'
import placeholder from '../assets/logo.svg'

export function Login() {
  return (
    <>
    {/* Logo */}
      <img src={placeholder} alt='placeholder' className='w-20 h-16 lg:mb-0 dt:mb-6 '/>

      <h1 className='text-2xl lg:text-3xl  mb-2 whitespace-nowrap font-semibold'>Iniciar Sesion</h1>
      <p className='text-[#BAC0C7] w-80 lg:w-80 mb-8 font-inter text-sm font-normal'>¡Hola de vuelta! Ingresa para continuar tu experiencia</p>

      <LoginForm />

      <p className='text-[#BAC0C7]  text-sm text-center font-inter'>Nuevo en Morfi? <Link to='/auth/register' className='text-black font-medium underline text-sm'>Crear una cuenta</Link></p>
  </>
  )
}
