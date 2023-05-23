import axios from "axios"
const API_URL = 'https://ncback-production.up.railway.app/api'

export async function registerUser (newUser) {
    return await axios.post(`${API_URL}/usuarios`, newUser)
}

export async function loginUser (userToLogin) {
    console.log(userToLogin)
    return await axios.post(`${API_URL}/auth/login`, userToLogin)
}



