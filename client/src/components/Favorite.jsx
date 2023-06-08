import { toast } from "react-hot-toast";
import { addFavorite } from "../services";
import { FavoriteIcon } from "./FavoriteIcon";
import { Ring } from "@uiball/loaders";
import { useState } from "react";

export function Favorite({restaurant, user, color, setColor}) {

  const [load, setLoad] = useState(false)

  const handleFavorite  = async () => {
    setLoad(true)
    try {
        await addFavorite(user.id, {data : [restaurant._id]})
        if(color === 'transparent') setColor('#f75252')
        else setColor('transparent')
        toast.success(`${restaurant.nombre} ha sido agregado a favoritos`)
    } catch (error) {
        console.log(error)
        toast.error('Algo salio mal')
    }
    setLoad(false)
  }

  return (
    <button disabled={load} onClick={handleFavorite} className="flex gap-x-2 items-center font-inter font-medium text-sm border shadow py-2 rounded-lg w-48 px-2 whitespace-nowrap hover:scale-105 transition-transform">
        {
            load ? <Ring size={15} lineWeight={5} speed={2} color="black"/>
            : <><FavoriteIcon color={color} /> Agregar a favoritos</>
        }

    </button>
  )
}
