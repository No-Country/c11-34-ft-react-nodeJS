// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";

export default function DistanciaIP({ latitudDestiRestaurant, longitudeRestaurant }) {
    const [ubicacionIP, setUbicacionIP] = useState(null);
    const [distancia, setDistancia] = useState(null);
    const latRest = parseFloat(latitudDestiRestaurant);
    const longRest = parseFloat(longitudeRestaurant);

    useEffect(() => {
        fetch("http://ip-api.com/json")
            .then((response) => response.json())
            .then((data) => {
                const latitudUser = data.lat;
                const longitudUser = data.lon;
                console.log(`soy una variable ${latitudUser}`)
                console.log(`soy una variable user ${longitudUser}`)
                console.log(`soy una variable ${latRest}`)
                console.log(`soy una variable rest ${longRest}`)
                setUbicacionIP({ latitud: latitudUser, longitud: longitudUser });
                const distanciaEnKm = calcularDistancia(latitudUser, longitudUser, latRest, longRest);
                setDistancia(distanciaEnKm);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [latRest, longRest]);

    const calcularDistancia = (latitudUser, longitudUser, latRest, longRest) => {
        let earthRadius = 6371; //km
        let diffLati = (Math.PI/180)*(latRest - latitudUser);
        let diffLong = (Math.PI/180)*(longRest - longitudUser);

        let a = Math.sin(diffLati / 2) * Math.sin(diffLati / 2) + Math.cos((Math.PI/180)*(latitudUser)) * Math.cos((Math.PI/180)*(latRest)) * Math.sin(diffLong / 2) * Math.sin(diffLong / 2);

        let c = 2*(Math.tan(2*(Math.sqrt(a)), Math.sqrt(1-a)));

        let distanciaEnKm = (earthRadius * c).toFixed(1);
        console.log(`asdasd ${distanciaEnKm}`)
        return distanciaEnKm; // Round to 2 decimal places
    };

    if (ubicacionIP === null || distancia === null) {
        return "cargando";
    }
    return calcularDistancia();
}