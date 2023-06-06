import { useState } from "react";

export function useNewRestaurant() {
    const [data, setData] = useState()
    return {
        data
    }
}
