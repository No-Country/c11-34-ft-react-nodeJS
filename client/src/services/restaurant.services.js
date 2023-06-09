import axios from 'axios';
import {memoize} from 'lodash';

const API_URL = 'https://ncback-production.up.railway.app/api'

export async function getRestaurants() {
    const {data} = await axios.get(`${API_URL}/restaurant`)
    return data
}

export async function getRestaurantByEmail(email) {
    const {data} = await axios.get(`${API_URL}/restaurant/my?correo=${email}`)
    return data
}

export async function getRestaurant(id) {
    const {data} = await axios.get(`${API_URL}/restaurant`)
    const restaurantFounded = data?.restt.find(res => res._id === id)
    return restaurantFounded
}

export async function newRestaurant(newRestaurantData) {
    console.log(newRestaurantData)
    const correo = localStorage.getItem('correo')
    const toForm = new FormData()
    for (const key in newRestaurantData) {
        toForm.append(key, newRestaurantData[key])
    }
        const {data} = await axios.post(`${API_URL}/restaurant?correo=${correo}`, toForm, {

            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        return data
}

export const getRestaurantCoords = memoize(async function (direction) {
    const {data} = await axios.post(`${API_URL}/other/mapcord`, {direccion: direction});
    const lat = data?.lat;
    const lon = data?.lng;
    const info = {lat, lon};
    return info;
});
