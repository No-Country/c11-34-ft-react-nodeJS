// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { TastesList } from "../../utils/";

export function ListTastesRestaurant() {
    const navigate = useNavigate();
    const tastes = TastesList;
    const [selectedTastes, setSelectedTastes] = useState([]);
    const [error, setError] = useState('')

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
        navigate("/create-restaurant/caracts");
        setSelectedTastes([]);
    };

    const onSubmit = (e) => {
        e.preventDefault();
        if(!selectedTastes.length) {
             setError('Debe elejir almenos 1 tipo de comida*')
             setTimeout(() => setError(''), 2500)
             return
        }
        dataTastesRestaurant();
    };

    return (
        <div className="font-inter px-4 lg:px-0">
           <p className="text-sm font-inter font-medium mb-2">5/6</p>
            <h2 className="text-2xl font-bold font-montserrat mb-2">Tipos de comida</h2>
            <p className="font-inter text-subtitle mb-6 text-sm">Cuales son los platos que sirves en tu restaurante?</p>
            <form
                onSubmit={onSubmit}
                className="flex flex-col gap-y-6 items relative"
                encType="multipart/form-data"
            >
                {
                    error && 
                    <p className="text-red-500 font-inter text-sm absolute -top-5 left-0">{error}</p>
                }

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
                    {tastes.map((taste) => (
                        <label key={taste.id} htmlFor={taste.id} className="text-base flex gap-x-2">
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

                <div className="flex justify-between gap-x-4 whitespace-nowrap mt-4 lg:mt-0">
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
