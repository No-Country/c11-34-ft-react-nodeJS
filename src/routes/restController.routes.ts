import { Router } from 'express'
import { postRestaurant } from '../controllers/restController'
import { upload } from '../middleware/uploadImg'
const routerRest:Router = Router()

routerRest.get('/',(_req, res) => {
  res.json({
    msg: 'getRestaurant'
  })
})
routerRest.post('/',upload.array("images", 4), postRestaurant)

export default routerRest
