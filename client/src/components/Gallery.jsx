import { GalleryRow } from "../components";
import { galleryCards } from '../utils';


export function Gallery() {

    return (
          <div className="flex flex-col gap-10">
            <GalleryRow cards={galleryCards}/>
            <GalleryRow cards={galleryCards}/>
            <GalleryRow cards={galleryCards}/>
          </div>
      );
}