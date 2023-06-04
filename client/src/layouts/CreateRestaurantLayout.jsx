import { Link, Outlet } from "react-router-dom";
import Logo from '../assets/logo.svg'

export function CreateRestaurantLayout() {
  return (
    <main className="flex h-screen justify-center items-center ">
        <Link to='/' className={'absolute lg:top-8 lg:left-8 top-4 left-4'}>
            <img src={Logo} alt={'Morfi Logo'}/>
        </Link>
        <Outlet />
    </main>
  )
}
