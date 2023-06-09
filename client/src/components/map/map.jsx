// eslint-disable-next-line no-unused-vars
import {MapContainer, Marker, Popup, TileLayer} from 'react-leaflet';
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

const iconMarker = new L.Icon({
    iconUrl: 'https://cdn4.iconfinder.com/data/icons/small-n-flat/24/map-marker-512.png',
    iconSize: [20, 20],
    iconAnchor: [17, 30],

})

const MapRestaurant = ({latitude, longitude, restaurant, height, width}) => {
    const position = [latitude, longitude];
    return (
        <MapContainer className={`${height} ${width} mx-auto`} center={position} zoom={16} scrollWheelZoom={false}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position} marker={iconMarker}>
                <Popup >
                    <img src={restaurant?.imagenes} alt={restaurant?.nombre} className='w-28  rounded'/>
                </Popup>
            </Marker>
        </MapContainer>
    );
};

export default MapRestaurant;
