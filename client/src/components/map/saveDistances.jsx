import {useEffect, useMemo, useState} from "react";
import {getRestaaurantCoords, getRestaurant} from "../../services/index.js";
import {useParams} from "react-router-dom";
import {Distance} from "./distanceRestaurant.jsx";

const [restaurant, setRestaurant] = useState({});
const [latitudeRestaurant, setLatitudeRestaurant] = useState(0);
const [longitudeRestaurant, setLongitudeRestaurant] = useState(0);
const {id} = useParams();

useEffect(() => {
    getRestaurant(id).then((res) => setRestaurant(res));
}, [id]);
function MyComponent({ directionRest }) {
    const [latitudeRestaurant, setLatitudeRestaurant] = useState(null);
    const [longitudeRestaurant, setLongitudeRestaurant] = useState(null);

    useEffect(() => {
        getRestaurantCoords(directionRest)
            .then((res) => {
                setLatitudeRestaurant(res.lat);
                setLongitudeRestaurant(res.lon);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [directionRest]);

    const memoizedCoords = useMemo(() => ({ latitudeRestaurant, longitudeRestaurant }), [latitudeRestaurant, longitudeRestaurant]);

    return (
        <Distance
            coords={memoizedCoords}
        />
    );
}