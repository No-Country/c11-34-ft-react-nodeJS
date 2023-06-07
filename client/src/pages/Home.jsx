import {  SearchBar, Gallery, NavBarUI } from '../components';

export function Home() {

  return (
    <main className="font-montserrat flex flex-col gap-y-4">

      <NavBarUI/>
      <div className="flex flex-col gap-y-1 justify-center items-center lg:mt-12 px-5">
        <h1 className="lg:text-7xl text-2xl text-center font-black mb-4">Encontrá tu nuevo lugar favorito</h1>
        <p className="lg:text-xl hidden lg:block mb-4">Contamos con +500 restaurantes y bares asociados</p>
        <SearchBar/>
      </div>
      <div className="lg:mt-52 lg:px-5 mt-20 px-10">
        <Gallery />
      </div>
    </main>
  )
}
