import { Router } from 'express'
import { postRestaurant } from '../controllers/restController'

const routerRest:Router = Router()

routerRest.get('/', (_req, res) => {
  res.json({
    msg: 'getRestaurant'
  })
})
routerRest.post('/', postRestaurant)

export default routerRest
