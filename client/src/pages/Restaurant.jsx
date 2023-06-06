// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { Distance, NavBarUI } from "../components";
import { getRestaurant, getRestaaurantCoords } from "../services";
import ReservationForm from "../components/reservation/reservation.jsx";
import MapRestaurant from "../components/map/map.jsx";
import location from "../assets/location.svg";
import { useParams } from "react-router-dom";
import axios from "axios";

export function Restaurant() {
  const [restaurant, setRestaurant] = useState({});
  const [latitudeRestaurant, setLatitudeRestaurant] = useState(0);
  const [longitudeRestaurant, setLongitudeRestaurant] = useState(0);
  const { id } = useParams();

  useEffect(() => {
    getRestaurant(id).then((res) => setRestaurant(res));
  }, [id]);

  const directionRest = restaurant.direccion;


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
  

  let openRestaurant = getRestaurant(id).serviceActive;
  console.log(directionRest);
  console.log(latitudeRestaurant);
  console.log(longitudeRestaurant);
  
  return (
    <div>
      <NavBarUI />
      <div className={"font-bold text-xl mt-8 mb-2 m-auto w-80"}>
        <h1>{restaurant.nombre}</h1>
      </div>
      <div
        className={
          "lg:grid grid-cols-viewRestaurant grid-rows-viewRestaurant justify-center content-between items-center gap-2.5 lg:h-firstCardViewRestaurantGrid"
        }
      >
        <div
          className={
            "flex justify-center col-span-1 row-span-3 lg:h-firstCardViewRestaurantGrid lg:w-firstCardViewRestaurantGrid"
          }
        >
          <img
            className="rounded-3xl object-cover w-80 h-80 lg:h-firstCardViewRestaurantGrid lg:w-firstCardViewRestaurantGrid"
            src={restaurant.imagen}
            alt={restaurant.nombre}
          />
        </div>
        <div
          className={
            "hidden lg:block col-end-3 row-start-1 h-cardViewRestaurantGrid w-cardViewRestaurantGrid"
          }
        >
          <img
            className="rounded-3xl object-cover  h-cardViewRestaurantGrid w-cardViewRestaurantGrid"
            src={restaurant.imagen}
            alt={restaurant.nombre}
          />
        </div>
        <div
          className={
            "hidden lg:block col-end-3 row-start-2 h-cardViewRestaurantGrid w-cardViewRestaurantGrid"
          }
        >
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

      <div className={"flex flex-col items-center mt-2 lg:flex-row text-2xl lg:mx-28 lg:mb-32"}>
        
        <div
          className={"flex justify-center text-sm w-80 items-center lg:mx-8"}
        >
          <h3>{restaurant.descripcion}</h3>
          <div className={"flex flex-col items-center justify-start text-base mt-8 mb-24 m-auto gap-3 w-80"}>
        
            <div className="w-full">
                <h1 className="font-bold">Tipo de comida</h1>
                <p>{restaurant.tipoComida}</p>
            </div>
        </div>
          <div className="w-full">
            <h1 className="font-bold">Caracteristicas</h1>
            {restaurant.caracteristicasPrinc?.map((item, index) => (
              <p key={index}>{item}</p>
            ))}
            <h1 className="font-bold">Otras caracteristicas</h1>
            {restaurant.otrosDetalles?.map((item, index) => (
              <p key={index}>{item}</p>
            ))}
          </div>
        </div>
        <div className={"flex text-sm w-80 px-5 items-center lg:mx-8"}>
          <img
            className={"pr-2 justify-start w-5 h-5"}
            src={location}
            alt="location"
          />
          <div className={"flex text-xs "}>
            <Distance
              longitudeRestaurant={longitudeRestaurant}
              latitudDestiRestaurant={latitudeRestaurant}
            />
          </div>
        </div>
        <div
          className={"lg:w-reservationForm lg:h-reservationForm m-auto mt-4"}
        >
          <ReservationForm days={openRestaurant} restaurant={restaurant} />
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
  );
}
