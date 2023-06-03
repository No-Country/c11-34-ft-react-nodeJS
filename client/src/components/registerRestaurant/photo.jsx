// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/logo.svg";

export function UploadPhoto() {
    const navigate = useNavigate();

    const [photos, setPhotos] = useState({
        mainPhoto: null,
        secondPhoto: null,
        thirdPhoto: null,
        fourthPhoto: null,
    });

    const onChange = (e) => {
        const { name, files } = e.target;
        setPhotos({
            ...photos,
            [name]: files[0],
        });
    };

    const restaurantPhotos = () => {
        const photosForm = JSON.stringify(photos);
        localStorage.setItem("photosRestaurant", photosForm);
        navigate("/createRestaurant/restaurantdata");
        setPhotos({
            mainPhoto: null,
            secondPhoto: null,
            thirdPhoto: null,
            fourthPhoto: null,
        });
    };

    const onSubmit = (e) => {
        e.preventDefault();
        restaurantPhotos();
    };



    return (
        <div>
            <div className="flex mt-11 mb-16 mx-5">
                <img src={Logo} alt="Morfi Logo" />
            </div>
            <h1 className={'text-2xl font-bold px-5 pb-2'}>Fotos</h1>
            <h3 className={'px-5'}>Por favor carga 4 imagenes del restaurante</h3>
            <form
                onSubmit={onSubmit}
                className="flex flex-col gap-y-6 mb-8 mx-5"
                encType="multipart/form-data"
            >
                <label>Imagen Principal</label>
                <input
                    name="mainPhoto"
                    id="mainPhoto"
                    type="file"
                    placeholder="Fotos"
                    onChange={onChange}
                    className="p-2.5 border-b border-border-color outline-none"
                />
                <label>Imagenes Secundarias</label>
                <input
                    name="secondPhoto"
                    id="secondPhoto"
                    type="file"
                    placeholder="Fotos"
                    onChange={onChange}
                    className="p-2.5 border-b border-border-color outline-none"
                />
                <input
                    name="thirdPhoto"
                    id="thirdPhoto"
                    type="file"
                    placeholder="Fotos"
                    onChange={onChange}
                    className="p-2.5 border-b border-border-color outline-none"
                />
                <input
                    name="fourthPhoto"
                    id="fourthPhoto"
                    type="file"
                    placeholder="Fotos"
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
