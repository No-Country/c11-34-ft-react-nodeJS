// eslint-disable-next-line no-unused-vars
import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import Logo from "../../assets/logo.svg";
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
    const [selectedHourfrom, setSelectedHourfrom] = useState("");
    const [selectedMinute, setSelectedMinute] = useState("");
    const [selectReservationDuration, setSelectReservationDuration] = useState("");
    const [cost, setCost] = useState("");

    const [dataRestaurant, setDataRestaurant] = useState({
        days: [],
        openHour: '',
        closeHour: '',
        duration: '',
        cancel: '',
        reservationCost: '',
    })

    const {days, openHour, closeHour, duration, cancel, reservationCost} = dataRestaurant;

    const handleDayChange = (e) => {
        const {value} = e.target;
        if (selectedDays.includes(value)) {
            setSelectedDays(selectedDays.filter((day) => day !== value));
        } else {
            setSelectedDays([...selectedDays, value]);
        }
    };

    const handleHourTo = (e) => {
        setSelectedHourTo(e.target.value);
    };
    const handleHourFrom = (e) => {
        setSelectedHourfrom(e.target.value);
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
        const data = {
            days: selectedDays,
            openHour: selectedHourfrom,
            closeHour: selectedHourTo,
            duration: selectReservationDuration,
            cancel: selectedMinute,
            reservationCost: cost,
        }
        localStorage.setItem('dataDayRestaurant', JSON.stringify(data))
        navigate("/createRestaurant/restaurantdata/");
        setDataRestaurant({
            days: [],
            openHour: '',
            closeHour: '',
            duration: '',
            cancel: '',
            reservationCost: ''
        })
    }
    const onSubmit = (e) => {
        e.preventDefault();
        dataRestaurantInfo();
    };

    return (
        <div>
            <div className="flex mt-11 mb-16 mx-5">
                <img src={Logo} alt="Morfi Logo"/>
            </div>
            <h1 className="text-2xl font-bold mx-6 pb-2">Días y Horarios</h1>
            <form
                onSubmit={onSubmit}
                className="flex flex-col gap-y-6 mb-8 mx-5"
                encType="multipart/form-data"
            >
                <div className="grid grid-cols-3 gap-1 w-80 mx-auto">
                    {weekdays.map((day, index) => (
                        <label key={index} htmlFor={day} className="text-base">
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

                <div className="flex mx-auto">
                    <div className="flex items-center mr-2">
                        <h2 className={'pr-2'}>De</h2>
                        <img src={Clock} alt="clock" className={'w-6'}/>
                    </div>
                    <select
                        value={selectedHourfrom}
                        onChange={handleHourFrom}
                        className="p-2.5 rounded"
                    >
                        <option value="">--</option>
                        {Array.from({length: 24}).map((_, index) => (
                            <option key={index} value={index}>
                                {index}:00
                            </option>
                        ))}
                    </select>
                    <div className="flex items-center mr-2">
                        <h2 className={'px-2'}>A</h2>
                        <img src={Clock} alt="clock" className={'w-6'}/>
                    </div>
                    <select
                        value={selectedHourTo}
                        onChange={handleHourTo}
                        className="p-2.5 rounded"
                    >
                        <option className={'text-base'} value="">--</option>
                        {Array.from({length: 24}).map((_, index) => (
                            <option key={index} value={index}>
                                {index}:00
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <div className="flex items-center mr-2">
                        <h2 className={'px-2 text-xs'}>Duración de la reserva</h2>
                        <img src={Clock} alt="clock" className={'w-4'}/>

                        <select
                            value={selectReservationDuration}
                            onChange={handleReservartionDurationChange}
                            className="p-2.5 rounded"
                        >
                            <option value="">--</option>
                            {Array.from({length: 4}).map((_, index) => (
                                <option key={index} value={index}>
                                    {index} horas
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="flex items-center mr-2">
                        <h2 className={'px-2 text-xs'}>Cancelacion de reserva</h2>
                        <img src={Clock} alt="clock" className={'w-4'}/>

                        <select
                            value={selectedMinute}
                            onChange={handleMinuteChange}
                            className="p-2.5 rounded"
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
                <div className={'flex mx-auto'}>
                    <h3 className={'px-2 text-xs'}>Costo de reserva por persona</h3>
                    <input
                        className={'border-b border-border-color outline-none w-28'}
                        type={'number'}
                        value={cost}
                        onChange={handleCost}
                    />
                </div>
                <button
                    type="submit"
                    className="bg-black text-white rounded-full p-2.5 font-inter flex w-full justify-center"

                >
                    Siguiente
                </button>
            </form>
        </div>
    );
}
