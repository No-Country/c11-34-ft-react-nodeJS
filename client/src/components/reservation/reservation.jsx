// eslint-disable-next-line no-unused-vars
import React, {useState} from 'react';
import arrowDown from '../../assets/arrow-down.svg';
import ReservationCalendar from '../calendar/calendarReservation.jsx';
import calendar from '../../assets/calendar.svg';
import clock from '../../assets/clock.svg';
import user from '../../assets/user.svg';
import { useNavigate } from 'react-router-dom';

const ReservationForm = ({days, restaurant}) => {
    const [showCalendar, setShowCalendar] = useState(false);
    const [hideButtonImage, setHideButtonImage] = useState(false);
    const [guests, setGuests] = useState('1'); // Valor inicial de comensales
    const [time, setTime] = useState('7:30'); // Valor inicial de horario
    const [date, setSelectedDate] = useState(''); // Valor inicial de día
    const navigate = useNavigate()

    const handleOpenModal = (e) => {
        e.preventDefault();
        setShowCalendar(true);
        setHideButtonImage(true);
    };

    const handleCloseModal = () => {
        setShowCalendar(false);
        setHideButtonImage(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault()
        const reservationData = {
            guests, // valor seleccionado de comensales,
            time, // valor seleccionado de horario,
            date, // valor seleccionado de día
          };
        navigate(`/reserve`, {state: {restaurant, reservationData }})
    };

    const reserveDate = localStorage.getItem('dateReserve');

    return (
        <div className={'bg-bg-hover rounded-lg p-5 w-80 lg:w-reservationForm lg:h-reservationForm'}>
            <form onSubmit={handleSubmit} className={'flex flex-col gap-5'}>
                <div className='flex flex-row text-xs justify-around bg-white rounded-full'>
                    <div className="flex flex-row justify-between gap-1 items-center py-2 px-3">
                        <img src={calendar} alt='calendar' width={20} height={20} className='left-2'/>
                        <h3>{reserveDate}</h3>
                        <button onClick={handleOpenModal}>
                            {!hideButtonImage && <img src={arrowDown} width={14} height={14} alt="Arrow Down"/>}
                        </button>
                        {showCalendar && (
                            <div className="modal fixed left-5 top-80 lg:w-72right-6">
                                <div className="modal-overlay" onClick={handleCloseModal}></div>
                                <div className=" relative  lg:mx-5 modal-content ">
                                    <ReservationCalendar openDays={days} closeModal={handleCloseModal} setSelectedDate={setSelectedDate}/>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className={'flex flex row justify-between py-2 px-3 static'}>
                        <img src={clock} alt='clock' width={20} height={20} className='left-2'/>
                        <select value={time} onChange={(e) => setTime(e.target.value)}>
                            <option className={'text-base'} value="7:30">
                                7:30
                            </option>
                            <option className={'text-base'} value="8:30">
                                8:30
                            </option>
                            <option className={'text-base'} value="9:30">
                                9:30
                            </option>
                        </select>
                    </div>
                    <div className={'flex flex row justify-between py-2 px-3 static'}>
                        <img src={user} alt='user' width={20} height={20} className='left-2'/>
                        <select value={guests} onChange={(e) => setGuests(e.target.value)}>
                            <option className={'text-base'} value="1">
                                1
                            </option>
                            <option className={'text-base'} value="2">
                                2
                            </option>
                            <option className={'text-base'} value="3">
                                3
                            </option>
                        </select>
                    </div>
                </div>
                <button
                    className="whitespace-nowrap h-12 text-center text-sm flex justify-center items-center rounded-full bg-bg-dark text-letter-color"
                    type="submit">
                    Reservar
                </button>
            </form>
        </div>
    );
};

export default ReservationForm;
