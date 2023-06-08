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

export async function addTastes (data) {
    return await axios.post(`${API_URL}/details/gustos`, data)
}

export async function getUserByEmail (email) {
    const { data } = await axios.get(`${API_URL}/usuarios?correo=${email}`)
    return data
}

export async function editUser(userToUpdate) {
    const { id } = userToUpdate
    const { data } = await axios.put(`${API_URL}/usuarios/${id}`, userToUpdate)
    return data
}

export async function addFavorite(id, favorite) {
    const { data } = await axios.put(`${API_URL}/favoritos/${id}`, favorite)
    return data
}


export async function getFavorite(id, idRest){
    const { data } = await axios.get(`${API_URL}/favoritos/${id}`)

    if(data) {
        const isFavorite = data?.fav?.find(fav => fav === idRest)
        return isFavorite ?? true
    }

    return false
}

export async function uploadImage (fileWithEmail) {

    const file = new FormData()
    for(const key in fileWithEmail) {
        file.append(key, fileWithEmail[key])
    }

    const { data } = await axios.post(`${API_URL}/details/imagen`, file, {
        headers: {
            'Content-Type': 'multipart/form-data'
          }
    })
    return data
}

