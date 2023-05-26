import { Router } from 'express'
import { check } from 'express-validator'
import checking from '../middleware/checking'
import userDetails from '../controllers/userDetails'
import { upload } from '../middleware/uploadImg'

const routerDetails: Router = Router()

routerDetails.post(
  '/imagen',
  [
    upload.single('img_perfil'),
    check('correo', 'Verifique que el correo sea valido')
      .notEmpty()
      .isEmail()
      .normalizeEmail(),
    checking
  ],
  userDetails.uploadImage
)

routerDetails.post('/gustos', userDetails.addGustos)

export default routerDetails
