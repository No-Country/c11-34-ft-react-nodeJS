import axios from "axios";

const API_URL = 'https://ncback-production.up.railway.app/api'

export async function getRestaurants() {
    const { data }  = await axios.get(`${API_URL}/restaurant`)
    return data
}