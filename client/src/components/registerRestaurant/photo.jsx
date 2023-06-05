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

    const [error, setError] = useState('')

    const handleImageChange = (e) => {
        setPhotos({...photos, [e.target.name] : e.target.files[0]})
    }

    const restaurantPhotos = () => {
        const photoUrls = {
            img1: photos.img1 ? URL.createObjectURL(photos.img1) : null,
            img2: photos.img2 ? URL.createObjectURL(photos.img2) : null,
            img3: photos.img3 ? URL.createObjectURL(photos.img3) : null,
            img4: photos.img4 ? URL.createObjectURL(photos.img4) : null,
          };
        navigate("/create-restaurant/description");
        localStorage.setItem("photoRestaurant", JSON.stringify(photoUrls));
    };

    const onSubmit = (e) => {
        e.preventDefault();
        const photoFormat = Object.values(photos)
        const isValid = photoFormat.some(p => p !== null)
        if(!isValid) {
            setError('Debe elegir almenos una imagen*')
            setTimeout(() => setError(''), 2500)
            return
        }
        restaurantPhotos()
    };

    return (
        <div className="px-4 lg:px-0">

            <p className="text-sm font-inter font-medium mb-2">1/6</p>
        
            <h1 className={'text-2xl font-bold font-montserrat  pb-2'}>Fotos</h1>
            <h3 className={'font-inter text-gray-500 font-normal mb-6'}>Por favor carga 4 imagenes del restaurante <span className="text-subtitle">(min 1)</span></h3>
            <form
                onSubmit={onSubmit}
                encType="multipart/form-data"
                className="w-auto lg:w-[40rem] relative"
            >

                {
                    error && 
                    <p className="text-red-500 font-inter text-sm absolute -top-5 left-0">{error}</p>
                }
                
              <section className="grid grid-cols-1 lg:grid-cols-2 gap-2 ">
              

                <div>
                    <label className="mb-2 font-inter text-gray-500 text-sm" htmlFor="img1">Imagen 1</label>
                    <input className="block w-full text-sm  border border-black text-white bg-black " onChange={handleImageChange} name="img1" accept=".jpg, .jpeg, .png" type="file"/>
                </div>

                <div>
                    <label className="mb-2 font-inter text-gray-500 text-sm" htmlFor="img2">Imagen 2</label>
                    <input className="block w-full text-sm  border border-black text-white bg-black " onChange={handleImageChange} name="img2" accept=".jpg, .jpeg, .png" type="file"/>
                </div>

                <div>
                    <label className="mb-2 font-inter text-gray-500 text-sm" htmlFor="img3">Imagen 3</label>
                    <input className="block w-full text-sm  border border-black text-white bg-black " onChange={handleImageChange} name="img3" accept=".jpg, .jpeg, .png" type="file"/>
                </div>

                <div>
                    <label className="mb-2 font-inter text-gray-500 text-sm" htmlFor="img4">Imagen 4</label>
                    <input className="block w-full text-sm  border border-black text-white bg-black " onChange={handleImageChange} name="img4" accept=".jpg, .jpeg, .png" type="file"/>
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
