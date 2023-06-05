
import { useLocation } from "react-router-dom"
import { useRestaurants } from "./useRestaurants"

export function useSearch() {
    const { restaurants, load } = useRestaurants()
    const query = new URLSearchParams(useLocation().search)
    const querySearch = query.get('search')
    const restaurantsSearched = restaurants?.restt?.filter(gallery => gallery.nombre.toLowerCase().includes(querySearch.toLowerCase()))
    return {restaurantsSearched, querySearch, load}
}