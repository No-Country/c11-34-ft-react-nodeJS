import { Request, Response } from "express";
import fs from "fs/promises";
import restaurantModel from "../models/restaurant";
import cloud from "../helpers/cloudinaryUpload";

export async function uploadRestaurantImage(req: Request, res: Response) {
    const eliminarImagenLocal = fs.unlink;

    try {
        const dataImg = req.file;
        const { correo } = req.body;

        // validar que se haya enviado una imagen
        if (!dataImg?.path) {
            return res.status(400).json({ msg: "no se ha enviado ninguna imagen" });
        }

        // validar que el restaurant exista
        console.log("---El restaurant existe---");
        const restaurant = await restaurantModel.findOne({ correo });

        if (!restaurant) {
            return res.status(404).json({ msg: "restaurant no encontrado" });
        }

        // subir la imagen a cloudinary
        console.log("------------Cloud uploader-----------");
        
        const result = await cloud.uploader.upload(dataImg.path);
        const { public_id } = result;

        // transformar la imagen para que sea mas pequeña
        const transformedUrl = cloud.url(public_id, {
            width: 1920,
            height: 1080,
            crop: "fill",
        });

        // actualizar el restaurant.imagen con la url de la imagen
        restaurant.imagenes = [transformedUrl];
        await restaurant.save();
        await eliminarImagenLocal(dataImg.path);
        return res.status(200).json({ msg: "imagen subida correctamente", url: transformedUrl });

    } catch (error) {
        return res.status(500).json({ msg: 'error al subir la imagen' })
    }
}

export async function getRestaurantHours(req:Request, res:Response) {

    try {

        const {correo} = req.body;

        const restaurant = await restaurantModel.findOne({ correo });

        if (!restaurant) {
            return res.status(404).json({ mensaje: "Restaurante no encontrado" });
        }

        const horarioIn = restaurant.horarioIn.split(":");
        const horarioOut = restaurant.horarioOut.split(":")

        let horasAbierto:number = parseInt(horarioOut[0]) - parseInt(horarioIn[0]);
        // let minutos: number;
        if(parseInt(horarioOut[1]) - parseInt(horarioIn[1]) < 0){
            horasAbierto--;
            // minutos = 60 + (parseInt(horarioOut[0]) - parseInt(horarioIn[0]));
        }/*else {
            minutos = (parseInt(horarioOut[1]) - parseInt(horarioIn[1]));
        };*/
        console.log(`-------${horasAbierto}---------`);

        const cantidadTurnos:number = Math.floor(horasAbierto/restaurant.intervaloMesa)

        let reserva: Array<Number> = [];
        for (let index = 0; index < cantidadTurnos; index++) {
            reserva.push(restaurant.mesas * restaurant.sillasPorMesa);  
        }

        return res.status(200).json({
            "horasAbierto":horasAbierto,
            "cantidadTurnos":cantidadTurnos,
            "reserva":reserva
        })

    } catch (error) {
        
    }
}

const restaurantDetails = {
    uploadRestaurantImage,
    getRestaurantHours
}

export default restaurantDetails