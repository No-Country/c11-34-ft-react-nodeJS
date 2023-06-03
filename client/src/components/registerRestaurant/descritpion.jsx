// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/logo.svg";

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
        navigate("/createRestaurant/restaurantdata");
        setDescription("");
    };

    const onSubmit = (e) => {
        e.preventDefault();
        descriptionResta();
    };

    return (
        <div>
            <div className="flex mt-11 mb-16 mx-5">
                <img src={Logo} alt="Morfi Logo" />
            </div>
            <h1 className="text-2xl font-bold px-5 pb-2">Descripción</h1>
            <form
                onSubmit={onSubmit}
                className="flex flex-col gap-y-6 mb-8 mx-5"
                encType="multipart/form-data"
            >
                <label>Escribe una descripción del restaurante</label>
                <textarea
                    name="description"
                    id="description"
                    placeholder="Descripción del restaurante"
                    value={description}
                    onChange={onChange}
                    className="p-2.5 border-b border-border-color outline-none"
                />
                <button
                    type="submit"
                    className="bg-black text-white rounded-full p-2.5 font-inter flex w-full justify-center"
                >
                    Siguiente
                </button>
            </form>
        </div>
    );
}
