import { Link } from "react-router-dom";
import { Distance } from "../map/distanceRestaurant.jsx";
import { useEffect, useState } from "react";
import { getRestaurantCoords } from "../../services/index.js";
import { Ring } from "@uiball/loaders";
import location from '../../assets/location.svg'

export function CardRestoHome({_id, imagenes, nombre, costoReserva, direccion}) {
    const img = imagenes[0];
    const [load, setLoad] = useState(true)
    const [cords, setCords] = useState({
        lat: '',
        lon : ''
    })

    useEffect(() => {
            getRestaurantCoords(direccion)
                .then((res) => {
                    setLoad(true)
                    setCords(res)
                    setLoad(false)
                })
                .catch((error) => {
                    console.error(error);
                    setLoad(false)
                });

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="flex flex-col mt-4 items-center justify-center gap-2 bg-white  rounded-lg relative" >
            <img src={img} alt={nombre} className='rounded-lg w-[28rem] md:w-full h-60  md:h-72 object-cover'/>
            <div className='flex flex-col justify-start mt-4 w-full gap-3'>
                <Link to={`/restaurant/${_id}`}>
                    <div>{nombre}</div>
                </Link>
                <div className='flex flex-row w-full items-center'>
                    <img src={location} alt="location" />
                    <div style={{ color: '#BAC0C7' }}>
                    {
                        load ? <Ring size={15} lineWeight={5} speed={2} color="black"/>
                        : <Distance
                            longitudeRestaurant={cords.lat}
                            latitudDestiRestaurant={cords.lon}
                        />
                    }
                    </div>
                </div>
                <div>$ {costoReserva} por persona</div>
            </div>
        </div>
    );
}

