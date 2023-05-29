import axios from "axios"
const API_URL = 'https://ncback-production.up.railway.app/api'

export async function registerUser (newUser) {
    return await axios.post(`${API_URL}/usuarios`, newUser)
}

export async function loginUser (userToLogin) {
    return await axios.post(`${API_URL}/auth/login`, userToLogin)
}

export async function authGoogle (credential) {
    const res = await axios.post(`${API_URL}/auth/google`, credential)
    const { usuario } = res.data
    localStorage.setItem('correo', usuario.correo)
    return usuario
}

export async function getUserByEmail (email) {
    const { data } = await axios.get(`${API_URL}/usuarios`)
    const userFounded = data.usuarios.find(user => user.correo === email)
    if(!userFounded) throw new Error('Usuario no encontrado')
    return userFounded
}


