import { Router } from 'express'
import { Request, Response } from 'express'
// import Usuario from '../models/usuario'
import * as UserContrtoller from '../controllers/userController'
const router: Router = Router()

router.get('/', async (req:Request,res:Response) => {

  try {
    await UserContrtoller.getUserByEmail(req, res);
    console.log('get');
  } catch (error) {
    console.log('No se pudo consultar el usuario');
    console.log('-----------------------------');
    console.log(error);
  };

});

router.post('/', async (req:Request, res:Response) => {
  try {

    await UserContrtoller.createUsers(req, res);
    // const { nombre, correo, contrasena } = req.body
    // const usuario = new Usuario({ nombre, correo, contrasena })
    // // Guardar en bd
    // await usuario.save()
    // // response
    // res.json(usuario)
    console.log('post');
  } catch (error) {
    console.log('No se pudo guardar el usuario');
    console.log('-----------------------------');
    console.log(error);
    console.log('-----------------------------');
  };
});

router.put('/', async (req:Request, res:Response) => {
  try {
    await UserContrtoller.updateUser(req, res);
  } catch (error) {
    console.log('No se pudo actualizar los datos del usuario');
    console.log('-----------------------------');
    console.log(error);
  };
});

router.delete('/', async (req:Request, res:Response) => {
  try {
    await UserContrtoller.deleteUser(req, res);
  } catch (error) {
    console.log('No se pudo borrar el usuario');
    console.log('-----------------------------');
    console.log(error);
  };
})

export default router
