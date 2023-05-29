import { getUserByEmail } from "../services/user.services";

export async function isLogin () {
    try {
        const email = localStorage.getItem('correo')
        const res = await getUserByEmail(email)
        if (res.correo === email) return true
        return false
    } catch (error) {
        console.error(error)
        return false

    }
}