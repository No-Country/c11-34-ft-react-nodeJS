import logoDesktop from '../assets/logo-full.svg'
import hamburger from '../assets/hamburger.svg'
import userCircle from '../assets/user-circle.svg'
import logoMobile from '../assets/logo-mobile.svg'
import x from '../assets/x.svg'
import logoutIcon from '../assets/logout-svgrepo-com.svg'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth, useUser } from '../hooks'
import { Ring } from '@uiball/loaders'
export function NavBar({
  onNavbar, isOpenNavbar,  isDesktop, onDropdown, isOpenDrop
}) {

  const navigate = useNavigate()
  const { isAuth, logoutUser } = useAuth()
  const { load, user } = useUser()

  const toggleNavBar = () =>{
    if(!isDesktop){
      onNavbar()
    }
  }

  const toggleDropDown = () => {
    if(!isAuth) return navigate('/auth')
    onDropdown()
  }


  return (
    <header className="sticky top-0 z-20 bg-bg-color w-full justify-between flex items-center h-20 px-5 lg:px-24">
        <div className='hidden lg:block'>
          <Link to='/' ><img src={logoDesktop} alt='logo-header' className='w-20 h-8  lg:mb-0 dt:mb-6 '/></Link>
        </div>
        <div className='lg:hidden relative z-20'>
          <Link to='/' ><img src={logoMobile} alt='logo-header-mobile' className='w-20 h-8 mr-4'/></Link>
        </div>
        <div className="flex items-center gap-10">
            <p className='font-inter font-semibold text-sm whitespace-nowrap hidden lg:block'>Registrá tu restaurante</p>
            <div className='flex items-center gap-x-6 relative z-20 text-white px-2 lg:px-4 py-2 rounded-3xl border-2 border-border-color '>
              <button onClick={toggleNavBar} className=''>
                <img src={isOpenNavbar ? x : hamburger} alt='hamburger-icon' className='w-8 h-6 lg:w-6 lg:h-6 icon-color'/>
              </button>

              <button onClick={toggleDropDown}  className="hidden lg:block">
                  {
                    load  ? <Ring size={25} lineWeight={5} speed={2} color="black"/>
                    :   <img src={user.imagen ? user.imagen : userCircle} alt='user-circle-icon' className='w-8 rounded-full h-8  text-icon-color'/>
                  }
              </button>
              <div className={`${!isOpenDrop && 'hidden'}  z-40 absolute transition-opacity -bottom-40 left-2 text-black bg-white shadow-md flex flex-col gap-y-1 text-sm font-inter whitespace-nowrap border rounded-lg after:w-0 after:h-0 after:border-r-8 after:border-r-transparent after:border-t-8 after:border-t-transparent after:border-l-8 after:border-l-transparent after:border-b-8 after:border-b-gray-300 after:absolute after:-top-4 after:-translate-x-1/2 after:left-1/2 `}>
                <Link className='hover:bg-gray-300/50 transition-all py-1.5 px-4 ' to='/my-perfil'>Ver perfil</Link>
                <Link className='hover:bg-gray-300/50 transition-all py-1.5 px-4 ' to='/my-perfil'>Favoritos</Link>
                <Link className='hover:bg-gray-300/50 transition-all py-1.5 px-4 ' to='/my-perfil'>Reservas</Link>
                <button className='flex items-center gap-x-2  hover:bg-gray-300/50 transition-all py-1.5 px-4 font-medium mr-4' onClick={logoutUser}>Cerrar sesión <img src={logoutIcon} alt='icon logout' className='w-4 h-4'/></button>
              </div>

            </div>
        </div>
    </header>
  )
}