import { Link } from "react-router-dom";
import { Distance } from "../map/distanceRestaurant.jsx";
import location from '../../assets/location.svg'
import { useEffect, useState } from "react";
import { getRestaurantCoords } from "../../services/index.js";

export function CardRestoHome({_id, imagenes, nombre, costoReserva, direccion}) {
    const img = imagenes[0];
    const [latitudeRestaurant, setLatitudeRestaurant] = useState();
    const [longitudeRestaurant, setLongitudeRestaurant] = useState();
    console.log(direccion)

    useEffect(() => {
            getRestaurantCoords(direccion)
                .then((res) => {
                    setLatitudeRestaurant(res.lat);
                    setLongitudeRestaurant(res.lon);

                })
                .catch((error) => {
                    console.error(error);
                });

    }, []);

    return (
        <div className="flex flex-col items-center justify-center gap-2 bg-white py-5 rounded-lg" >
            <img src={img} alt={nombre} className='rounded-lg w-72 h-72 object-cover'/>
            <div className='flex flex-col justify-start mt-4 w-full gap-3'>
                <Link to={`/restaurant/${_id}`}>
                    <div>{nombre}</div>
                </Link>
                <div className='flex flex-row w-full items-center'>
                    <img src={location} alt="location" />
                    <div style={{ color: '#BAC0C7' }}>
                        <Distance
                            longitudeRestaurant={longitudeRestaurant}
                            latitudDestiRestaurant={latitudeRestaurant}
                        />
                    </div>
                </div>
                <div>$ {costoReserva} por persona</div>
            </div>
        </div>
    );
}

