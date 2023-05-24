import { Link } from "react-router-dom";
import { NavBar, SearchBar, Gallery } from '../components';

export function Home() {
  return (
    <main className="font-montserrat flex flex-col gap-y-4">

      <NavBar />
      <div className="flex flex-col gap-y-6 justify-center items-center lg:mt-12 px-5">
        <h1 className="lg:text-6xl font-black">Encontrá tu nuevo lugar favorito</h1>
        <p className="lg:text-xl hidden lg:block">Contamos con +500 restaurantes y bares asociados</p>
        <SearchBar />
      </div>
      <div className="lg:mt-52">
        <div className="px-5 hidden lg:block font-black">Cerca de ti</div>
        <Gallery/>
      </div>
     <Link to='/auth' className="bg-border-color w-60 rounded-xl px-4 py-2 m-4">Navegar Login</Link>
     <Link to='/auth/register' className="bg-border-color w-60 rounded-xl px-4 py-2 m-4">Register</Link>
    </main>
  )
}
