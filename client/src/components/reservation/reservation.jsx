// eslint-disable-next-line no-unused-vars
import React, {  useState } from 'react';
import arrowDown from '../../assets/arrow-down.svg';
import ReservationCalendar from '../calendar/calendarReservation.jsx';

const ReservationForm = ({ days }) => {
    const [showCalendar, setShowCalendar] = useState(false);
    const [hideButtonImage, setHideButtonImage] = useState(false);

    const handleOpenModal = (e) => {
        e.preventDefault();
        setShowCalendar(true);
        setHideButtonImage(true);
    };

    const handleCloseModal = () => {
        setShowCalendar(false);
        setHideButtonImage(false);
    };
    const reserveDate= localStorage.getItem('dateReserve');

    console.log(`La fecha reservada es ${reserveDate}`)

    return (
        <div className={'border-2 border-black rounded-lg w-reservationForm h-reservationForm'}>
            <form className={'flex flex-col '}>
                <div className="flex flex-row justify-between p-4">
                    <label>Fecha</label>
                    <h3>{reserveDate}</h3>
                    <button onClick={handleOpenModal}>
                        {!hideButtonImage && <img src={arrowDown} alt="Arrow Down" />}
                    </button>
                    {showCalendar && (
                        <div className="modal absolute w-80">
                            <div className="modal-overlay" onClick={handleCloseModal}></div>
                            <div className="modal-content ">
                                <ReservationCalendar openDays={days} closeModal={handleCloseModal} />
                            </div>
                        </div>
                    )}
                </div>
                <div className={'flex flex row justify-between p-4 static'}>
                    <label>Cantidad Personas</label>
                    <select>
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
                <div className={'flex flex row justify-between p-4 static'}>
                    <label>Hora</label>
                    <select>
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
                <button className={'bg-gray-700 rounded-btnReservation h-11 m-8 text-white static'} type="submit">
                    Reservar
                </button>
            </form>
        </div>
    );
};

export default ReservationForm;
