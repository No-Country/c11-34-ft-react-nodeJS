import { Request, Response } from "express";
import restaurantModel from "../models/restaurant";
// import _cloud from "../helpers/cloudinaryUpload";
// import _fs from "fs/promises";

export async function getRestaurants(req: Request, res: Response) {
  try {
    // ?buscar por correo a traves del body
    const { correo } = req.body;

    if (correo) {
      console.log("----get restaurant by correo----");
      const restaurant = await restaurantModel.findOne({ correo });
      if (!restaurant) {
        return res.status(404).json({ mensaje: "Restaurante no encontrado" });
      }
      return res.status(200).json(restaurant);
    }

    // ?buscar todos los restaurantes
    console.log("----get all Restaurants----");
    const [total, restaurants] = await Promise.all([
      restaurantModel.countDocuments(),
      restaurantModel.find({}),
    ]);

    res.status(200).json({ total, restaurants });
  } catch (error) {
    res.status(400).json({
      data: "Se presento un error al obtener la lista de restaurantes",
      error,
    });
  }
}

export async function createRestaurant(req: Request, res: Response) {
  // const eliminarImagenLocal = fs.unlink;

  try {
    console.log("----create Restaurant----");

    // const dataImg = req.file;
    // console.log(dataImg);

    const {
      nombre,
      direccion,
      telefono,
      correo,
      dias,
      horarioIn,
      horarioOut,
      tipoComida,
      mesas,
      sillasPorMesa,
      intervaloMesa,
      descripcion,
      caracteristicasPrinc,
      otrosDetalles,
      costoReserva,
      cantidadComentarios
      // id_usuario,
    } = req.body;

    // Verificar si el correo electrónico ya existe en la base de datos
    const restaurantExistente = await restaurantModel.findOne({ correo });

    if (restaurantExistente) {
      return res
        .status(409)
        .json({
          mensaje: "El correo electrónico ya tiene un restaurante registrado",
        });
    }

    // if (!dataImg?.path) {
    //   return res.status(400).json({ msg: "no se ha enviado ninguna imagen" });
    // }

    // subir la imagen a cloudinary
    // const result = await cloud.uploader.upload(dataImg.path)
    // const { public_id } = result

    // const transformedUrl = cloud.url(public_id, {
    //     width: 100,
    //     height: 100,
    //     crop: 'fill'
    // });

    // Crear el nuevo usuario
    const restaurant = new restaurantModel({ 
        nombre, direccion, telefono, 
        correo, dias, horarioIn, horarioOut, 
        tipoComida, mesas, sillasPorMesa, intervaloMesa, 
        descripcion, caracteristicasPrinc, otrosDetalles, 
        costoReserva, cantidadComentarios
    });

    // restaurant.imagenes = [transformedUrl]

    await restaurant.save();

    // await eliminarImagenLocal(dataImg.path);

    return res.status(201).json({ mensaje: "El restaurante ha sido creado correctamente" });

  } catch (error) {
    res.status(500).json({
      data: "Se presento un error al crear el restaurante",
      error,
    });
  }
}

export async function updateRestaurant(req: Request, res: Response) {
    try {
      const { id } = req.params
      const {
        nombre,
        direccion,
        telefono,
        correo,
        dias,
        horarioIn,
        horarioOut,
        tipoComida,
        mesas,
        sillasPorMesa,
        intervaloMesa,
        descripcion,
        caracteristicasPrinc,
        otrosDetalles,
        costoReserva,
        cantidadComentarios,
        id_usuario,
      } = req.body;
  
      const restaurant = await restaurantModel.findByIdAndUpdate(
        id,
        { 
            nombre, direccion, telefono, 
            correo, dias, horarioIn, horarioOut, 
            tipoComida, mesas, sillasPorMesa, intervaloMesa, 
            descripcion, caracteristicasPrinc, otrosDetalles, 
            costoReserva, cantidadComentarios, id_usuario
        },
        
        { new: true }
      )
  
      if (!restaurant) {
        return res.status(404).json({ mensaje: 'Restautanre no encontrado' })
      }
  
      console.log('----Update restaurant----')
      return res
        .status(200)
        .json({ msg: `Restaurante con id: ${id} actualizado exitosamente` })
    } catch (error) {
      res.status(500).json({
        data: 'Se presento un error al actualizar el retaurante',
        error
      })
    }
}

export async function deleteRestaurant(req: Request, res: Response) {
  try {
    console.log("----Delete Restaurant----");
    const { id } = req.params;

    const restaurant = await restaurantModel.findByIdAndDelete(id);

    if (!restaurant) {
      return res.status(404).json({ mensaje: "Restaurante no encontrado" });
    }

    return res
      .status(200)
      .json({ mensaje: "Restaurante eliminado exitosamente" });
  } catch (error) {
    res.status(500).json({
      data: "Se presento un error al eliminar el Restaurante",
      error,
    });
  }
}

const restaurantController = {
  getRestaurants,
  createRestaurant,
  updateRestaurant,
  deleteRestaurant,
};

export default restaurantController;
