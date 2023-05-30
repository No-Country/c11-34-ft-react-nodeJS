
import { useLocation } from "react-router-dom"
import { galleryCards } from "../utils"

export function useSearch() {
    const query = new URLSearchParams(useLocation().search)
    const querySearch = query.get('search')
    const galleryFiltered = galleryCards.filter(gallery => gallery.title.toLowerCase().includes(querySearch.toLowerCase()))
    return {galleryFiltered, querySearch}
}