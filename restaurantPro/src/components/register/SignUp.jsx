import { Link } from "react-router-dom";
import { RegisterForm } from "../RegisterForm";
import placeholder from '../../assets/Image.svg'

export default function SignUp() {
  return (
    <main className="grid grid-cols-1 lg:grid-cols-8 xl:grid-cols-12 py-8  lg:px-6 min-h-screen ">

    {/* Background Section */}
      <section className="hidden lg:col-span-6 xl:col-span-8 bg-[#EFEFF0] rounded-3xl h-full lg:flex justify-between items-end px-12 py-16 relative ">

      {/* Info */}
        <div className=''>
          <h2 className='text-2xl font-medium'>Lorem ipsum</h2>
          <p className='text-lg w-96 font-medium'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas vel sint commodi aut</p>
        </div>

        {/* Buttons Slide */}
        <div className='flex gap-x-4 items-center'>
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className='bg-white p-1 rounded-full'><path d="M15 4l-8 8 8 8"/></svg>       
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className='bg-white p-1 rounded-full'><path d="M8 4l8 8-8 8"/></svg>
        </div>

        {/* Placeholder svg */}
        <div className='absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2'>
          <img src={placeholder} alt='placeholder'/>
        </div>
        {/* Placeholder svg */}
        <div className='absolute top-12 left-12 opacity-60'>
          <img src={placeholder} alt='placeholder'/>
        </div>
      </section>

    {/* Form Section   */}
      <section className="col-span-1 lg:col-span-2 xl:col-span-4 h-full flex flex-col w-full justify-center px-6 lg:px-16 ">

        {/* Logo */}
        <div className='flex gap-x-2 items-center mb-6 lg:mb-8'>
          <img src={placeholder} alt='placeholder' className='bg-[#EFEFF0] p-2  opacity-60 rounded-full hidden lg:block'/>
          <h2 className=' text-lg lg:text-base font-medium'>Morfi.</h2>
        </div>

        <h1 className='text-2xl lg:text-3xl font-semibold mb-2 whitespace-nowrap'>Crear cuenta</h1>
        <p className='text-[#BAC0C7] w-80 lg:w-96 mb-8'>Reserva y disfruta en restaurantes con tu cuenta personalizada.</p>

       <RegisterForm />

  
        <p className='text-[#BAC0C7]  text-sm text-center'>Ya tienes una cuenta? <Link to='/signin' className='text-black font-medium underline text-sm'>Iniciar Sesión</Link></p>

      </section>

    </main>
  );
}
