import {NavBarUI} from "../components";
import { useLocation } from 'react-router-dom';
import calendar from '../assets/calendar.svg';
import clock from '../assets/clock.svg';
import user from '../assets/user.svg';


export function ReserveDone() {

  const location = useLocation();
  const { restaurant, reservationData } = location.state;

    // Accede a los datos de la reserva según sea necesario
    const { guests, time, date } = reservationData;

  return (
    <main className="">
        <NavBarUI />
        <div className={'font-bold text-xl mt-8 mb-2 m-auto w-80'}>
                <h1>{restaurant.title}</h1>
        </div>
        <div
            className={'lg:grid grid-cols-viewRestaurant grid-rows-viewRestaurant justify-center content-between items-center gap-2.5 lg:h-firstCardViewRestaurantGrid'}>
            <div
                className={'flex justify-center col-span-1 row-span-3 lg:h-firstCardViewRestaurantGrid lg:w-firstCardViewRestaurantGrid'}>
                <img
                    className="rounded-3xl object-cover w-80 h-80 lg:h-firstCardViewRestaurantGrid lg:w-firstCardViewRestaurantGrid"
                    src={restaurant.img}
                    alt={restaurant.name}
                />
            </div>
            <div
                className={'hidden lg:block col-end-3 row-start-1 h-cardViewRestaurantGrid w-cardViewRestaurantGrid'}>
                <img
                    className="rounded-3xl object-cover  h-cardViewRestaurantGrid w-cardViewRestaurantGrid"
                    src={restaurant.img}
                    alt={restaurant.name}
                />
            </div>
            <div
                className={'hidden lg:block col-end-3 row-start-2 h-cardViewRestaurantGrid w-cardViewRestaurantGrid'}>
                <img
                    className="rounded-3xl object-cover h-cardViewRestaurantGrid w-cardViewRestaurantGrid"
                    src={restaurant.img}
                    alt={restaurant.name}/>
            </div>
            <div
                className={'hidden lg:block col-end-3 row-start-3 h-cardViewRestaurantGrid w-cardViewRestaurantGrid'}>
                <img
                    className="rounded-3xl object-cover h-cardViewRestaurantGrid w-cardViewRestaurantGrid"
                    src={restaurant.img}
                    alt={restaurant.name}/>
            </div>
        </div>
        <div className={'text-lg mt-8 mb-2 m-auto w-80'}>
            <p className="font-bold">Tu reserva se ha realizado con exito.</p>
            <div className="flex flex-row gap-2">
              <img src={user} alt='user' width={20} height={20} className='left-2'/>
              <p className='ml-2'>{guests} personas</p>
            </div>
            <div className="flex flex-row gap-2">
              <img src={calendar} alt='calendar' width={20} height={20} className='left-2'/>
              <p className='ml-2'>{date}</p>
            </div>
            <div className="flex flex-row gap-2">
              <img src={clock} alt='calendar' width={20} height={20} className='left-2'/>
              <p className='ml-2'>{time} hs</p>
            </div>
        </div>
    </main>
  )
}
