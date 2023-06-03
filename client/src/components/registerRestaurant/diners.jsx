// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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
        navigate("/createRestaurant/restaurantdata");
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
            <div className="flex mt-11 mb-16 mx-5">
                <img src={Logo} alt="Morfi Logo" />
            </div>
            <h1 className={'text-2xl font-bold px-5 pb-2'}>Comensales</h1>
            <h3 className={'px-5'}>Por favor diligencia los siguientes datos</h3>
            <form
                onSubmit={onSubmit}
                className="flex flex-col gap-y-6 mb-8 mx-5"
                encType="multipart/form-data"
            >
                <div className={'flex p-4'}>
                    <label className={'text-sm'} htmlFor={'amountTables'}>Cantidad de mesas</label>
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
                <div className={'flex'}>
                    <label className={'text-sm'} htmlFor={'amountTables'}>Cantidad de sillas por mesa</label>
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
