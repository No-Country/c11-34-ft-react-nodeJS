import React, {useEffect, useState} from 'react';
import arrowDown from '../../assets/arrow-down.svg';
import ReservationCalendar from '../calendar/calendarReservation.jsx';
import calendar from '../../assets/calendar.svg';
import clock from '../../assets/clock.svg';
import user from '../../assets/user.svg';
import {useNavigate} from 'react-router-dom';
import {getAvailableCustomers, makeReservation} from '../../services/index.js';
import {toast} from "react-hot-toast";

const ReservationForm = ({days, restaurant, restaurantNombre, restaurantImagenes, turnos, restaurantEmail}) => {
    const [actions, setActions] = useState({
        error: false,
        loading: false
    })
    const navigate = useNavigate();

    const [showCalendar, setShowCalendar] = useState(false);
    const [hideButtonImage, setHideButtonImage] = useState(false);
    const [selectedHour, setSelectedHour] = useState();
    const [selectedDiners, setSelectedDiners] = useState(0);
    const [selectedDate, setSelectedDate] = useState(null);
    const [customers, setCustomers] = useState();

    const inH = turnos.hourIn;
    const outH = turnos.hourOut;
    const interval = turnos.inteval;
    const idRest = restaurant
    const reserveDate = localStorage.getItem('dateReserve');

    const restoData = {
        imagenes: restaurantImagenes,
        nombre: restaurantNombre
    }

    const availableHours = (startHour, finalHour, duration) => {

        const stHour = new Date(`2000-01-01T${startHour}:00`);
        const fnHour = new Date(`2000-01-01T${finalHour}:00`);
        const inter = duration * 60 * 60 * 1000;
        const availHours = []
        let actHour = stHour;

        while (actHour < fnHour) {
            availHours.push(actHour.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'}));
            actHour = new Date(actHour.getTime() + inter);
        }

        return availHours;
    }
    const availableShifts = availableHours(inH, outH, interval)

    useEffect(() => {
        if (selectedHour !== undefined && selectedDate !== undefined) {
            const fetchData = async () => {
                try {
                    const response = await getAvailableCustomers(idRest, reserveDate, selectedHour);
                    setCustomers(response);
                } catch (error) {
                    console.error('Error fetching customers:', error);
                }
            };
            fetchData();
        }
    },);
    const handleOpenModal = (e) => {
        e.preventDefault();
        setShowCalendar(true);
        setHideButtonImage(true);
    };

    const formatHour = (hour) => {
        return hour.toString().padStart(2, '0');
    };

    const handleDiners = (e) => {
        console.log(e.target.value)
        setSelectedDiners(e.target.value);

    };

    const handleHour = (e) => {
        const selectedIndex = e.target.selectedIndex;
        setSelectedHour(selectedIndex.toString());
    };

    const handleCloseModal = () => {
        setShowCalendar(false);
        setHideButtonImage(false);
        setSelectedDate(reserveDate);
    };
    const hour = availableShifts[selectedHour];

    localStorage.setItem('reservationHour', hour)

    const handleSubmit = (e) => {
        e.preventDefault();
        const reservationData = {
            id_restaurante: idRest,
            correoComensal: restaurantEmail,
            turno: parseInt(selectedHour),
            comensales: parseInt(selectedDiners),
            fecha: reserveDate
        };
        try {
            setActions({...actions, loading: true})
            makeReservation(reservationData)
            navigate('/')
            setActions({loading: false, error: false})
        } catch (e) {
            const errorMessage = 'Error al crear el restaurante'
            toast.error(errorMessage)
            setActions({loading: false, error: true})
        }
        console.log(`Se esta por ejecutar navigate a reserve`)
        navigate(`/reserve`, {state: {restoData, reservationData}});
    };

    return (
        <div className={'mx-auto rounded-lg p-2.5    border shadow font-inter'}>
            <form onSubmit={handleSubmit} className={'flex flex-col gap-5'}>
                <div className='flex flex-col gap-y-2 text-xs justify-around bg-white rounded-full'>
                    <div className='flex border rounded-lg shadow flex-row justify-between gap-1 items-center py-2 pl-3'>
                        <img src={calendar} alt='calendar' width={20} height={20} className='left-2'/>
                        <h3>{reserveDate}</h3>
                        <button onClick={handleOpenModal}>
                            {!hideButtonImage && <img src={arrowDown} width={24} height={24} alt="Arrow Down"/>}
                        </button>
                        {showCalendar && (
                            <div className="modal fixed left-5 top-60 lg:w-72right-6">
                                <div className="modal-overlay" onClick={handleCloseModal}></div>
                                <div className=" relative  lg:mx-5 modal-content ">
                                    <ReservationCalendar openDays={days} closeModal={handleCloseModal}/>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className={'flex border rounded-lg shadow  justify-between py-2 px-1 static'}>
                        <img src={clock} alt='clock' width={20} height={20} className='left-2'/>
                        <select value={selectedHour} onChange={handleHour} className={'p-2 rounded'}>
                            {availableShifts.map((hora, index) => (
                                <option key={index} value={index.toString()}>
                                    {formatHour(hora)}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className={'flex border rounded-lg shadow justify-between py-2 px-2 static'}>
                        <img src={user} alt='user' width={20} height={20} className='left-2'/>
                        <select value={selectedDiners} onChange={handleDiners} className='p-2.5 rounded'>
                            {/* <option value=''>0</option> */}
                            {Array.from({length: customers}).map((_, index) => (
                                <option key={index} value={index.toString()}>
                                    {index}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                {selectedDiners == 0 ? (
                    <button
                        className='whitespace-nowrap h-12 text-center text-sm flex justify-center items-center rounded-full font-inter bg-bg-dark text-letter-color'
                        type='button'
                        disabled
                    >
                        Reservar
                    </button>
                ) : (
                    <button
                        className='whitespace-nowrap h-12 text-center text-sm flex justify-center font-inter items-center rounded-full bg-bg-dark text-letter-color'
                        type='submit'
                    >
                        Reservar
                    </button>
                )}
            </form>
        </div>
    );
};

export default ReservationForm;