// eslint-disable-next-line no-unused-vars
import React, {useEffect, useState} from "react";
import { NavBarUI } from "../components";
import {galleryCards} from "../utils";
import {useParams} from "react-router-dom";
import ReservationForm from "../components/reservation/reservation.jsx";
import MapRestaurant from "../components/map/map.jsx";
import {Selector} from "../components/Selector";
import calendar from '../assets/calendar.svg';
import clock from '../assets/clock.svg';
import user from '../assets/user.svg';

export function Restaurant() {
    const {id} = useParams();

    const [restaurant, setRestaurant] = useState({});

    const getRestaurant = (id) => {
        return galleryCards.find(gallery => gallery.id === Number(id));
    }

    useEffect(() => {
        if (id) setRestaurant(getRestaurant(id));

    }, [id])
    let latitudeRestaurant = parseFloat(getRestaurant(id).latitude);
    let longitudeRestaurant = parseFloat(getRestaurant(id).longitude);
    let openRestaurant = (getRestaurant(id).serviceActive);

    return (

        <div>
            <NavBarUI/>
            <div className={'font-bold text-xl mt-8 mb-2 m-auto w-80'}>
                <h1>{restaurant.title}</h1>
            </div>
            <div
                className={'lg:grid grid-cols-viewRestaurant grid-rows-viewRestaurant justify-center content-between items-center gap-2.5 lg:h-firstCardViewRestaurantGrid'}>
                <div className={'flex justify-center col-span-1 row-span-3 lg:h-firstCardViewRestaurantGrid lg:w-firstCardViewRestaurantGrid'}>
                    <img
                        className="rounded-3xl object-cover w-80 h-80 lg:h-firstCardViewRestaurantGrid lg:w-firstCardViewRestaurantGrid"
                        src={restaurant.img}
                        alt={restaurant.name}
                    />
                </div>
                <div className={'hidden lg:block col-end-3 row-start-1 h-cardViewRestaurantGrid w-cardViewRestaurantGrid'}>
                    <img
                        className="rounded-3xl object-cover  h-cardViewRestaurantGrid w-cardViewRestaurantGrid"
                        src={restaurant.img}
                        alt={restaurant.name}
                    />
                </div>
                <div className={'hidden lg:block col-end-3 row-start-2 h-cardViewRestaurantGrid w-cardViewRestaurantGrid'}>
                    <img
                        className="rounded-3xl object-cover h-cardViewRestaurantGrid w-cardViewRestaurantGrid"
                        src={restaurant.img}
                        alt={restaurant.name}/>
                </div>
                <div className={'hidden lg:block col-end-3 row-start-3 h-cardViewRestaurantGrid w-cardViewRestaurantGrid'}>
                    <img
                        className="rounded-3xl object-cover h-cardViewRestaurantGrid w-cardViewRestaurantGrid"
                        src={restaurant.img}
                        alt={restaurant.name}/>
                </div>
            </div>

      
            <div className={' flex flex-col items-center mt-2 lg:flex-row text-2xl lg:mx-28 lg:mb-32'}>
                <div className={'flex justify-center text-sm w-80 items-center lg:mx-8'}>
                    <h3>{restaurant.subtitle}</h3>
                </div>
                <div className={'lg:w-reservationForm lg:h-reservationForm m-auto mt-4'}>
                    <ReservationForm days={openRestaurant}/>
                </div>
            </div>
            <div className={'hidden lg:flex justify-center items-center h-5/6 w-5/6 mb-8 mx-auto'}>
                <MapRestaurant
                    className={'text-black'}
                    latitude={latitudeRestaurant}
                    longitude={longitudeRestaurant}
                    name={restaurant.title}
                    height="h-mapViewRestaurant"
                    width="w-mapViewRestaurant"
                />
            </div>
            <div className={'flex flex-col items-center justify-start text-base mt-8 mb-24 m-auto gap-3 w-80'} >
                <div className="w-full">
                    <h1 className="font-bold">Tipo de comida</h1>
                    <p>{restaurant.foodType}</p>
                </div>
                <div className="w-full">
                    <h1 className="font-bold">Caracteristicas</h1>
                    {restaurant.description?.map((item, index) => <p key={index}>{item}</p>)}
                </div>
            </div>
        </div>
    );
}
