import restController from '../controllers/restConstroller'
import { Router } from 'express'

const routerRestController = Router()

routerRestController.post('/mapcord', restController.getCoordenadas)

export default routerRestController