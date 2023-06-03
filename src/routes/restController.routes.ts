import { Router } from 'express'
import restController from '../controllers/restController'
import { upload } from '../middleware/uploadImg'
const routerRest: Router = Router()

routerRest.get('/', restController.getRestaurant)
routerRest.post('/', upload.array('images', 4), restController.postRestaurant)
routerRest.put('/:id', restController.putRestaurant)
routerRest.delete('/:id', restController.deleteRestaurant)

export default routerRest
