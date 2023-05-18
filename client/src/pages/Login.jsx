import { Link } from 'react-router-dom'
import { LoginForm } from '../components'
import placeholder from '../assets/Vector.svg'

export function Login() {
  return (
    <>
    {/* Logo */}
      <div className='flex gap-x-2 items-center mb-6 lg:mb-8'>
        <img src={placeholder} alt='placeholder' className='bg-[#EFEFF0] p-2 box-content rounded-full '/>
        <h2 className=' text-lg lg:text-base font-medium'>Morfi.</h2>
      </div>

      <h1 className='text-2xl lg:text-3xl font-semibold mb-2 whitespace-nowrap'>Iniciar Sesion</h1>
      <p className='text-[#BAC0C7] w-80 lg:w-96 mb-8'>¡Hola de vuelta! Ingresa para continuar tu experiencia</p>

      <LoginForm />

      <p className='text-[#BAC0C7]  text-sm text-center'>Nuevo en Morfi? <Link to='/auth/register' className='text-black font-medium underline text-sm'>Crear una cuenta</Link></p>
  </>
  )
}
