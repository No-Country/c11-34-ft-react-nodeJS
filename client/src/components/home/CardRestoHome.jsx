import {Link} from "react-router-dom";
import {Distance} from "../map/distanceRestaurant.jsx";
import location from '../../assets/location.svg'
import { useEffect, useState } from "react";
import {  getRestaurantCords } from "../../services";
import { Ring } from "@uiball/loaders";



export function CardRestoHome({_id, imagenes, nombre, costoReserva, direccion}) {

    const img = imagenes[0]
    const [cords, setCords] = useState({
        lon : '',
        lat : '',
    })
    const [load, setLoad] = useState(true)

    useEffect(() => {
        getRestaurantCords(direccion).then(res => {
            setLoad(true)
            setCords(res)
            setLoad(false)
        }).catch(() => setLoad(false))
    }, [direccion]) 


    return (
        <div className="flex flex-col items-center justify-center gap-2 bg-white py-5 rounded-lg relative" >
            <img src={img} alt={nombre} className='rounded-lg w-72 h-72 object-cover'/>
            <div className='flex flex-col justify-start mt-4 w-full gap-3'>
                <Link to={`/restaurant/${_id}`}>
                    <div>{nombre}</div>
                </Link>
                <div className='flex flex-row w-full items-center'>
                    <img src={location}/>
                    <div style={{color: '#BAC0C7'}}>
                        {
                            load ?  <Ring size={15} lineWeight={5} speed={2} color="black"/>
                            : 
                            <Distance
                            longitudeRestaurant={cords.lon}
                            latitudDestiRestaurant={cords.lat}/>
                        }
                    </div>
                </div>
                <div>$ {costoReserva} por persona</div>
            </div>

        </div>
    );
}