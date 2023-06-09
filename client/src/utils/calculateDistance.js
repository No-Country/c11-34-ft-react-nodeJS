export function calculateDistance(location, lat, lon) {
    const userLatitude = location.coords.latitude;
    const userLongitude = location.coords.longitude;

    const radlat1 = (Math.PI * userLatitude) / 180;
    const radlat2 = (Math.PI * lat) / 180;
    const theta = userLongitude - lon;
    const radtheta = (Math.PI * theta) / 180;
    //fórmula del haversine
    let dist =
        Math.sin(radlat1) * Math.sin(radlat2) +
        Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    dist = Math.acos(dist);
    dist = (dist * 180) / Math.PI;
    dist = dist * 60 * 1.1515;
    dist = dist * 1.609344; // Conversión a kilómetros

    return dist
}