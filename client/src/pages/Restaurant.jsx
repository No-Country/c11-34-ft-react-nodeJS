// eslint-disable-next-line no-unused-vars
import React, {useEffect, useState} from "react";
import {NavBarUI} from "../components";
import {getRestaurant, getRestaurantCoords} from "../services";
import ReservationForm from "../components/reservation/reservation.jsx";
import MapRestaurant from "../components/map/map.jsx";
import location from "../assets/location.svg";
import phone from "../assets/phone-call-svgrepo-com.svg";
import {useParams} from "react-router-dom";
import location from "../assets/locationBlack.svg";
import phone from "../assets/phone.svg";
import logo from '../assets/logo-mobile.svg'
import { useParams } from "react-router-dom";
import { Ring } from "@uiball/loaders";

export function Restaurant() {
  const [restaurant, setRestaurant] = useState({});
  const [load, setLoad] = useState(true)
  const [latitudeRestaurant, setLatitudeRestaurant] = useState("");
  const [longitudeRestaurant, setLongitudeRestaurant] = useState("");
  const { id } = useParams();

  useEffect(() => {
    getRestaurant(id).then((res) => {
      setLoad(true)
      setRestaurant(res)
      setLoad(false)
    });
  }, [id]);

  const hoursAvailable = {
    turnos: restaurant.turnos,
    hourIn: restaurant.horarioIn,
    hourOut: restaurant.horarioOut,
    inteval: restaurant.intervaloMesa,
  };

  useEffect(() => {

    getRestaurantCoords(restaurant.direccion)
      .then((res) => {
        setLatitudeRestaurant(res.lat);
        setLongitudeRestaurant(res.lon);
      })
      .catch((error) => {
         console.error(error);
    });

  }, [restaurant.direccion]);

    const openRestaurant = restaurant.dias;

    const breakpoints = {
        small: 576,
        medium: 768,
        large: 992,
        xlarge: 1024
    };
    useEffect(() => {
        const handleResize = () => {
            const windowWidth = window.innerWidth;
            if (windowWidth < breakpoints.small) {
                setBreakpoint({width: 'w-11/12', height: 'h-44'});
            } else if (windowWidth < breakpoints.medium) {
                setBreakpoint({width: 'w-tableView', height: 'h-60'});
            } else if (windowWidth < breakpoints.large) {
                setBreakpoint({width: 'w-largeView', height: 'h-96'});
            } else if (windowWidth < breakpoints.xlarge) {
                setBreakpoint({width: 'w-xlarge', height: 'h-xlarge'});
            } else {
                setBreakpoint({width: 'w-xlarge', height: 'h-xlarge'});
            }
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

  if(load) return <div className="h-[90vh] flex justify-center items-center w-full"><Ring size={40} lineWeight={5} speed={2} color="black"/></div>

  return (
    <>
      <NavBarUI />
      <div className={"px-10 lg:px-24 pt-12 pb-20 lg:pb-0"}>
       
          {/*Images*/}
          <div
            className={
              "grid grid-cols-1 lg:grid-cols-12 gap-x-3 gap-y-5 mb-7"
            }
          >

          {/* Image Principal */}
            <div
              className={
                "lg:col-span-9"
              }
            >
              <img
                className="rounded-3xl object-cover w-full lg:h-firstCardViewRestaurantGrid lg:w-firstCardViewRestaurantGrid"
                src={restaurant.imagenes}
                alt={restaurant.nombre}
              />
            </div>
            <section className="lg:col-span-3 flex flex-col gap-y-5">
            <div
              className={
                "hidden lg:block col-end-3 row-start-1 h-cardViewRestaurantGrid w-72"
              }
            >
              <img
                className="rounded-3xl object-cover  h-cardViewRestaurantGrid w-72"
                src={restaurant.imagenes}
                alt={restaurant.nombre}
              />
            </div>
            <div
              className={
                "hidden lg:block col-end-3 row-start-2 h-cardViewRestaurantGrid w-72"
              }
            >
              <img
                className="rounded-3xl object-cover h-cardViewRestaurantGrid w-72"
                src={'https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM='}
                alt={restaurant.nombre}
              />
            </div>
            <div
              className={
                "hidden lg:block col-end-3 row-start-3 h-cardViewRestaurantGrid w-72"
              }
            >
              <img
                className="rounded-3xl object-cover h-cardViewRestaurantGrid w-72"
                src={'https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM='}
                alt={restaurant.nombre}
              />
            </div>
            </section>  
          </div>

          <section className="grid grid-cols-1 lg:grid-cols-8 gap-6 mb-12">
              <section className="lg:col-span-5 mb-6 lg:mb-0">
                <h3 className="font-montserrat font-medium text-3xl lg:text-4xl mb-2">{restaurant.nombre}</h3>
                <p className="font-inter font-normal text-lg lg:text-xl w-auto lg:w-[44rem] mb-7">{restaurant.descripcion}</p>
               <div className="flex flex-col gap-y-5">
                <p className="font-inter font-medium flex items-center gap-x-1"><img src={logo}/>${restaurant.costoReserva}</p>
                <p className="flex font-inter font-medium items-center"><img src={location}/> {restaurant.direccion}</p>
               </div>
              </section>
              <section className={"lg:col-span-3"}>
                  <ReservationForm
                    days={openRestaurant}
                    restaurant={restaurant._id}
                    restaurantNombre={restaurant.nombre}
                    restaurantImagenes={restaurant.imagenes}
                    turnos={hoursAvailable}
                    restaurantEmail={restaurant.correo}
                  />
              </section>
          </section>

          {/* Food, characteristics */}


          <section className="grid grid-cols-1 lg:grid-cols-12">
            <section
              className={
                "font-inter lg:col-span-4 flex flex-col gap-y-6"
              }
            >
              <div className="">
                <h1 className="font-bold text-lg ">Tipo de comida</h1>
                {restaurant.tipoComida?.map((item, index) => (
                  <li key={index} className={"text-base font-normal list-none text-gray-500"}>
                    {item}
                  </li>
                ))}
              </div>
              <div className="">
                <h1 className="font-bold text-lg ">Caracteristicas</h1>
                {restaurant.caracteristicasPrinc?.map((item, index) => (
                  <li key={index} className={"text-base font-normal list-none text-gray-500"}>
                    {item}
                  </li>
                ))}
              </div>
              {
                !restaurant.otrosDetalles.includes('') &&
                <div className="">
                <h1 className="font-bold text-lg">Otras caracteristicas</h1>
                {restaurant.otrosDetalles?.map((item, index) => (
                  <li key={index} className={"text-base font-normal list-none"}>
                    {item}
                  </li>
                ))}
              </div>
              }
            </section> 
            <section className="lg:col-span-8 h-full relative z-10">
               {latitudeRestaurant && longitudeRestaurant && (
                            <div className="w-full h-full mb-5 mx-auto lg:flex justify-center items-center mx-auto">
                                <MapRestaurant
                                    className="text-black"
                                    latitude={latitudeRestaurant}
                                    longitude={longitudeRestaurant}
                                    name={restaurant.nombre}
                                    height={breakpoint.height}
                                    width={breakpoint.width}
                                />
                            </div>
                        )}
          
            </section>
          </section>   
      </div> 
    </>
  );
}
