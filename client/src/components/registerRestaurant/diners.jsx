// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export function DinnersData() {
    const navigate = useNavigate();

    const [dataDiners, setDataDiners] = useState({
        mesas: '',
        sillasPorMesa: '',
    });

    const [error ,setError] = useState('')

    const handleChange = (e) => setDataDiners({...dataDiners, [e.target.name] : e.target.value})

    const dataDinersTables = () => {
     
        const dataDinersTables = JSON.stringify(dataDiners);
        localStorage.setItem("dinersTables", dataDinersTables);
        navigate("/create-restaurant/listTastes");
        setDataDiners({
            mesas: '',
            sillasPorMesa: '',
        });
    };

    const onSubmit = (e) => {
        e.preventDefault();

        if(Object.values(dataDiners).includes("")) {
            setError("Los campos no deben estar vacios*")
            setTimeout(() => setError(""), 2500)
            return
        }

        dataDinersTables();
    };



    return (
        <div>
           <p className="text-sm font-inter font-medium mb-2">4/6</p>
            <h1 className={'text-2xl font-montserrat font-semibold mb-2'}>Comensales</h1>
            <h3 className={'text-sm font-inter text-subtitle mb-6'}>Por favor diligencia los siguientes datos</h3>
            <form
                onSubmit={onSubmit}
                className="flex flex-col gap-y-6 relative"
                encType="multipart/form-data"
            >   

                {
                    error && 
                    <p className="text-red-500 font-inter text-sm absolute -top-5 left-0">{error}</p>
                }    
                <div className={'flex flex-col gap-y-2'}>
                    <label className={'text-sm font-inter text-gray-500'} htmlFor={'mesas'}>Cantidad de mesas <span className="text-red-500">*</span></label>
                    <input
                        name="mesas"
                        id="mesas"
                        type="number"
                        min={0}
                        value={dataDiners.mesas}
                        onChange={handleChange}
                        placeholder="Cantidad de mesas"
                        className="text-sm p-2.5 border-b border-border-color outline-none"
                    />
                </div>
                <div className={'flex flex-col gap-y-2'}>
                    <label className={'text-sm font-inter text-gray-500'} htmlFor={'sillasPorMesa'}>Cantidad de sillas por mesa <span className="text-red-500">*</span></label>
                    <input
                        name="sillasPorMesa"
                        id="sillasPorMesa"
                        min={0}
                        type="number"
                        value={dataDiners.sillasPorMesa}
                        onChange={handleChange}
                        placeholder="Cantidad de sillas por mesa"
                        className="text-sm p-2.5 border-b border-border-color outline-none"
                    />
                </div>
                <div className="flex justify-between gap-x-4 whitespace-nowrap">
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
