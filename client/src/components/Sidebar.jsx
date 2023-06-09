import { Link } from "react-router-dom";
import close from '../assets/x.svg'
import { useAuth } from "../hooks";

export function Sidebar({isOpen, onOpen}) {

  const { isAuth } =  useAuth()
  return (
    <div className={`${isOpen ? 'right-0' : '-right-full' } bg-black h-screen fixed top-0 w-96 text-white font-inter z-50 lg:flex flex-col gap-y-4  py-20 transition-all duration-500 ease-in-out hidden`}>
        <button onClick={() => onOpen(false)} className="absolute top-4 left-4">
            <img src={close} alt="close svg icon" className="w-6 h-6  p-2 box-content rounded-full hover:bg-gray-200 transition-all"/>
        </button>

        <Link className='hover:bg-gray-200 hover:text-black transition-all py-1.5 px-6 ' to={`${!isAuth ? '/auth' : '/favorites'}`}>Favoritos</Link>
        <Link className='hover:bg-gray-200 hover:text-black transition-all py-1.5 px-6 ' to={`${!isAuth ? '/auth' : '/my-reserva'}`}>Mis Reservas</Link>
        <Link className='hover:bg-gray-200 hover:text-black transition-all py-1.5 px-6 ' to={`${!isAuth ? '/auth' : '/my-restaurant'}`}>Mis Restaurantes</Link>

    </div>
  )
}
