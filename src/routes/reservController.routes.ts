import { Router } from 'express'

import reservController from '../controllers/reservController'

const routerReserv: Router = Router()

routerReserv.get('/', reservController.getReserv)
routerReserv.delete('/:id', reservController.deleteReserv)

export default routerReserv
