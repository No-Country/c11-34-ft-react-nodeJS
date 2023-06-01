import React from "react";
import {Link} from "react-router-dom";
import location from '../../assets/location.svg'
import {Distance} from "../map/distanceRestaurant.jsx";


export function CardRestoHome({id, img, title, priceRange, latitude, longitude}) {

    return (
        <div className="flex flex-col items-center justify-center gap-2 bg-white py-5 rounded-lg" key={id}>
            <img src={img} className='rounded-lg w-72 h-72 object-cover'/>
            <div className='flex flex-col justify-start mt-4 w-full gap-3'>
                <Link to={`/restaurant/${id}`}>
                    <div>{title}</div>
                </Link>
                <div className='flex flex-row w-full items-center'>
                    <img src={location}/>
                    <div style={{color: '#BAC0C7'}}>
                        <Distance
                            longitudeRestaurant={longitude}
                            latitudDestiRestaurant={latitude}/>
                    </div>
                </div>
                <div>$ {priceRange} por persona</div>
            </div>

        </div>
    );
}