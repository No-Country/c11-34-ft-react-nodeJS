// eslint-disable-next-line no-unused-vars
import React from "react";
import RestaurantCard from "./restaurantCard";
import restaurants from "../pages/testCards.json";
import DistanciaIP from "./distanceRestaurant.jsx";

export default function AllCards() {
  return (
    <div className="grid grid-cols-1 gap-2 p-4 h-full w-full sm:grid-cols-2 md:grid-cols-3   lg:grid-cols-3 xl:grid-cols-4">
      {restaurants.map((restaurant) => (
        <div key={restaurant.id} className="w-full ">
          <RestaurantCard
            name={restaurant.name}
            img={restaurant.img}
            average={restaurant.average}
          />
          <DistanciaIP
              latitudDestiRestaurant={parseFloat(restaurant.latitud)}
              longitudeRestaurant={parseFloat(restaurant.longitud)}
          />
        </div>
      ))}
    </div>
  );
}
