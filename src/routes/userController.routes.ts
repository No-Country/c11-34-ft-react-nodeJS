import { Router } from 'express'
import { check } from 'express-validator'
import checking from '../middleware/checking'
import dataValidator from '../helpers/dataValidator'
import userController from '../controllers/userController'

const router: Router = Router()

router.get(
  '/',
  [
    check('correo', 'El correo no es valido')
      .optional()
      .isEmail()
      .normalizeEmail(),
    checking
  ],
  userController.getUsers
)

router.post(
  '/',
  [
    check('nombre', 'El nombre es Obligatorio').notEmpty(),
    check('correo', 'Verifique que el correo sea valido')
      .notEmpty()
      .isEmail()
      .normalizeEmail(),
    check('contrasena', 'El password debe contener mas de 4 letras')
      .notEmpty()
      .isLength({ min: 4 }),
    check('correo').custom(dataValidator.emailExiste),
    checking
  ],
  userController.createUsers
)

router.put(
  '/:id',
  [
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(dataValidator.idExiste),
    checking
  ],
  userController.updateUser
)

router.delete(
  '/:id',
  [
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(dataValidator.idExiste),
    checking
  ],
  userController.deleteUser
)

export default router
