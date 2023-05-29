// eslint-disable-next-line no-unused-vars
import React, {useEffect, useState} from "react";
import {NavBar} from "../components";
import {galleryCards} from "../utils";
import {useParams} from "react-router-dom";
import ReservationForm from "../components/reservation/reservation.jsx";
import MapRestaurant from "../components/map/map.jsx";

export function Restaurant() {
    const {id} = useParams()

    const [restaurant, setRestaurant] = useState({})

    const getRestaurant = (id) => {
        return galleryCards.find(gallery => gallery.id === Number(id))
    }

    useEffect(() => {
        if (id) setRestaurant(getRestaurant(id))

    }, [id])
    let latitudeRestaurant = parseFloat(getRestaurant(id).latitude);
    let longitudeRestaurant = parseFloat(getRestaurant(id).longitude)
    return (

        <div>
            <NavBar/>

            <div
                className={'grid grid-cols-viewRestaurant grid-rows-viewRestaurant content-between justify-items-center items-center gap-2.5 mx-auto h-firstCardViewRestaurantGrid'}>
                <div className={'col-span-1 row-span-3 h-firstCardViewRestaurantGrid w-firstCardViewRestaurantGrid'}>
                    <img
                        className="rounded-3xl object-cover h-firstCardViewRestaurantGrid w-firstCardViewRestaurantGrid"
                        src={restaurant.img}
                        alt={restaurant.name}
                    />
                </div>
                <div className={'col-end-3 row-start-1 h-cardViewRestaurantGrid w-cardViewRestaurantGrid'}>
                    <img
                        className="rounded-3xl object-cover  h-cardViewRestaurantGrid w-cardViewRestaurantGrid"
                        src={restaurant.img}
                        alt={restaurant.name}
                    />
                </div>
                <div className={'col-end-3 row-start-2 h-cardViewRestaurantGrid w-cardViewRestaurantGrid'}>
                    <img
                        className="rounded-3xl object-cover h-cardViewRestaurantGrid w-cardViewRestaurantGrid"
                        src={restaurant.img}
                        alt={restaurant.name}/>
                </div>
                <div className={'col-end-3 row-start-3 h-cardViewRestaurantGrid w-cardViewRestaurantGrid'}>
                    <img
                        className="rounded-3xl object-cover h-cardViewRestaurantGrid w-cardViewRestaurantGrid"
                        src={restaurant.img}
                        alt={restaurant.name}/>
                </div>
            </div>

            <div className={'font-bold text-4xl mt-8 mx-24'}>
                <h1>{restaurant.title}</h1>
            </div>
            <div className={' flex flex-row text-2xl mx-28 mb-32'}>
                <div className={'flex justify-center items-center mx-8'}>
                    <h3>{restaurant.subtitle}</h3>

                </div>
                <div className={'w-reservationForm h-reservationForm'}>
                    <ReservationForm/>
                </div>
            </div>
            <div className={'flex justify-center items-center h-5/6 w-5/6 mb-8 mx-auto'}>
                <MapRestaurant
                    className={'text-black'}
                    latitude={latitudeRestaurant}
                    longitude={longitudeRestaurant}
                    name={restaurant.title}
                    height="h-mapViewRestaurant"
                    width="w-mapViewRestaurant"
                />
            </div>

        </div>
    );
}
