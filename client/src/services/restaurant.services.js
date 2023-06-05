import axios from "axios";

const API_URL = 'https://ncback-production.up.railway.app/api'

export async function getRestaurants() {
    const { data }  = await axios.get(`${API_URL}/restaurant`)
    return data
}

export async function getRestaurant(id) {
    const { data }  = await axios.get(`${API_URL}/restaurant`)
    const restaurantFounded = data?.restt.find(res => res._id === id)
    return restaurantFounded
}

export async function newRestaurant (newRestaurantData) {
    const toForm = new FormData()
    for(const key in newRestaurantData) {
        toForm.append(key, newRestaurantData[key])
    }

    const { data } = await axios.post(`${API_URL}/restaurant`, toForm, {
        headers: {
            'Content-Type': 'multipart/form-data'
          }
    })
    return data
}