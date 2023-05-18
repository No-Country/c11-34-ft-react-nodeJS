import axios from "axios"
const API_URL = 'https://ncback-production.up.railway.app/api/usuarios'

export async function newUser (newUser) {
    return (await axios.post(API_URL, newUser)).data
}

export async function findByEmail (email) {
    return (await axios.post(API_URL, email)).data
}