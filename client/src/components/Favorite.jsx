import { toast } from "react-hot-toast";
import { addFavorite } from "../services";
import { FavoriteIcon } from "./FavoriteIcon";
import { Ring } from "@uiball/loaders";
import { useState } from "react";

export function Favorite({restaurant, user}) {

  const [load, setLoad] = useState(false)
  const isFavorite = user?.favoritos?.includes(restaurant?._id)
  const [color, setColor] = useState(isFavorite ? '#f75252' : 'transparent')

  const handleFavorite  = async () => {
    setLoad(true)
    let favoritesToSend;
    try {
        if(color === 'transparent') {
          setColor('#f75252')
          favoritesToSend = {data : [...user.favoritos, restaurant._id]}
        } else {
          const deleteFavorite = user?.favoritos?.filter(fav => fav !== restaurant._id)
          setColor('transparent')
          favoritesToSend = {data : deleteFavorite}
        }
       
        await addFavorite(user.id, favoritesToSend)
        toast.success(`${restaurant.nombre} ha sido ${color === 'transparent' ? 'agregado a' : 'eliminado de'} favoritos`)
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
