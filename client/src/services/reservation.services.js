import axios from "axios";

const API_URL = 'https://ncback-production.up.railway.app/api';

export async function getAvailableCustomers(id, date, shiftId) {
    try {
        const response = await axios.get(`${API_URL}/restaurant/turnos?id_restaurante=${id}&fecha=${date}&turno=${shiftId}`);
        console.log(response);
        const availableDiners = response.data?.disponible;
        return availableDiners;
    } catch (error) {
        console.error('Error fetching customers:', error);
        throw error;
    }
}

export async function makeReservation(data) {
    const response = await axios.post(`${API_URL}/restaurant/turnos`, data);
    return response.data;
}

export async function listReservation(email) {
    try {
        const response = await axios.get(`${API_URL}/reservas?correo=${email}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching reservations:', error);
        throw error;
    }
}

export async function deleteReservation(idReservation) {
    try {
        const response = await axios.delete(`${API_URL}/reservas/${idReservation}`);
        return response.data.msg;
    } catch (error) {
        console.error('Error deleting reservation:', error);
        throw error;
    }
}

export async function editReservation(idReservation, data) {
    try {
        const response = await axios.put(`${API_URL}/reservas/${idReservation}`, {
            hora: data.hora,
            comensales: data.comensales
        });
        return response.data;
    } catch (error) {
        console.error('Error editing reservation:', error);
        throw error;
    }
}
