import React, { useState, useEffect } from "react";

export function Distance({ latitudDestiRestaurant, longitudeRestaurant }) {
    const [distance, setDistance] = useState(null);

    useEffect(() => {
        const options = {
            enableHighAccuracy: false,
            timeout: 5000,
            maximumAge: 0
        };

        function calculateDistance(location) {
            const userLatitude = location.coords.latitude;
            const userLongitude = location.coords.longitude;

            const radlat1 = (Math.PI * userLatitude) / 180;
            const radlat2 = (Math.PI * latitudDestiRestaurant) / 180;
            const theta = userLongitude - longitudeRestaurant;
            const radtheta = (Math.PI * theta) / 180;
            //fórmula del haversine
            let dist =
                Math.sin(radlat1) * Math.sin(radlat2) +
                Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
            dist = Math.acos(dist);
            dist = (dist * 180) / Math.PI;
            dist = dist * 60 * 1.1515;
            dist = dist * 1.609344; // Conversión a kilómetros
            setDistance(dist.toFixed(2)); // Redondear a 2 decimales y guardar la distancia en el estado
        }

        function handleLocationError(error) {
            console.error(error.message);
        }

        // Obtener la ubicación del usuario
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                calculateDistance,
                handleLocationError,
                options
            );
        } else {
            console.error("La geolocalización no es soportada por este navegador.");
        }
    }, [latitudDestiRestaurant, longitudeRestaurant]);

    return (
        <div className={'flex justify-start'}>
            <h3> {distance} km</h3>
        </div>
    );
}
