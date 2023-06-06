// eslint-disable-next-line no-unused-vars
import React, {useEffect, useState} from "react";
import {NavBarUI} from "../components";
import {getRestaaurantCoords, getRestaurant} from "../services";
import ReservationForm from "../components/reservation/reservation.jsx";
import MapRestaurant from "../components/map/map.jsx";
import location from "../assets/location.svg";
import phone from "../assets/phone-call-svgrepo-com.svg";
import {useParams} from "react-router-dom";

export function Restaurant() {
    const [restaurant, setRestaurant] = useState({});
    const [latitudeRestaurant, setLatitudeRestaurant] = useState(0);
    const [longitudeRestaurant, setLongitudeRestaurant] = useState(0);
    const {id} = useParams();

    useEffect(() => {
        getRestaurant(id).then((res) => setRestaurant(res));
    }, [id]);

    const directionRest = restaurant.direccion;

    const hoursAvailable = {
        "turnos": restaurant.turnos,
        "hourIn": restaurant.horarioIn,
        "hourOut": restaurant.horarioOut,
        "inteval": restaurant.intervaloMesa,
    }

    useEffect(() => {
        if (directionRest) {
            getRestaaurantCoords(directionRest)
                .then((res) => {
                    setLatitudeRestaurant(res.lat);
                    setLongitudeRestaurant(res.lon);
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }, [directionRest]);


    const openRestaurant = restaurant.dias;

    return (
        <div>
            <NavBarUI/>
            <div className={"font-bold text-xl mt-3 mb-2 mx-auto w-full flex flex-col "}>
                <div className={"font-bold text-xl p-3 w-80"}>
                    <h1>{restaurant.nombre}</h1>
                </div>
                {/*Images*/}
                <div className={" w-11/12 mx-auto  lg:grid grid-cols-viewRestaurant grid-rows-viewRestaurant justify-center content-between items-center gap-2.5 lg:h-firstCardViewRestaurantGrid"}>
                    <div
                        className={"flex justify-center col-span-1 row-span-3 w-11/12 lg:h-firstCardViewRestaurantGrid lg:w-firstCardViewRestaurantGrid"}>
                        <img
                            className="rounded-3xl object-cover w-80 h-80 lg:h-firstCardViewRestaurantGrid lg:w-firstCardViewRestaurantGrid"
                            src={restaurant.imagenes}
                            alt={restaurant.nombre}
                        />
                    </div>
                    <div
                        className={"hidden lg:block col-end-3 row-start-1 h-cardViewRestaurantGrid w-cardViewRestaurantGrid"}>
                        <img
                            className="rounded-3xl object-cover  h-cardViewRestaurantGrid w-cardViewRestaurantGrid"
                            src={restaurant.imagenes}
                            alt={restaurant.nombre}
                        />
                    </div>
                    <div
                        className={"hidden lg:block col-end-3 row-start-2 h-cardViewRestaurantGrid w-cardViewRestaurantGrid"}>
                        <img
                            className="rounded-3xl object-cover h-cardViewRestaurantGrid w-cardViewRestaurantGrid"
                            src={restaurant.imagen}
                            alt={restaurant.nombre}
                        />
                    </div>
                    <div
                        className={
                            "hidden lg:block col-end-3 row-start-3 h-cardViewRestaurantGrid w-cardViewRestaurantGrid"
                        }
                    >
                        <img
                            className="rounded-3xl object-cover h-cardViewRestaurantGrid w-cardViewRestaurantGrid"
                            src={restaurant.imagen}
                            alt={restaurant.nombre}
                        />
                    </div>
                </div>
                {/*location, phoneNumber*/}
                <div className={"flex flex-col items-center mt-2 w-11/12 mx-auto lg:flex-row text-2xl lg:mx-28 lg:mb-32"}>
                    <div className={"flex justify-center m-2 w-11/12 items-center lg:mx-8"}>
                        <h3 className={'text-sm font-medium'}>{restaurant.descripcion}</h3>
                    </div>
                    <div className={"flex text-xs w-72"}>
                        <img className={'w-5 pr-1'} src={location} alt={'location'}/>
                        <h2 className={'text-base font-medium'}>{restaurant.direccion}</h2>
                    </div>
                    <div className={"flex text-xs w-72"}>
                        <img className={'w-5 pr-1'} src={phone} alt={'phone'}/>
                        <h2 className={'text-base font-medium'}>{restaurant.telefono}</h2>
                    </div>
                </div>
                <div  className={"my-5 lg:w-reservationForm lg:h-reservationForm m-auto mt-4"}
                >
                    <ReservationForm days={openRestaurant} restaurant={restaurant._id} turnos={hoursAvailable}/>
                </div>
                <div className={"flex flex-col items-center justify-start text-base mt-8 mb-24 m-auto gap-3 w-80"}>
                    <div className="w-11/12 px-3">
                        <h1 className="font-bold text-lg ">Tipo de comida</h1>
                        <p className={'text-base font-normal'}>{restaurant.tipoComida}</p>
                    </div>
                    <div className="w-11/12 px-3">
                        <h1 className="font-bold text-lg ">Caracteristicas</h1>
                        {restaurant.caracteristicasPrinc?.map((item, index) => (
                            <p key={index} className={'text-base font-normal'}>{item}</p>
                        ))}
                        <h1 className="font-bold text-lg">Otras caracteristicas</h1>
                        {restaurant.otrosDetalles?.map((item, index) => (
                            <p key={index} className={'text-base font-normal'}>{item}</p>
                        ))}
                    </div>
                </div>
            </div>
            <div
                className={
                    "hidden lg:flex justify-center items-center h-5/6 w-5/6 mb-8 mx-auto"
                }
            >
                <MapRestaurant
                    className={"text-black"}
                    latitude={latitudeRestaurant}
                    longitude={longitudeRestaurant}
                    name={restaurant.nombre}
                    height="h-mapViewRestaurant"
                    width="w-mapViewRestaurant"
                />
            </div>
        </div>
)
    ;
}
