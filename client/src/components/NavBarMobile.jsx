import { Link } from 'react-router-dom'
import { useAuth } from '../hooks'

export function NavBarMobile({isOpen}) {

  
  const { isAuth, logoutUser } = useAuth()


  return (
    <div className={`${isOpen ? 'top-0' : '-top-full'} fixed  left-0 w-full h-screen bg-bg-color z-10 flex flex-col justify-between items-center py-24 px-10 transition-all duration-[400ms]`}>
        <div className="flex flex-col gap-8 justify-between w-full font-inter">
            <Link to='/'>Inicio</Link>
            <Link to='/my-perfil' className={`${isAuth ? 'block' :'hidden' }`}>Ver perfil</Link>
            <Link to='/my-restaurant' className={`${isAuth ? 'block' :'hidden' }`}>Mis restaurantes</Link>
            <Link>Registra tu restaurante</Link>
        </div>
        <div className='w-full'>
           {isAuth ? 
           <button onClick={logoutUser} className="whitespace-nowrap w-full h-12 rounded-lg bg-bg-dark text-letter-color">
                Cerrar sesión
            </button>
            : 
            <Link to='/auth'  className="whitespace-nowrap h-12 text-center flex justify-center items-center rounded-lg bg-bg-dark text-letter-color">
                Iniciar sesión
            </Link>
          }
            
        </div>
    </div>
  )
}