import axios from "axios"
const API_URL = 'https://ncback-production.up.railway.app/api/usuarios'

export async function registerUser (newUser) {
    return (await axios.post(API_URL, newUser)).data
}

export async function loginUser (userToLogin) {
    return (await axios.post(`${API_URL}/loginm`, userToLogin)).data
}