import { useEffect } from "react";
import { useState } from "react";
import { getRestaurants } from "../services";

export function useRestaurants() {
    const [restaurants, setRestaurants] = useState([])
    const [actions , setActions] = useState({
        error : '',
        load : true
    })

    useEffect(() => {
        getRestaurants().then(res => {
            setRestaurants(res)
            setActions({...actions, load : false})
        }).catch(err => {
            console.log('Error', err)
            setActions({...actions, error: 'Algo salio mal!', load:false})
        })

    }, [actions])


    return {
        restaurants,
        error : actions.error,
        load : actions.load
    }
}
