// eslint-disable-next-line no-unused-vars
import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import Logo from "../../assets/logo.svg";

export function UploadPhoto() {
    const navigate = useNavigate();

    const [photos, setPhotos] = useState({
        img1: null,
        img2: null,
        img3: null,
        img4: null,
    })

    const handleImageChange = (e) => {
        setPhotos(e.target.files)
    }

    const restaurantPhotos = () => {
        const files = {
            img1: photos[0],
            img2: photos[1],
            img3: photos[2],
            img4: photos[3],
        };
        navigate("/createRestaurant/restaurantdata");
        localStorage.setItem('photoRestaurant', files)
        console.log(files)
        setPhotos ({
            img1: null,
            img2: null,
            img3: null,
            img4: null,
        });
    };

    const onSubmit = (e) => {
        e.preventDefault();
        restaurantPhotos();
    };


    return (
        <div>
            <div className="flex mt-11 mb-16 mx-5">
                <img src={Logo} alt="Morfi Logo"/>
            </div>
            <h1 className={'text-2xl font-bold px-5 pb-2'}>Fotos</h1>
            <h3 className={'px-5'}>Por favor carga 4 imagenes del restaurante</h3>
            <form
                onSubmit={onSubmit}
                className="flex flex-col gap-y-6 mb-8 mx-5"
                encType="multipart/form-data"
            >
                <input
                    type="file"
                    accept=".jpg, .jpeg, .png"
                    multiple={true}
                    onChange={handleImageChange}
                />
                <button
                    type="submit"
                    className="bg-black text-white rounded-full p-2.5 font-inter flex w-full justify-center"
                >
                    Siguiente
                </button>
            </form>
        </div>
    )
}
