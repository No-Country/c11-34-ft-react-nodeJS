import {NavBarUI} from "../components";
import {useLocation} from 'react-router-dom';
import calendar from '../assets/calendar.svg';
import clock from '../assets/clock.svg';
import user from '../assets/user.svg';


export function ReserveDone() {

    const location = useLocation();
    const {restoData, reservationData} = location.state;
    // Accede a los datos de la reserva según sea necesario
    const {comensales, fecha} = reservationData;
    const date = localStorage.getItem('reservationHour');
    return (
        <main className="">
            <NavBarUI/>
            <div className={'font-bold text-xl mt-8 mb-2 m-auto w-80'}>
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
            <div className={'text-lg mt-8 mb-2 m-auto w-80'}>
                <p className="font-bold">Tu reserva se ha realizado con exito.</p>
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
        </main>
    )
}
