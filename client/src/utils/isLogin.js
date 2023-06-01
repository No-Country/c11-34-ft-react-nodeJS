import { getUserByEmail } from "../services/user.services";

export async function isLogin () {
    const email = localStorage.getItem('correo')
    if(email) {
        try {
            const res = await getUserByEmail(email)
            if (res.correo === email) return true
            return false
        } catch (error) {
            console.error(error)
            return false
    
        }
    }
}