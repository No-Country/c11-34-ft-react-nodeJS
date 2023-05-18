import { Link } from "react-router-dom";
import { RegisterForm } from "../components";
import placeholder from '../assets/Vector.svg'

export function Register() {
    return (
      <>
        {/* Logo */}
          <div className='flex gap-x-2 items-center mb-6 lg:mb-8'>
            <img src={placeholder} alt='placeholder' className='bg-[#EFEFF0] p-2 box-content rounded-full '/>
            <h2 className=' text-lg lg:text-base font-medium'>Morfi.</h2>
          </div>

          <h1 className='text-2xl lg:text-3xl font-semibold mb-2 whitespace-nowrap'>Crear cuenta</h1>
          <p className='text-[#BAC0C7] w-80 lg:w-96 mb-8'>Reserva y disfruta en restaurantes con tu cuenta personalizada.</p>

          <RegisterForm />

          <p className='text-[#BAC0C7]  text-sm text-center'>Ya tienes una cuenta? <Link to='/auth' className='text-black font-medium underline text-sm'>Iniciar Sesión</Link></p>
      </>
    
   );
}
