import { GalleryRow } from "..";
import { useRestaurants } from "../../hooks";


export function Gallery() {

  const { error, load, restaurants} = useRestaurants()

  if(error) return <div className="w-full text-center"><p className="font-montserrat text-xl font-semibold">{error}</p></div>

  return (
          <div className="flex flex-col gap-10">
            <GalleryRow title={'Cerca de vos'} cards={restaurants?.restt} isLoad={load} />
            <GalleryRow title={'Mejor calificados'} cards={restaurants?.restt} isLoad={load}/>
            <GalleryRow title={'Recomendaciones'} cards={restaurants?.restt} isLoad={load}/>
          </div>
      );
}