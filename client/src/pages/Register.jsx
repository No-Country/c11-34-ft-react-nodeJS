import { Link } from "react-router-dom";
import { RegisterForm } from "../components";
import placeholder from '../assets/logo.svg'

export function Register() {
    return (
      <>
        {/* Logo */}
          <img src={placeholder} alt='placeholder' className='w-20 h-16 lg:mb-0 dt:mb-6 '/>

          <h1 className='text-2xl lg:text-3xl  mb-2 whitespace-nowrap font-semibold'>Crear cuenta</h1>
          <p className='text-subtitle w-80 lg:w-80 mb-8 font-inter text-sm font-normal'>Reserva y disfruta en restaurantes con tu cuenta personalizada.</p>

          <RegisterForm />

          <p className='text-subtitle  text-sm text-center font-inter'>Ya tienes una cuenta? <Link to='/auth' className='text-black font-medium underline text-sm'>Iniciar Sesión</Link></p>
      </>
    
   );
}
