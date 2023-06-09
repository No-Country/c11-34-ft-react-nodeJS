// eslint-disable-next-line no-unused-vars
import React, {useEffect, useState} from "react";
import {NavBarUI} from "../components";
import {getRestaurant} from "../services";
import ReservationForm from "../components/reservation/reservation.jsx";
import MapRestaurant from "../components/map/map.jsx";
import {Link, useParams} from "react-router-dom";
import arrow from '../assets/arrow-main.svg'
import { Ring } from "@uiball/loaders";
import { Favorite } from "../components/Favorite";
import { useUser } from "../hooks";

export function Restaurant() {
  const { user } = useUser()
  const [restaurant, setRestaurant] = useState({});
  const [load, setLoad] = useState(true)
  const [breakpoints, setBreakpoints] = useState({
        small: 576,
        medium: 768,
        large: 992,
        xlarge: 1024
    })

  const hoursAvailable = {
    turnos: restaurant?.turnos,
    hourIn: restaurant?.horarioIn,
    hourOut: restaurant?.horarioOut,
    inteval: restaurant?.intervaloMesa,
  };

  const { id } = useParams();

  useEffect(() => {
    ( async () => {
      setLoad(true)
      try {
        const data = await getRestaurant(id)
        setRestaurant(data)
        setLoad(false)
      } catch (error) {
        console.log(error)
      }
      setLoad(false)
    })()
  }, [id]);

  
    useEffect(() => {
        const handleResize = () => {
            const windowWidth = window.innerWidth;
            if (windowWidth < breakpoints.small) {
                setBreakpoints({width: 'w-11/12', height: 'h-44'});
            } else if (windowWidth < breakpoints.medium) {
                setBreakpoints({width: 'w-tableView', height: 'h-60'});
            } else if (windowWidth < breakpoints.large) {
                setBreakpoints({width: 'w-largeView', height: 'h-96'});
            } else if (windowWidth < breakpoints.xlarge) {
                setBreakpoints({width: 'w-xlarge', height: 'h-xlarge'});
            } else {
                setBreakpoints({width: 'w-xlarge', height: 'h-xlarge'});
            }
        };


        handleResize();
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, [breakpoints.large, breakpoints.medium, breakpoints.small, breakpoints.xlarge]);

  const openRestaurant = restaurant?.dias;
  if(load) return <div className="h-[90vh] flex justify-center items-center w-full"><Ring size={40} lineWeight={5} speed={2} color="black"/></div>

  return (
    <>
      <NavBarUI />
      <div className={"px-10 lg:px-24 pt-4 pb-20 lg:pb-0"}>
          <Link to='/' className="hover:-translate-x-2 hover:transition-transform inline-block">
            <img src={arrow} alt="arrow icon svg" className="mb-1.5"/>
          </Link>
          <div className="flex flex-col lg:flex-row w-full lg:items-center gap-2 lg:gap-0 justify-between mb-4">
            <h2 className="font-montserrat text-3xl wrap lg:text-4xl font-medium">{restaurant?.nombre}</h2>
            <Favorite restaurant={restaurant} user={user} />
        </div>

       
          {/*Images*/}
          <div
            className={
              "grid grid-cols-1 lg:grid-cols-12 gap-x-3 gap-y-5 mb-0 lg:mb-7"
            }
          >

          {/* Image Principal */}
            <div
              className={
                "lg:col-span-9"
              }
            >
              <img
                className="rounded-3xl object-cover w-full lg:h-firstCardViewRestaurantGrid "
                src={restaurant?.imagenes}
                alt={restaurant?.nombre}
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
                src={restaurant?.imagenes}
                alt={restaurant?.nombre}
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
                alt={restaurant?.nombre}
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
                alt={restaurant?.nombre}
              />
            </div>
            </section>  
          </div>

          <section className="grid grid-cols-1 lg:grid-cols-8 gap-6 mb-12">
              {/* Info Section */}
              <section className="lg:col-span-5 mb-6 lg:mb-0">
                <h3 className="font-montserrat font-bold text-lg lg:text-xl mb-2">{restaurant?.nombre}: </h3>
                <p className="font-inter font-normal text-base lg:text-lg w-auto lg:w-[44rem] mb-4 border-b border-border-color  pb-2">{restaurant?.descripcion}</p>
                  <section className="flex gap-6 lg:gap-12 lg:items-center flex-col lg:flex-row relative">
                    {/* Tipo de Comida */}
                    <div className="">
                      <h1 className="font-bold text-lg ">Tipo de comida</h1>
                      {restaurant?.tipoComida?.map((item, index) => (
                        <li key={index} className={"text-base font-normal list-none text-gray-500"}>
                          {item}
                        </li>
                      ))}
                    </div>

                    {/* Otras caracteristicas */}
                    {
                      !restaurant?.otrosDetalles?.includes('') &&
                      <div className="">
                        <h1 className="font-bold text-lg">Otras caracteristicas</h1>
                        {restaurant?.otrosDetalles?.map((item, index) => (
                          <li key={index} className={"text-base font-normal list-none text-gray-500 capitalize"}>
                            {item}
                          </li>
                        ))}
                    </div>
                     }
                    
                    <p className="absolute font-inter font-bold  top-0 right-0">${restaurant?.costoReserva}</p>
                     
                  </section>
                </section>
                {/* Reservation Form and Ubication */}
                <section className={"lg:col-span-3"}>
                    <ReservationForm
                      dinners={restaurant?.sillasPorMesa}
                      days={openRestaurant}
                      restaurant={restaurant?._id}
                      restaurantNombre={restaurant?.nombre}
                      restaurantImagenes={restaurant?.imagenes}
                      turnos={hoursAvailable}
                      userEmail={user?.correo}
                    />
                    <p className="flex font-inter font-medium items-center underline">{restaurant?.direccion}</p>
                </section>
          </section>

          <div className="w-full h-full lg:flex justify-center items-center mx-auto">
              <MapRestaurant
                   className="text-black"
                  latitude={restaurant?.cords?.lat}
                  longitude={restaurant?.cords?.lon}
                  restaurant={restaurant}
                  height={breakpoints.height}
                  width={breakpoints.width}
                />
          </div>
         
      </div> 
    </>
  );
}
