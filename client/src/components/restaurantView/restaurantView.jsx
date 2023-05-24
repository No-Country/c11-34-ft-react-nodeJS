// eslint-disable-next-line no-unused-vars
import React from 'react';
import {NavBar} from "../NavBar.jsx";
import {galleryCards} from '../../utils';

const restaurantDetail = () => {
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


    return (

        <div>
            <NavBar/>
            <div className={'grid grid-cols-3 grid-rows-2 gap-3 mx-24 my-3'}>
                <div className={'col-span-2 row-span-4 h-925 w-615'}>
                    <img className="rounded-3xl object-fill h-925 w-615" src={findRestaurantInfo.img}
                         alt={findRestaurantInfo.name}/>
                </div>
                <div className={'col-end-4 row-start-1'}>
                    <img className="rounded-3xl object-fill " src={findRestaurantInfo.img}
                         alt={findRestaurantInfo.name}/>
                </div>
                <div className={'col-end-4 row-start-2'}>
                    <img className="rounded-3xl object-fill " src={findRestaurantInfo.img}
                         alt={findRestaurantInfo.name}/>
                </div>
                {/*<div className={'col-end-4 row-start-3'}>*/}
                {/*    <img className="rounded-3xl object-fill " src={findRestaurantInfo.img}*/}
                {/*         alt={findRestaurantInfo.name}/>*/}
                {/*</div>*/}
            </div>

            <div className={'font-bold text-4xl mx-24'}>
                <h1>{findRestaurantInfo.title}</h1>
            </div>
            <div className={'text-2xl mx-28'}>
                <h3>{findRestaurantInfo.subtitle}</h3>
            </div>

        </div>
    );
};

export default restaurantDetail;