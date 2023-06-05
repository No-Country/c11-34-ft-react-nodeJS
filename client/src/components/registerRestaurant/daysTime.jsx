// eslint-disable-next-line no-unused-vars
import React, {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import { daysTimeValidator } from "../../utils";
import Clock from "../../assets/clock.svg";

export function OpenDays() {
    const navigate = useNavigate();
    const weekdays = [
        "Domingo",
        "Lunes",
        "Martes",
        "Miércoles",
        "Jueves",
        "Viernes",
        "Sábado"
    ];


    const [selectedDays, setSelectedDays] = useState([]);

    const [selectedHourTo, setSelectedHourTo] = useState("");
    const [error, setError] = useState("")
    const [selectedHourfrom, setSelectedHourfrom] = useState("");

    const [selectedMinute, setSelectedMinute] = useState("");
    const [selectReservationDuration, setSelectReservationDuration] = useState("");
    const [cost, setCost] = useState("");
 

    const handleDayChange = (e) => {
        const {value} = e.target;
        if (selectedDays.includes(value)) {
            setSelectedDays(selectedDays.filter((day) => day !== value));
        } else {
            setSelectedDays([...selectedDays, value]);
        }
    };
    const formatHour = (hour) => {
        return hour.toString().padStart(2, '0') + ":00";
    };

    const handleHourTo = (e) => {
        const hourTo = e.target.value.toString();
        setSelectedHourTo(formatHour(hourTo));
    };
    const handleHourFrom = (e) => {
        const hourFrom = e.target.value.toString();
        setSelectedHourfrom(formatHour(hourFrom));
    };
    const handleReservartionDurationChange = (e) => {
        setSelectReservationDuration(e.target.value);
    };
    const handleCost = (e) => {
        setCost(e.target.value);
    };

    const handleMinuteChange = (e) => {
        setSelectedMinute(e.target.value);
    };

    const dataRestaurantInfo = () => {

        const toValidate = {
            days : selectedDays,
            hoursTo : selectedHourTo,
            hoursFrom : selectedHourfrom,
            minute : selectedMinute,
            duration : selectReservationDuration,
            cost : cost
        }

        const isDataValid = daysTimeValidator(toValidate)

        if(isDataValid)  {
            setError("Los campos no deben estar vacios*")
            setTimeout(() => setError(""), 2500)
            return
        }

        const data = {
            days: selectedDays,
            openHour: selectedHourfrom,
            closeHour: selectedHourTo,
            duration: Number(selectReservationDuration),
            cancel: selectedMinute,
            reservationCost: cost,
        }
        localStorage.setItem('dataDayRestaurant', JSON.stringify(data))
        navigate("/create-restaurant/diners");
      
    }

    const onSubmit = (e) => {
        e.preventDefault();
        dataRestaurantInfo();
    };

    return (
        <div className="font-inter px-4 lg:px-0">
           
            <p className="text-sm font-inter font-medium mb-2">3/6</p>
            <h1 className="text-2xl font-bold mb-6 font-montserrat">Días y Horarios</h1>
            <form
                onSubmit={onSubmit}
                className="flex flex-col gap-y-6 border shadow-xl px-4 py-2 relative"
                encType="multipart/form-data"
            >

            {
                error && 
                <p className="text-red-500 font-inter text-sm absolute -top-6 left-0">{error}</p>
            }
                <div className="grid grid-cols-3 gap-4">
                    {weekdays.map((day, index) => (
                        <label key={index} htmlFor={day} className="text-base flex gap-2">
                            <input
                                className=""
                                id={day}
                                type="radio"
                                value={index.toString()}
                                checked={selectedDays.includes(index.toString())}
                                onChange={handleDayChange}
                            />
                            {day}
                        </label>
                    ))}
                </div>

                <div className="flex w-full justify-between">
                    <div className="flex items-center">
                        <h2 className={'pr-2'}>De</h2>
                        <img src={Clock} alt="clock" className={'w-6'}/>
                    </div>
                    <select
                        value={selectedHourfrom}
                        onChange={handleHourFrom}
                        className="p-2.5 rounded"
                    >
                        <option value="">{selectedHourfrom}</option>
                        {Array.from({ length: 22 }).map((_, index) => (
                            <option key={index} value={index.toString()}>
                                {index}:00
                            </option>
                        ))}
                    </select>
                    <div className="flex items-center ">
                        <h2 className={'px-2'}>A</h2>
                        <img src={Clock} alt="clock" className={'w-6'}/>
                    </div>
                    <select
                        value={selectedHourTo}
                        onChange={handleHourTo}
                        className="p-2.5 rounded"
                    >
                        <option value="">{selectedHourTo}</option>
                        {Array.from({ length: 22 }).map((_, index) => (
                            <option key={index} value={index.toString()}>
                                {index}:00
                            </option>
                        ))}
                    </select>
                </div>

                <div className="flex flex-col gap-y-4 font-inter">
                    <div className="flex flex-col gap-y-2">
                        <h2 className={'flex items-center gap-x-2 text-xs text-subtitle '}>    <img src={Clock} alt="clock" className={'w-4'}/> Duración de la reserva</h2>
                     

                        <select
                            value={selectReservationDuration}
                            onChange={handleReservartionDurationChange}
                            className="p-1.5 rounded"
                        >
                            <option value="">--</option>
                            {Array.from({length: 4}).map((_, index) => (
                                <option key={index} value={index}>
                                    {index} horas
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="flex flex-col gap-y-2">
                        <h2 className={'flex items-center gap-x-2 text-xs text-subtitle'}> <img src={Clock} alt="clock" className={'w-4'}/> Cancelacion de reserva</h2>
                        

                        <select
                            value={selectedMinute}
                            onChange={handleMinuteChange}
                            className="p-1.5 rounded"
                        >
                            <option value="">--</option>
                            {Array.from({length: 60}).map((_, index) => (
                                <option key={index} value={index}>
                                    {index} minutos
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className={'flex w-full justify-between border px-2 rounded-md py-2'}>
                    <h3 className={'flex items-center gap-x-2 text-xs'}>Costo de reserva por persona</h3>
                    <input
                        className={'border-b border-border-color outline-none w-28'}
                        type={'number'}
                        value={cost}
                        onChange={handleCost}
                    />
                </div>
                <div className="flex justify-between gap-x-4">
                    <Link to='/create-restaurant/restaurant-detail' className="border shadow text-black rounded-full p-2.5 font-inter flex w-full justify-center">
                        Volver al inicio
                    </Link>
                    <button
                        type="submit"
                        className="bg-black text-white rounded-full p-2.5 font-inter flex w-full justify-center"
                    >
                        Siguiente
                    </button>
               </div>
            </form>
        </div>
    );
}
