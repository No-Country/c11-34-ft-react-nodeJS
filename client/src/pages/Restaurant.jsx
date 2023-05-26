import { useEffect, useState } from "react";
import { NavBar } from "../components";
import { galleryCards } from "../utils";
import { useParams } from "react-router-dom";

export function Restaurant() {
    const { id } = useParams()

    const [restaurant, setRestaurant] = useState({})


    const getRestaurant = (id) => {
        return galleryCards.find(gallery => gallery.id === Number(id))
    }

    useEffect(() => {
        if(id)  setRestaurant(getRestaurant(id))
    }, [id])
    return (

        <div>
            <NavBar/>
            <div className={'grid grid-cols-3 grid-rows-2 gap-3 mx-24 my-3'}>
                <div className={'col-span-2 row-span-4 h-925 w-615'}>
                    <img className="rounded-3xl object-fill h-925 w-615" src={restaurant.img}
                         alt={restaurant.name}/>
                </div>
                <div className={'col-end-4 row-start-1'}>
                    <img className="rounded-3xl object-fill " src={restaurant.img}
                         alt={restaurant.name}/>
                </div>
                <div className={'col-end-4 row-start-2'}>
                    <img className="rounded-3xl object-fill " src={restaurant.img}
                         alt={restaurant.name}/>
                </div>
                {/*<div className={'col-end-4 row-start-3'}>*/}
                {/*    <img className="rounded-3xl object-fill " src={restaurant.img}*/}
                {/*         alt={restaurant.name}/>*/}
                {/*</div>*/}
            </div>

            <div className={'font-bold text-4xl mx-24'}>
                <h1>{restaurant.title}</h1>
            </div>
            <div className={'text-2xl mx-28'}>
                <h3>{restaurant.subtitle}</h3>
            </div>

        </div>
    );
}
