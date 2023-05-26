// eslint-disable-next-line no-unused-vars
import React from 'react';
import {NavBar} from "../NavBar.jsx";
import {galleryCards} from '../../utils';
import MapRestaurant from '../map/map.jsx'
import ReservationForm from './reservation.jsx'

const RestaurantDetail = () => {
    const url = window.location.href;
    const part = url.split('/');
    const idRestaurant = part[part.length - 1];
    let findRestaurantInfo = null;

    if (!isNaN(idRestaurant)) {
        const id = parseInt(idRestaurant)
        findRestaurantInfo = galleryCards.find(item => item.id === id)
        console.log(findRestaurantInfo)
    } else {
        console.error('No se encontró un número en la URL.');
    }
    let latitudeRestaurant = null;
    let longitudeRestaurant = null;

    if (findRestaurantInfo) {
        latitudeRestaurant = parseFloat(findRestaurantInfo.latitude);
        longitudeRestaurant = parseFloat(findRestaurantInfo.longitude);
    }
    console.log(latitudeRestaurant)
    console.log(longitudeRestaurant)

    return (

        <div>
            <NavBar/>

            <div
                className={'grid grid-cols-viewRestaurant grid-rows-viewRestaurant content-between justify-items-center items-center gap-2.5 mx-24 h-firstCardViewRestaurantGrid'}>
                <div className={'col-span-1 row-span-3 h-firstCardViewRestaurantGrid w-firstCardViewRestaurantGrid'}>
                    <img
                        className="rounded-3xl object-cover h-firstCardViewRestaurantGrid w-firstCardViewRestaurantGrid"
                        src={findRestaurantInfo.img}
                        alt={findRestaurantInfo.name}
                    />
                </div>
                <div className={'col-end-3 row-start-1 h-cardViewRestaurantGrid w-cardViewRestaurantGrid'}>
                    <img
                        className="rounded-3xl object-cover  h-cardViewRestaurantGrid w-cardViewRestaurantGrid"
                        src={findRestaurantInfo.img}
                        alt={findRestaurantInfo.name}
                    />
                </div>
                <div className={'col-end-3 row-start-2 h-cardViewRestaurantGrid w-cardViewRestaurantGrid'}>
                    <img
                        className="rounded-3xl object-cover h-cardViewRestaurantGrid w-cardViewRestaurantGrid"
                        src={findRestaurantInfo.img}
                        alt={findRestaurantInfo.name}/>
                </div>
                <div className={'col-end-3 row-start-3 h-cardViewRestaurantGrid w-cardViewRestaurantGrid'}>
                    <img
                        className="rounded-3xl object-cover h-cardViewRestaurantGrid w-cardViewRestaurantGrid"
                        src={findRestaurantInfo.img}
                        alt={findRestaurantInfo.name}/>
                </div>
            </div>

            <div className={'font-bold text-4xl mt-8 mx-24'}>
                <h1>{findRestaurantInfo.title}</h1>
            </div>
            <div className={' flex flex-row text-2xl mx-28 mb-32'}>
                <div className={'flex justify-center items-center mx-8'}>
                    <h3>{findRestaurantInfo.subtitle}</h3>
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
                    name={findRestaurantInfo.title}
                />
            </div>

        </div>
    );
};

export default RestaurantDetail;