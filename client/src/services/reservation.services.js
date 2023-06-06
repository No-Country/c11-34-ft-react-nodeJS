import axios from "axios";
const API_URL = 'https://ncback-production.up.railway.app/api';
export async function getAvailableCostumers(id, date, shiftId) {
    try {
        const response = await axios.get(`${API_URL}/restaurant/turnos?id_restaurante=${id}&fecha=${date}&turno=${shiftId}`);
        console.log(response)
        const availableDiners = response.data?.disponible;
        return availableDiners;
    } catch (error) {
        console.error('Error fetching customers:', error);
        throw error;
    }
}

export async function makeReservation(id, email, shift, diners,date){
    try {
        const response = await axios.post(`${API_URL}/restaurant/turnos`, {
            id_restaurante:id,
            correoComensal: email,
            turno:shift,
            comensales:diners,
            fecha:date,
        })
        return response.json
    }catch (error) {
        console.error('Error creating reservation:', error);
        throw error;
    }
}