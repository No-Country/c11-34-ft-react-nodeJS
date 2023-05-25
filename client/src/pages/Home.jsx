import { Link } from "react-router-dom";
import { NavBar, SearchBar, Gallery, Categories } from '../components';

export function Home() {
  return (
    <main className="font-montserrat flex flex-col gap-y-4">

      <NavBar />
      <div className="flex flex-col gap-y-6 justify-center items-center lg:mt-12 px-5">
        <h1 className="lg:text-7xl font-black">Encontrá tu nuevo lugar favorito</h1>
        <p className="lg:text-xl hidden lg:block">Contamos con +500 restaurantes y bares asociados</p>
        <SearchBar />
        <Categories />
      </div>
      <div className="lg:mt-52 px-10">
        <div className="px-5 hidden lg:block font-black lg:text-xl">Cerca de vos</div>
        <Gallery/>
      </div>
     <Link to='/auth' className="bg-border-color w-60 rounded-xl px-4 py-2 m-4">Navegar Login</Link>
     <Link to='/auth/register' className="bg-border-color w-60 rounded-xl px-4 py-2 m-4">Register</Link>
     <Link to='/tastes' className="bg-border-color w-60 rounded-xl px-4 py-2 m-4">Gustos</Link>
    </main>
  )
}
