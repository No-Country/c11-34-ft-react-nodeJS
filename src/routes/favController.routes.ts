import { Router } from 'express'
import Favorites from '../controllers/favController'
const routerFav: Router = Router()

routerFav.get('/:id', Favorites.getFavorites)
routerFav.put('/:id', Favorites.putFavorites)

export default routerFav
