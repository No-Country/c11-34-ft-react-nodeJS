import magnifyingGlass from '../assets/magnifying-glass-white.svg'
import clockCounter from '../assets/clock-counter.svg'
import heart from '../assets/heart.svg'
import search from '../assets/search.svg'



export const itemsNavBottom = [{
    name: 'Explorar',
    image: magnifyingGlass,
    href : '/result?search='
},
{
    name: 'Favoritos',
    image: heart,
    href : '/favorites'
},
{
    name: 'Reservar',
    image: search,
    href : '/'
},
{
    name: 'Historial',
    image: clockCounter,
    href : '/'

}
]