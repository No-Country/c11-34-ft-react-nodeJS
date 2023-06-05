// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

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
    const [error, setError] = useState("")

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
        navigate("/create-restaurant/restaurant-detail");
        setSelectedCharacteristics([]);
        setNewChar("");
    };

    const onSubmit = (e) => {
        e.preventDefault();
        if(!selectedCharacteristics.length) {
            setError('Debe tener almenos una caracteristica')
            setTimeout(() => setError(''), 2500)
            return
        }

        caracteristicsRestaurant();
    };

    return (
        <div className="font-inter px-4 lg:px-0">
           <p className="text-sm font-inter font-medium mb-2">6/6</p>
            
            <h2 className="text-xl font-bold font-montserrat mb-6">Caracteristicas Principales</h2>
            <form
                onSubmit={onSubmit}
                className="flex flex-col gap-y-6 relative"
                encType="multipart/form-data"
            >
                {
                    error && 
                    <p className="text-red-500 font-inter text-sm absolute -top-6 left-0">{error}</p>
                }
                <div className={'grid grid-cols-2 lg:grid-cols-3 gap-3'}>
                    {mainCharacteristics.map((char, index) => (
                        <label key={index} htmlFor={index} className="text-base flex gap-2">
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
                <section className="flex flex-col gap-y-2">
                    
                    <div className={'pb-0'}>
                        <h3 className="mb-2">Tu restaurante tiene otras caracteristicas?</h3>
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
                    <section className={"flex gap-x-1 text-sm text-subtitle font-inter"}>
                        {
                            [...selectedCharacteristics, ...newChar.split(',')].map(carc => (
                                <p key={carc} className="border shadow p-1 rounded-lg">{carc},</p>
                            ))
                        }
                    </section>
                </section>
       
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
