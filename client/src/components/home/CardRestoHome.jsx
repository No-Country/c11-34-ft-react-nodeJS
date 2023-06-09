import { Link } from "react-router-dom";
import { Distance } from "../map/distanceRestaurant.jsx";
import location from '../../assets/location.svg'

export function CardRestoHome({rest}) {
    const img = rest?.imagenes[0];

    return (
        <div className="flex flex-col mt-4 items-center justify-center gap-2 bg-white  rounded-lg relative" >
            <img src={img} alt={rest?.nombre} className='rounded-lg w-[28rem] md:w-full h-60  md:h-72 object-cover'/>
            <div className='flex flex-col justify-start mt-4 w-full gap-3'>
                <Link to={`/restaurant/${rest?._id}`}>
                    <h4>{rest?.nombre}</h4>
                </Link>
                <div className='flex flex-row w-full items-center'>
                    <img src={location} alt="location" />
                    <div style={{ color: '#BAC0C7' }}>
                  
                    <Distance
                        longitudeRestaurant={rest?.cords?.lat}
                        latitudDestiRestaurant={rest?.cords?.lon}
                    />
                    
                    </div>
                </div>
                <p>$ {rest?.costoReserva} por persona</p>
            </div>
        </div>
    );
}

