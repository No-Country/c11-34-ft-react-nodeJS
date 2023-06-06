import { useEffect, useState } from "react";
import { NavBarUI } from "../components/NavBarUI";
import { useUser } from "../hooks";
import { getRestaurantByEmail } from "../services";
import { Link, useNavigate } from "react-router-dom";
import { Ring } from "@uiball/loaders";
export function MyRestaurant() {

  const {user, load} = useUser()
  const [restaurants, setRestaurants] = useState([])

  const navigate = useNavigate()

  useEffect(() => {
    getRestaurantByEmail(user.correo).then(res => setRestaurants(res?.restt))
    .catch(() => setRestaurants([]))
  }, [user.correo])

  useEffect(() => {
    if(!load && !Object.values(user).length ) navigate('/auth')
   }, [user, navigate, load])

  if(load) return <div className="h-[90vh] flex justify-center items-center w-full"><Ring size={40} lineWeight={5} speed={2} color="black"/></div>


  if(!load && !restaurants.length) return (
    <>
      <NavBarUI />
      <main className="font-inter flex h-[80vh] flex-col items-center justify-center">
        <h2 className="text-3xl font-medium text-black font-montserrat mb-2">{user.nombre} <span className="text-black-light">usted no tiene restaurantes</span></h2>
        <Link to='/create-restaurant' className="mb-4 block text-gray-400 text-sm hover:text-gray-600 hover:underline transition-all">Registrar uno aqui</Link>
      </main>
    </>
  )

  return (
    <>
      <NavBarUI />
      <main className="font-inter px-40 py-6">
        <h2 className="text-3xl font-medium text-black font-montserrat mb-2">{user.nombre} <span className="text-black-light">estos son tus restaurantes</span></h2>
        <Link to='/create-restaurant' className="mb-4 block text-gray-400 text-sm hover:text-gray-600 hover:underline transition-all">Registrar otro restaurante</Link>
        <section className="grid grid-cols-4 gap-8 w-full">
          {
            restaurants.map(res => (
              <article key={res._id} className="flex flex-col gap-y-2 relative">
                <img src={res.imagenes[0]} className="w-56 h-56 rounded-lg object-cover" alt={res.nombre}/>
                <h3 className="text-base font-medium">{res.nombre}</h3>
                <p className="text-sm font-inter text-black-light">Reserva: <span className="text-subtitle font-medium">${res.costoReserva}</span></p>
                <p className="text-sm font-inter text-black-light">Mesas: <span className="text-subtitle font-medium">{res.mesas}</span></p>
                <p className="text-sm font-inter text-black-light">Turnos: <span className="text-subtitle font-medium">{res.turnos}</span></p>
                <p className="text-sm font-inter text-black-light">Telefono: <span className="text-subtitle font-medium">{res.telefono}</span></p>
                <p className="text-sm font-inter text-black-light">Correo: <span className="text-subtitle font-medium">{res.correo}</span></p>
                <Link to={`/restaurant/${res._id}`} referrerPolicy="no-referrer" className="text-sm font-inter bg-black text-white p-1.5">Ver mas detalles</Link>
              </article>
            ))
          }
        </section>
      </main>
    </>
  )
}
