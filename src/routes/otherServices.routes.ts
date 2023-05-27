import restController from '../controllers/otherServices'
import { Router } from 'express'

const routerOtherServices = Router()

routerOtherServices.post('/mapcord', restController.getCoordenadas)

export default routerOtherServices
