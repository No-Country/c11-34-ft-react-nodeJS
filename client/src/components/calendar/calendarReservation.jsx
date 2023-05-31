// eslint-disable-next-line no-unused-vars
import React, {useEffect, useState} from 'react';
import Calendar from 'react-calendar';
import dayjs from 'dayjs';
import 'dayjs/locale/es.js';
import updateLocale from 'dayjs/plugin/updateLocale';
import localizedFormat from 'dayjs/plugin/localizedFormat';

dayjs().locale('es');
dayjs.extend(localizedFormat);
dayjs.extend(updateLocale);

// eslint-disable-next-line react/display-name
const ReservationCalendar = ({ openDays, closeModal }) => {
    const [date, setDate] = useState(new Date());
    const [activeDays, setActiveDays] = useState([]);

    const reservationDay = dayjs(date).locale('es').format('DD MMMM');

    useEffect(() => {
        setActiveDays(openDays);
    }, [openDays]);

    useEffect(() => {
        localStorage.setItem('dateReserve', reservationDay);
    }, [reservationDay]);

    const isDayDisabled = (date) => {
        const dayOfWeek = dayjs(date).day();
        return !activeDays.includes(dayOfWeek);
    };

    const handleDateClick = (date) => {
        const selectedDate = new Date(date);
        closeModal();
        setDate(selectedDate);
        console.log('Closing modal');
    };

    return (
        <div className="w-80 mx-auto bg-white p-2">
            <Calendar
                className="w-80"
                calendarClassName="text-gray-800 w-80"
                tileDisabled={({date}) => isDayDisabled(date)}
                prev2Label={null}
                next2Label={null}
                value={date}
                onChange={(d) => setDate(d)}
                onClickDay={handleDateClick}
            />
        </div>
    );
};

export default ReservationCalendar;
