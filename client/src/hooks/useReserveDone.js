
import { useLocation } from "react-router-dom"

export function useReserveDone() {
    const query = new URLSearchParams(useLocation())
    const queryName = query.get('name')
    // console.log(query)
    // console.log(queryName)
    return {queryName}
}