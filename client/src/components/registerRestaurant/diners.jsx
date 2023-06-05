// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../assets/logo.svg";

export function DinnersData() {
    const navigate = useNavigate();

    const [dataDiners, setDataDiners] = useState({
        cantidadMesas: '',
        cantidadSillasPorMesa: '',
    });
    const [tables, setTables]= useState('');
    const [chairs, setChairs]= useState('');
    const handleAmountTables = (e) =>{
        setTables(e.target.value)

    }
    const handleAmountChairs = (e) =>{
        setChairs(e.target.value)

    }

    const dataDinersTables = () => {
        const data ={
            cantidadMesas: tables,
            cantidadSillasPorMesa: chairs,
        }
        const dataDinersTables = JSON.stringify(data);
        localStorage.setItem("dinersTables", dataDinersTables);
        navigate("/create-restaurant/listTastes");
        setDataDiners({
            cantidadMesas: '',
            cantidadSillasPorMesa: '',
        });
    };

    const onSubmit = (e) => {
        e.preventDefault();
        dataDinersTables();
    };



    return (
        <div>
           <p className="text-sm font-inter font-medium mb-2">4/6</p>
            <h1 className={'text-2xl font-montserrat font-semibold mb-2'}>Comensales</h1>
            <h3 className={'text-sm font-inter text-subtitle mb-4'}>Por favor diligencia los siguientes datos</h3>
            <form
                onSubmit={onSubmit}
                className="flex flex-col gap-y-6"
                encType="multipart/form-data"
            >
                <div className={'flex flex-col gap-y-2'}>
                    <label className={'text-sm font-inter text-gray-500'} htmlFor={'amountTables'}>Cantidad de mesas <span className="text-red-500">*</span></label>
                    <input
                        name="amountTables"
                        id="amountTables"
                        type="number"
                        value={tables}
                        onChange={handleAmountTables}
                        placeholder="Cantidad de mesas"
                        className="text-sm p-2.5 border-b border-border-color outline-none"
                    />
                </div>
                <div className={'flex flex-col gap-y-2'}>
                    <label className={'text-sm font-inter text-gray-500'} htmlFor={'amountTables'}>Cantidad de sillas por mesa <span className="text-red-500">*</span></label>
                    <input
                        name="amountChairs"
                        id="amountChairs"
                        type="number"
                        value={chairs}
                        onChange={handleAmountChairs}
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
