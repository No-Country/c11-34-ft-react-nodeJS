import { Router } from 'express'
import { checkLogin, googleSignIn } from '../controllers/userAuth'
import { check } from 'express-validator'
import checking from '../middleware/checking'
const routerAuth: Router = Router()

routerAuth.post(
  '/login',
  [
    check('correo', 'el Correo es obligatorio').isEmail().normalizeEmail(),
    check('contrasena', 'La contraseña es obligatoria').notEmpty(),
    checking
  ],
  checkLogin
)

routerAuth.post(
  '/google',
  [check('id_token_google', 'el Id_token es necesario').notEmpty()],
  googleSignIn
)

export default routerAuth
