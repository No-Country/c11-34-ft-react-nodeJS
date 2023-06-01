import { Router } from 'express'
import { check } from 'express-validator'
import checking from '../middleware/checking'
import restaurantDetails from '../controllers/restaurantDetails'
import { upload } from '../middleware/uploadImg'

const routerResDetails: Router = Router()

routerResDetails.post(
    
  '/imagen',
  [
    upload.single('img_restaurant'),
    check('correo', 'Verifique que el correo sea valido')
      .notEmpty()
      .isEmail()
      .normalizeEmail(),
    checking
  ],
  restaurantDetails.uploadRestaurantImage
)

routerResDetails.get(
    '/',
    [
        check('correo', 'Verifique que el correo sea valido').notEmpty().isEmail().normalizeEmail(),
        checking
    ],
    restaurantDetails.getRestaurantHours
)

export default routerResDetails