import { GalleryRow } from "../components";
import { galleryCards } from '../utils';


export function Gallery({restos}) {

    return (
          <div className="flex flex-col gap-10">
            <GalleryRow title={'Cerca de vos'} cards={restos}/>
            <GalleryRow title={'Mejor calificados'} cards={galleryCards}/>
            <GalleryRow title={'Recomendaciones'} cards={galleryCards}/>
          </div>
      );
}