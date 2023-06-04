// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export function DescriptionRestaurantData() {
    const navigate = useNavigate();

    const [description, setDescription] = useState("");

    const onChange = (e) => {
        setDescription(e.target.value);
    };

    const descriptionResta = () => {
        const descriptionRestaurant = {
            description: description,
        };
        localStorage.setItem(
            "descriptionRestaurantData",
            JSON.stringify(descriptionRestaurant)
        );
        navigate("/create-restaurant/reservationDays");
        setDescription("");
    };

    const onSubmit = (e) => {
        e.preventDefault();
        descriptionResta();
    };

    return (
        <div>
            <p className="text-sm font-inter font-medium mb-2">2/6</p>
            <h2 className="text-2xl font-bold  pb-2 font-montserrat">Descripción</h2>
            <form
                onSubmit={onSubmit}
                className="flex flex-col gap-y-6  "
                encType="multipart/form-data"
            >
                <label className="font-inter text-subtitle">Escribe una descripción del restaurante</label>
                <textarea
                    name="description"
                    id="description"
                    placeholder="Descripción del restaurante"
                    value={description}
                    onChange={onChange}
                    className="p-2.5 border-b border-border-color outline-none"
                />
               <div className="flex justify-between gap-x-4">
                    <Link to='/create-restaurant/restaurant-detail' className="border shadow text-black rounded-full p-2.5 font-inter flex w-full justify-center">
                        Volver al inicio
                    </Link>
                    <button
                        type="submit"
                        className="bg-black text-white rounded-full p-2.5 font-inter flex w-full justify-center"
                    >
                        Siguiente
                    </button>
               </div>
            </form>
        </div>
    );
}
