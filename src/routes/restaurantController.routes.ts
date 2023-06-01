import { Router } from "express";
import { check } from "express-validator";
import checking from '../middleware/checking';
import dataValidator from '../helpers/dataValidator';
import restaurantController from "../controllers/restaurantController";

const router: Router = Router();

router.get(
    '/',
    [
      check('correo', 'El correo no es valido')
        .optional()
        .isEmail()
        .normalizeEmail(),
      checking
    ],
    restaurantController.getRestaurants
)

router.post(
  '/',
  [
    check('nombre', 'El nombre es Obligatorio').notEmpty(),
    check('direccion', 'la direccion es obligatoria').notEmpty(),
    check('telefono', 'El telefono es Obligatorio').notEmpty().isInt(),
    check('correo', 'Verifique que el correo sea valido').notEmpty().isEmail().normalizeEmail(),
    check('dias', 'debe abrir al menos un dia a la semana').notEmpty(),
    check('horarioIn', 'la hora de apertura es obligatoria').notEmpty().isTime({hourFormat: 'hour24'}),
    check('horarioOut', 'la hora de cierre es obligatoria').notEmpty().isTime({hourFormat: 'hour24'}),
    check('tipoComida', 'se debe esteblecer el tipo de comida del restaurante').notEmpty(),
    check('mesas', 'se debe establecer el numero de mesas del restaurante').notEmpty().isInt(),
    check('sillasPorMesa', 'se debe establecer el numero de sillas por mesa del restaurante').notEmpty().isInt(),
    check('intervaloMesa', 'se debe establecer el tiempo de duracion de la reserva del restaurante').notEmpty().isInt(),
    check('descripcion', 'se debe proporcionar una descripcion del restaurante').notEmpty(),
    check('caracteristicasPrinc', 'se debe las establecer caracteristicas principales del restaurante').notEmpty(),
    check('otros detalles').optional(),
    check('costoReserva').optional(),
    check('cantidadComentarios', 'se debe una cantidad de comentarios para el restaurante').notEmpty().isInt(),
    check('descripcion', 'se debe proporcionar una descripcion del restaurante').notEmpty(),
    // check('id_Usuario', 'No es un ID valido').isMongoId(),
    // check('correo').custom(dataValidator.emailExiste),
    // check('id_Usuario').custom(dataValidator.idExiste),
    checking

  ], restaurantController.createRestaurant
)

router.put(
  '/:id',
  [
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(dataValidator.idExiste),
    checking

  ], restaurantController.updateRestaurant
)

router.delete(
    '/:id',
    [
      check('id', 'No es un ID valido').isMongoId(),
      check('id').custom(dataValidator.idExiste),
      checking
    ],
    restaurantController.deleteRestaurant
)
  

export default router;
  