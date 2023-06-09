import { Link, Outlet, useNavigate } from "react-router-dom";
import Logo from '../assets/logo.svg'
import { useEffect } from "react";
import { useUser } from "../hooks";

export function CreateRestaurantLayout() {



  const {load, user} = useUser()
  const navigate = useNavigate()

  useEffect(() => {
   if(!load && !Object.values(user).length ) navigate('/auth')
  }, [user, navigate, load])

  return (
    <main className="flex h-screen justify-center items-center ">
        <Link to='/' className={'absolute lg:top-8 lg:left-8 top-4 left-4'}>
            <img src={Logo} alt={'Morfi Logo'}/>
        </Link>
        <Outlet />
    </main>
  )
}
