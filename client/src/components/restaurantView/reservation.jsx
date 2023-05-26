// eslint-disable-next-line no-unused-vars
import React from 'react';

const ReservationForm = () => {

    return (

        <div className={'border-2 border-black rounded-lg w-reservationForm h-reservationForm'}>
            <form className={'flex flex-col '}>
                <div className={'flex flex row justify-between p-4'}>
                    <label>Fecha</label>
                    <select>
                        <option className={'text-base'} value="12/04">12/04</option>
                        <option className={'text-base'} value="13/04">13/04</option>
                        <option className={'text-base'} value="14/04">14/04</option>
                    </select>
                </div>
                <div className={'flex flex row justify-between p-4'}>
                    <label>Cantidad Personas</label>
                    <select>
                        <option className={'text-base'} value="1">1</option>
                        <option className={'text-base'} value="2">2</option>
                        <option className={'text-base'} value="3">3</option>
                    </select>
                </div>
                <div className={'flex flex row justify-between p-4'}>
                    <label>Hora</label>
                    <select>
                        <option className={'text-base'} value="7:30">7:30</option>
                        <option className={'text-base'} value="8:30">8:30</option>
                        <option className={'text-base'} value="9:30">9:30</option>
                    </select>
                </div>
                <button className={'bg-gray-700 rounded-btnReservation h-11 mx-8 text-white'} type="submit">Reservar</button>
            </form>
        </div>
    );
};

export default ReservationForm;