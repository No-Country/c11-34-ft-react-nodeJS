import axios from "axios";

const API_URL = 'https://ncback-production.up.railway.app/api'

export async function getRestaurants() {
    const { data } = await axios.get(`${API_URL}/restaurant`)
    return data
}

export async function getRestaurant(id) {
    const { data } = await axios.get(`${API_URL}/restaurant`)
    const restaurantFounded = data?.restt.find(res => res._id === id)
    return restaurantFounded
}

export async function newRestaurant(newRestaurantData) {
    const correo = localStorage.getItem('correo')
    const toForm = new FormData()
    for(const key in newRestaurantData) {
        for (const key in newRestaurantData) {
            toForm.append(key, newRestaurantData[key])
        }
    const { data } = await axios.post(`${API_URL}/restaurant?correo=${correo}`, toForm, {

        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
    return data}
}
export async function getRestaaurantCoords(direction) {
    const { data } = await axios.post("https://ncback-production.up.railway.app/api/other/mapcord", { direccion: direction });
    const lat = data?.lat
    const lon = data?.lng
    const info = {lat, lon}
    return info;
}