import logoDesktop from '../assets/logo-full.svg'
import hamburger from '../assets/hamburger.svg'
import userCircle from '../assets/user-circle.svg'
import logoMobile from '../assets/logo-mobile.svg'
import x from '../assets/x.svg'
import { Link } from 'react-router-dom'


export function NavBar({openNavBar, setOpenNavBar, isDesktop}) {

  const toggleNavBar = () =>{
    if(!isDesktop){
      setOpenNavBar(!openNavBar)
    }
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
            <button onClick={toggleNavBar} className="flex items-center gap-1 relative z-20 text-white px-2 lg:px-4 py-2 rounded-3xl border-2 border-border-color transition ease-in-out duration-700 hover:bg-bg-hover">
                <img src={openNavBar ? x : hamburger} alt='hamburger-icon' className='w-8 h-6 lg:w-6 lg:h-6 icon-color'/>
                <img src={userCircle} alt='user-circle-icon' className='w-10 h-8 hidden lg:block text-icon-color'/>
            </button>
        </div>
    </header>
  )
}