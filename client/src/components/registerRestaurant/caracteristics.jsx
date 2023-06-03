// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/logo.svg";

export function CaracteristicsRestaurant() {
    const navigate = useNavigate();
    const mainCharacteristics = [
        'Wifi',
        'Estacionamiento',
        'Zona de niños',
        'Galeria',
        'Terraza'
    ];
    const [selectedCharacteristics, setSelectedCharacteristics] = useState([]);
    const [newChar, setNewChar] = useState("");

    const handleCharacteristicsSelected = (e) => {
        const { value } = e.target;
        if (selectedCharacteristics.includes(value)) {
            setSelectedCharacteristics(selectedCharacteristics.filter((char) => char !== value));
        } else {
            setSelectedCharacteristics([...selectedCharacteristics, value]);
        }
    };

    const handleNewCharacteristics = (e) => {
        setNewChar(e.target.value);
    };

    const caracteristicsRestaurant = () => {
        const descriptionRestaurant = {
            characteristics: selectedCharacteristics,
            newChar: newChar.split(",").map((char) => char.trim()),
        };
        localStorage.setItem("characteristicsRestaurant", JSON.stringify(descriptionRestaurant));
        navigate("/createRestaurant/restaurantdata");
        setSelectedCharacteristics([]);
        setNewChar("");
    };

    const onSubmit = (e) => {
        e.preventDefault();
        caracteristicsRestaurant();
    };

    return (
        <div>
            <div className="flex mt-11 mb-16 mx-5">
                <img src={Logo} alt="Morfi Logo" />
            </div>
            <h2 className="text-xl font-bold px-5 pb-2">Caracteristicas Principales</h2>
            <form
                onSubmit={onSubmit}
                className="flex flex-col gap-y-6 mb-8 mx-5"
                encType="multipart/form-data"
            >
                <div className={'grid grid-cols-2 gap-1 w-72 mx-auto'}>
                    {mainCharacteristics.map((char, index) => (
                        <label key={index} htmlFor={index} className="text-base">
                            <input
                                className=""
                                id={index}
                                type="checkbox"
                                value={char}
                                checked={selectedCharacteristics.includes(char)}
                                onChange={handleCharacteristicsSelected}
                            />
                            {char}
                        </label>
                    ))}
                </div>
                <div className={'pb-0'}>
                    <h3>Escribe las otras características que tiene tu restaurante</h3>
                    <h3 className={'text-xs text-slate-400'}>Escribe las características separadas por comas (,)</h3>
                </div>
                <textarea
                    name="description"
                    id="description"
                    placeholder="Caracteristicas nuevas"
                    value={newChar}
                    onChange={handleNewCharacteristics}
                    className="p-2.5 border-b border-border-color outline-none"
                />
                <button
                    type="submit"
                    className="bg-black text-white rounded-full p-2 font-inter flex w-full justify-center"
                >
                    Siguiente
                </button>
            </form>
        </div>
    );
}