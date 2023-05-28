import { Link } from "react-router-dom";
import {  SearchBar, Gallery, Categories, NavBarUI } from '../components';

export function Home() {

  return (
    <main className="font-montserrat flex flex-col gap-y-4">

      <NavBarUI />
      <div className="flex flex-col gap-y-6 justify-center items-center lg:mt-12 px-5">
        <h1 className="lg:text-7xl font-black">Encontrá tu nuevo lugar favorito</h1>
        <p className="lg:text-xl hidden lg:block">Contamos con +500 restaurantes y bares asociados</p>
        <SearchBar />
        <Categories />
      </div>
      <div className="lg:mt-52 lg:px-5 mt-20 px-10">
        <Gallery/>
      </div>
     <Link to='/auth' className="bg-border-color w-60 rounded-xl px-4 py-2 m-4">Navegar Login</Link>
     <Link to='/auth/register' className="bg-border-color w-60 rounded-xl px-4 py-2 m-4">Register</Link>
     <Link to='/tastes' className="bg-border-color w-60 rounded-xl px-4 py-2 m-4">Gustos</Link>

   
    </main>
  )
}
