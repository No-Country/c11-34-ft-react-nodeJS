import location from '../assets/location.svg'
import { galleryCards } from '../utils';

export function Gallery() {

    return (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 justify-center items-center">
          {galleryCards.map((card) => (
            <div className="flex flex-col items-center justify-center gap-2 bg-white p-5 rounded-lg" key={card.id}>
              <img src={card.img} className='rounded-lg w-72 h-72 object-cover' />
              <div className='flex flex-col justify-start mt-4 w-full gap-3'>
                <div>{card.title}</div>
                <div className='flex flex-row w-full items-center'>
                    <img src={location}/>
                    <div style={{color:'#BAC0C7'}}>{card.distance}</div>
                </div>
                <div>$ {card.priceRange} por persona</div>
              </div>
 
            </div>
          ))}
        </div>
      );
}