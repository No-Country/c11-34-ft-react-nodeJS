import React from 'react'
import { NavBar } from './NavBar';
import { NavBarMobile } from './NavBarMobile';
import { NavBarBottom } from './NavBarBottom';

export function NavBarUI() {

    const initialState = window.innerWidth < 768 ? false : true;
    const [isDesktop, setIsDesktop] = React.useState(initialState);
    const [openNavBar, setOpenNavBar] = React.useState(false);
    const [openDropdown, setOpenDropdawn] = React.useState(false)


    const handleChangeNavbar = () =>{ 
        setOpenNavBar(prev => !prev)
        setOpenDropdawn(false)
    }

    const handleChangeDrop = () => {
      setOpenDropdawn(prev => !prev)
      setOpenNavBar(false)
    }


    React.useEffect(() => {
      function handleResize() {
      if (window.innerWidth < 768) {
          setIsDesktop(false);
      } else {
          setIsDesktop(true);
      }
      }
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <NavBar 
        isOpenNavbar={openNavBar} 
        isOpenDrop={openDropdown}
        onDropdown={handleChangeDrop} 
        onNavbar={handleChangeNavbar} 
        isDesktop={isDesktop}/>
      
    {
      !isDesktop && (
        <NavBarMobile isOpen={openNavBar}/>
      )
    }
    {
      !isDesktop && (
        <NavBarBottom />
      )
    }

    </>
  )
}
