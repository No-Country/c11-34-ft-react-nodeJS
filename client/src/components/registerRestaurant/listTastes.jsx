// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/logo.svg";
import { TastesList } from "../../utils/";

export function ListTastesRestaurant() {
    const navigate = useNavigate();
    const tastes = TastesList;
    const [selectedTastes, setSelectedTastes] = useState([]);

    const handleTastesSelected = (e) => {
        const { value } = e.target;
        if (selectedTastes.includes(value)) {
            setSelectedTastes(selectedTastes.filter((taste) => taste !== value));
        } else {
            setSelectedTastes([...selectedTastes, value]);
        }
    };

    const dataTastesRestaurant = () => {
        const data = {
            tastes: selectedTastes,
        };
        localStorage.setItem("tastesRestaurant", JSON.stringify(data));
        navigate("/createRestaurant/restaurantdata/");
        setSelectedTastes([]);
    };

    const onSubmit = (e) => {
        e.preventDefault();
        dataTastesRestaurant();
    };

    return (
        <div>
            <div className="flex mt-11 mb-16 mx-5">
                <img src={Logo} alt="Morfi Logo" />
            </div>
            <h1 className="text-2xl font-bold mx-6 pb-2">Tipos de comida</h1>
            <form
                onSubmit={onSubmit}
                className="flex flex-col gap-y-6 mb-8 mx-5"
                encType="multipart/form-data"
            >
                <div className="grid grid-cols-2 gap-1 w-64 mx-auto">
                    {tastes.map((taste) => (
                        <label key={taste.id} htmlFor={taste.id} className="text-base">
                            <input
                                id={taste.id}
                                type="checkbox"
                                value={taste.name.toString()} // Ensure the value is a string
                                checked={selectedTastes.includes(taste.name.toString())} // Compare IDs instead of names
                                onChange={handleTastesSelected}
                            />
                            {taste.name}
                        </label>
                    ))}
                </div>

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
