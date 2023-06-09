import { Ring } from "@uiball/loaders"
import { useCallback, useEffect, useState } from "react"
import { useUser } from "../hooks/useUser"
import { getRestaurant } from "../services"
import { NavBarUI } from "../components"
import { Link } from "react-router-dom"

export function Favorites() {

  const {load, user, setLoad} = useUser()
  const [favRestaurants, setFavRestaurants] = useState([])


  const getFavorites = useCallback(async () => {
    try {
      setLoad(true)
      const favs = user?.favoritos;
      if (favs) {
        const promises = favs.map(async (fav) => {
          const res = await getRestaurant(fav);
          return res;
        });
        const favRestaurants = await Promise.all(promises);
        setFavRestaurants(favRestaurants);
      }
      setLoad(false)
    } catch (error) {
      console.log(error)
      setLoad(false)

    }
  }, [setLoad, user?.favoritos])

  useEffect(() => {
    getFavorites()
  }, [getFavorites])



  if(load) return <div className="h-[90vh] flex justify-center items-center w-full"><Ring size={40} lineWeight={5} speed={2} color="black"/></div>


  if(!load && !favRestaurants.length) return (
    <>
      <NavBarUI />
      <main className="font-inter flex h-[80vh] flex-col items-center justify-center">
        <h2 className="text-3xl font-medium text-black font-montserrat mb-2">{user.nombre} <span className="text-black-light">usted no tiene favoritos</span></h2>
        <Link to='/' className="mb-4 block text-gray-400 text-sm hover:text-gray-600 hover:underline transition-all">Elije tus restaurantes preferidos</Link>
      </main>
    </>
  )


  return (
    <>
      <NavBarUI />
      <main className="font-inter px-10 lg:px-40 py-6 pb-20 lg:pb-6">
      <h2 className="text-3xl font-medium text-black font-montserrat mb-6">{user.nombre} <span className="text-black-light">estos son tus restaurantes <span className="text-red-400">favoritos</span></span></h2>
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-8 w-full">
          {
            favRestaurants.map(res => (
              <article key={res._id} className="flex flex-col gap-y-2 relative border shadow overflow-hidden rounded-lg">
                <img src={res.imagenes[0]} className="w-56 h-56 rounded-lg object-cover" alt={res.nombre}/>
               <div className="px-4 flex flex-col gap-y-1.5">
               <h3 className="text-base font-medium">{res.nombre}</h3>
                <p className="text-sm font-inter text-black-light">Reserva: <span className="text-subtitle font-medium">${res.costoReserva}</span></p>
                
                <p className="text-sm font-inter text-black-light">Correo: <span className="text-subtitle font-medium">{res.correo}</span></p>
               </div>
                <Link to={`/restaurant/${res._id}`} referrerPolicy="no-referrer" className="text-sm font-inter bg-black text-white p-1.5 rounded-lg px-2 hover:scale-[1.03] transition-transform">Ver mas detalles</Link>
              </article>
            ))
          }
        </section>
      </main>
    </>
  )
}
