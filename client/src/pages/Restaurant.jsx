// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { NavBarUI, SwiperCard } from "../components";
import { getRestaurant, getRestaurantCoords } from "../services";
import ReservationForm from "../components/reservation/reservation.jsx";
import MapRestaurant from "../components/map/map.jsx";
import location from "../assets/location.svg";
import phone from "../assets/phone-call-svgrepo-com.svg";
import { useParams } from "react-router-dom";

export function Restaurant() {
  const [restaurant, setRestaurant] = useState({});
  const [latitudeRestaurant, setLatitudeRestaurant] = useState("");
  const [longitudeRestaurant, setLongitudeRestaurant] = useState("");
  const { id } = useParams();

  useEffect(() => {
    getRestaurant(id).then((res) => setRestaurant(res));
  }, [id]);

  const directionRest = restaurant.direccion;

  const hoursAvailable = {
    turnos: restaurant.turnos,
    hourIn: restaurant.horarioIn,
    hourOut: restaurant.horarioOut,
    inteval: restaurant.intervaloMesa,
  };

  useEffect(() => {
    if (directionRest) {
      getRestaurantCoords(directionRest)
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
      <NavBarUI />
      <div className={"h-full mx-auto "}>
        <div
          className={"font-bold text-xl mt-3 mb-2 w-full flex flex-col w-96 lg:w-auto lg:mx-2 mx-auto md:w-tableView"}
        >
          <div className={"lg:hidden font-bold mx-auto text-xl p-3 w-80"}>
            <h1>{restaurant.nombre}</h1>
          </div>
          {/*Images*/}
          <div
            className={
              "flex  mx-auto w-full md:w-96 md:h-96 md:items-Center lg:grid grid-cols-viewRestaurant grid-rows-viewRestaurant justify-center content-between items-center gap-2.5 lg:h-firstCardViewRestaurantGrid"
            }
          >
            <div
              className={
                "flex justify-center col-span-1 row-span-3 w-10/12 md:w-96 md:h-96 md:items-Center lg:h-firstCardViewRestaurantGrid lg:w-firstCardViewRestaurantGrid"
              }
            >
              <img
                className="rounded-3xl object-cover w-full h-80 lg:h-firstCardViewRestaurantGrid lg:w-firstCardViewRestaurantGrid"
                src={restaurant.imagenes}
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
                src={restaurant.imagenes}
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
          <div className={"lg:flex hidden font-bold mx-auto lg:mx-0 lg:ml-10 lg:mt-3 text-xl lg:text-4xl p-3 lg:w-full"}>
            <h1>{restaurant.nombre}</h1>
          </div>
          {/*location, phoneNumber, reservationForm*/}
          <div className={"flex flex-col items-center mt-2 w-11/12 mx-auto md:w-full md:flex-row md: mx-5 lg:mx-0 lg:flex-row text-2xl lg:mx-28 lg:mb-12 lg:items-start"}>
            <div className={"flex flex-col items-start gap-2 lg:gap-5 m-2 w-11/12 md:flex md:flex-col md:items-start lg:mx-14 lg:mt-0"}>
              <h3 className={"text-sm lg:text-xl font-medium lg:font-normal"}>
                {restaurant.descripcion}
              </h3>
              <div className={"flex flex-row m-2 lg:ml-0"}>
                <img className={"w-5 pr-1 lg:w-10"} src={location} alt={"location"} />
                <h2 className={"text-base lg:text-xl font-medium lg:font-normal"}>
                  {restaurant.direccion}
                </h2>
              </div>
              <div className={"flex flex-row m-2 lg:ml-0"}>
                <img className={"w-5 pr-1 lg:w-10"} src={phone} alt={"phone"} />
                <h2 className={"text-base lg:text-xl font-medium lg:font-normal"}>
                  {restaurant.telefono}
                </h2>
              </div>
            </div>
            <div
              className={
                "my-5 md:mr-2 m-auto mt-4 lg:mt-0"
              }
            >
              <ReservationForm
                days={openRestaurant}
                restaurant={restaurant._id}
                turnos={hoursAvailable}
                restaurantEmail={restaurant.correo}
              />
            </div>
          </div>
              {/* Food, characteristics */}
          <div
            className={
              "flex flex-col items-center justify-start text-base mt-5 mb-12 m-auto gap-3 w-80 md:w-tableView md:flex md:flex-row lg:m-1 lg:items-baseline lg:ml-12 lg:w-3/4"
            }
          >
            <div className="w-11/12 px-3">
              <h1 className="font-bold text-lg lg:text-xl lg:mb-2">Tipo de comida</h1>
              {restaurant.tipoComida?.map((item, index) => (
                <li key={index} className={"text-base font-normal list-none flex flex-row lg:text-xl"}>
                  {item}
                </li>
              ))}
            </div>
            <div className="w-11/12 px-3">
              <h1 className="font-bold text-lg lg:text-xl lg:mb-2">Caracteristicas</h1>
              {restaurant.caracteristicasPrinc?.map((item, index) => (
                <li key={index} className={"text-base font-normal list-none lg:text-xl"}>
                  {item}
                </li>
              ))}
            </div>
            <div className="w-11/12 px-3">
              <h1 className="font-bold text-lg lg:text-xl lg:mb-2">Otras caracteristicas</h1>
              {restaurant.otrosDetalles?.map((item, index) => (
                <li key={index} className={"text-base font-normal list-none lg:text-xl"}>
                  {item}
                </li>
              ))}
            </div>
          </div>
        {latitudeRestaurant && longitudeRestaurant && (
          <div className="w-full h-full mb-5 mr-2 lg:flex justify-center items-center mx-auto">
            <MapRestaurant
              className="text-black"
              latitude={latitudeRestaurant}
              longitude={longitudeRestaurant}
              name={restaurant.nombre}
              height={'w-full'}
              width={'w-full'}
            />
          </div>
        )}
        </div>
      </div>
    </div>
  );
}
