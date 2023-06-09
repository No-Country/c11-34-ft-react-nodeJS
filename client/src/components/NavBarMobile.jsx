import { Link } from 'react-router-dom'
import { useAuth } from '../hooks'

export function NavBarMobile({isOpen, setOpenNavBar}) {

  
  const { isAuth, logoutUser } = useAuth()


  const handleClick = () => {
    setOpenNavBar(false)
  }


  return (
    <div className={`${isOpen ? 'top-0' : '-top-full'} fixed  left-0 w-full h-screen bg-bg-color z-10 flex flex-col justify-between items-center py-24 px-10 transition-all duration-[400ms]`}>
        <div className="flex flex-col gap-8 justify-between w-full font-inter">
            <Link to='/'>
              <button onClick={handleClick}>
                Inicio
              </button>  
            </Link>
            <Link to='/my-perfil' className={`${isAuth ? 'block' :'hidden' }`}>
              <button onClick={handleClick}>
                 Ver perfil
              </button>
            </Link>
            <Link to='/my-restaurant' className={`${isAuth ? 'block' :'hidden' }`}>
              <button onClick={handleClick}>Mis restaurantes</button>
            </Link>
            <Link>
              <button onClick={handleClick}>Registra tu restaurante</button>
            </Link>
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