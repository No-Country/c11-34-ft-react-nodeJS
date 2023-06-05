// eslint-disable-next-line no-unused-vars
import React, {useRef} from "react";
import {MapContainer, Marker, Popup, TileLayer} from 'react-leaflet';
import l from 'leaflet'
import 'leaflet/dist/leaflet.css'

const iconMarker = new l.Icon({
    iconUrl: 'https://cdn4.iconfinder.com/data/icons/small-n-flat/24/map-marker-512.png',
    iconSize:[20,20],
    iconAnchor:[17,30],

})
const MapRestaurant = ({latitude, longitude, name, height, width}) => {
    const position = {lat: latitude, lng: longitude};
    const mapRef = useRef('')
        return (
            <MapContainer className={`${height} ${width}`} center={position} zoom={13} ref={mapRef}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={position} icon={iconMarker}>
                    <Popup>
                        {name}
                    </Popup>
                </Marker>
            </MapContainer>
        );
};

export default MapRestaurant;
