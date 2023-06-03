import { useEffect, useState } from "react"
import { getUserByEmail } from "../services"


export function useUser() {
    const [user, setUser] = useState({})
    const [load, setLoad] = useState(true)
    
    const email = localStorage.getItem('correo')

    useEffect(() => {
        if(!email || !user) setLoad(false)
        else {
            setLoad(true)
            getUserByEmail(email).then(res => {
            setUser(res)
            setLoad(false)
            }).catch((err) => {
                console.error(err)
                setLoad(false)
            })               
        }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [email])  

    return {
        user,
        load
    }
}
