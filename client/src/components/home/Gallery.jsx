import { Link } from "react-router-dom";
import { GalleryRow } from "..";
import { useRestaurants, useUser } from "../../hooks";


export function Gallery() {

  const { error, load, restaurants} = useRestaurants()
  const { user } = useUser()

  let matchTastes = restaurants?.restt?.filter(rest => {
    return rest?.tipoComida?.some(tipo => user?.gustos?.includes(tipo))
  })

  if(error) return <div className="w-full text-center"><p className="font-montserrat text-xl font-semibold">{error}</p></div>

  return (
          <div className="flex flex-col gap-4 lg:gap-y-16">
            <GalleryRow title={'Cerca de vos'} cards={restaurants?.restt} isLoad={load} />
            <GalleryRow title={'Mejor calificados'} cards={restaurants?.restt} isLoad={load}/>
            {
              Object.values(user).length && user?.gustos.length 
              ?
              <GalleryRow title={'Segun tu preferencia'} cards={matchTastes || restaurants?.restt} isLoad={load}/>
              : 
              <div className="w-full text-center flex flex-col gap-y-4">
                <p className="text-xl font-inter font-medium">No tienes ninguna preferencia de gustos</p>
                <Link className="font-inter text-subtitle hover:text-gray-600 hover:underline transition-all" to={`${Object.values(user).length ? '/tastes' : '/auth'}`}>Actualiza tus gustos</Link>
              </div>
            }
          </div>
      );
}