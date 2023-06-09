import {NavBarUI} from "../components";
import {useLocation} from 'react-router-dom';
import calendar from '../assets/calendar.svg';
import clock from '../assets/clock.svg';
import user from '../assets/user.svg';
import React from 'react'

export function ReserveDone() {

    React.useEffect(() => {
        window.scrollTo(0, 0);
      }, []);

    const location = useLocation();
    const {restoData, reservationData} = location.state;
    // Accede a los datos de la reserva según sea necesario
    const {comensales, fecha} = reservationData;
    const date = localStorage.getItem('reservationHour');
    return (
        <main className="">
            <NavBarUI/>
            <div className={'text-lg mt-8 mb-2 m-auto w-80 lg:w-full lg:flex lg:flex-col lg:justify-center lg:items-center lg:whitespace-nowrap'}>
                <p className="font-bold lg:text-4xl lg:font-normal">Tu reserva se ha realizado con éxito!</p>
                <div className="lg:flex lg:flex-row lg:justify-center lg:items-center lg:gap-10 lg:mt-5">
                    <div className="flex flex-row gap-2">
                        <img src={user} alt='user' width={20} height={20} className='left-2'/>
                        <p className='ml-2'>{comensales} personas</p>
                    </div>
                    <div className="flex flex-row gap-2">
                        <img src={calendar} alt='calendar' width={20} height={20} className='left-2'/>
                        <p className='ml-2'>{fecha}</p>
                    </div>
                    <div className="flex flex-row gap-2">
                        <img src={clock} alt='calendar' width={20} height={20} className='left-2'/>
                        <p className='ml-2'>{date} hs</p>
                    </div>
                </div>

            </div>
            <div className={'font-bold text-xl mt-8 mb-2 m-auto w-80 lg:ml-16 lg:text-4xl lg:whitespace-nowrap lg:mb-4'}>
                <h1>{restoData.nombre}</h1>
            </div>
            <div
                className={'lg:grid grid-cols-viewRestaurant grid-rows-viewRestaurant justify-center content-between items-center gap-2.5 lg:h-firstCardViewRestaurantGrid'}>
                <div
                    className={'flex justify-center col-span-1 row-span-3 lg:h-firstCardViewRestaurantGrid lg:w-firstCardViewRestaurantGrid'}>
                    <img
                        className="rounded-3xl object-cover w-80 h-80 lg:h-firstCardViewRestaurantGrid lg:w-firstCardViewRestaurantGrid"
                        src={restoData.imagenes}
                        alt={restoData.nombre}
                    />
                </div>
                <div
                    className={'hidden lg:block col-end-3 row-start-1 h-cardViewRestaurantGrid w-cardViewRestaurantGrid'}>
                    <img
                        className="rounded-3xl object-cover  h-cardViewRestaurantGrid w-cardViewRestaurantGrid"
                        src={restoData.imagenes}
                        alt={restoData.nombre}
                    />
                </div>
                <div
                    className={'hidden lg:block col-end-3 row-start-2 h-cardViewRestaurantGrid w-cardViewRestaurantGrid'}>
                    <img
                        className="rounded-3xl object-cover h-cardViewRestaurantGrid w-cardViewRestaurantGrid"
                        src={restoData.imagenes}
                        alt={restoData.nombre}/>
                </div>
                <div
                    className={'hidden lg:block col-end-3 row-start-3 h-cardViewRestaurantGrid w-cardViewRestaurantGrid'}>
                    <img
                        className="rounded-3xl object-cover h-cardViewRestaurantGrid w-cardViewRestaurantGrid"
                        src={restoData.imagenes}
                        alt={restoData.nombre}/>
                </div>
            </div>
        </main>
    )
}
