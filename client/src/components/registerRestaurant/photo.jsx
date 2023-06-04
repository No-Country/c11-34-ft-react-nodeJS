// eslint-disable-next-line no-unused-vars
import React, {useState} from "react";
import {Link, useNavigate} from "react-router-dom";

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
        navigate("/create-restaurant/description");
        localStorage.setItem('photoRestaurant', files)
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
        <div className="px-4 lg:px-0">

            <p className="text-sm font-inter font-medium mb-2">1/6</p>
        
            <h1 className={'text-2xl font-bold font-montserrat  pb-2'}>Fotos</h1>
            <h3 className={'font-inter text-gray-500 font-normal mb-4'}>Por favor carga 4 imagenes del restaurante <span className="text-subtitle">(min 2)</span></h3>
            <form
                onSubmit={onSubmit}
                encType="multipart/form-data"
                className="w-auto lg:w-[40rem]"
            >
                
              <section className="grid grid-cols-1 lg:grid-cols-2 gap-2 ">

                <div>
                    <label className="mb-2 font-inter text-gray-500 text-sm" htmlFor="file_input">Imagen 1</label>
                    <input className="block w-full text-sm  border border-black text-white bg-black " onChange={handleImageChange}  accept=".jpg, .jpeg, .png" type="file"/>
                </div>

                <div>
                    <label className="mb-2 font-inter text-gray-500 text-sm" htmlFor="file_input">Imagen 2</label>
                    <input className="block w-full text-sm  border border-black text-white bg-black " onChange={handleImageChange}  accept=".jpg, .jpeg, .png" type="file"/>
                </div>

                <div>
                    <label className="mb-2 font-inter text-gray-500 text-sm" htmlFor="file_input">Imagen 3</label>
                    <input className="block w-full text-sm  border border-black text-white bg-black " onChange={handleImageChange}  accept=".jpg, .jpeg, .png" type="file"/>
                </div>

                <div>
                    <label className="mb-2 font-inter text-gray-500 text-sm" htmlFor="file_input">Imagen 4</label>
                    <input className="block w-full text-sm  border border-black text-white bg-black " onChange={handleImageChange}  accept=".jpg, .jpeg, .png" type="file"/>
                </div>
               <div className="flex justify-between gap-x-4 mt-4 ">
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
              </section>  
            </form>
        </div>
    )
}
