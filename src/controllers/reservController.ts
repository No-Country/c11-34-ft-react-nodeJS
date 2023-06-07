import { Request, Response } from 'express'
import Reservas from '../models/reservas'
import Restaurant from '../models/restaurant'
import Turno from '../models/turnos'

const getReserv = async (req: Request, res: Response) => {
  try {
    const { correo } = req.query
    const reservas = await Reservas.find({ correoComensal: correo })
    if (reservas.length === 0 || !reservas) {
      return res
        .status(404)
        .json({ msg: 'No se encontraron reservas, verificar el correo' })
    }

    res.status(200).json({
      msg: 'Reservas obtenidas exitosamente',
      reservas
    })
  } catch (error) {
    res.status(500).json({
      msg: 'Se presento un error al obtener las reservas',
      error
    })
  }
}

// todo editar reservas
// * al editar la cantidad de personas medir la dimension del array
const editReserv = async (req: Request, res:Response) => {

  try {
    const {id} = req.query;
    const {hora, comensales} = req.body;
    const reserva = await Reservas.findById(id);
    
    if(!reserva){
      return res.status(404).json({ msg: "No se ha encontrado reserva con ese id"});
    };
    
    const restaurante = await Restaurant.findById(reserva.id_restaurante);
    const turno = await Turno.findOne({id_restaurante: reserva.id_restaurante});

    if (!restaurante || !turno){
      return res.status(404).json({ msg: "Se ha presentado un error"});
    };

    if(hora && comensales){

      let espacioReserva: number = -1;
      let espacioReservaPrePut: number = -1;

      
      for (let i = 0; i < restaurante.turnos; i++) {
        const limiteInferior = turno.horaApertura + i * turno.duracionRes;
        const limiteSuperior = limiteInferior + turno.duracionRes;
      
        if (hora >= limiteInferior && hora < limiteSuperior) {
          espacioReserva = i; // Se encuentra el espacio de reserva correspondiente
          break;
        };
      };

      for (let i = 0; i < restaurante.turnos; i++) {
        const limiteInferior = turno.horaApertura + i * turno.duracionRes;
        const limiteSuperior = limiteInferior + turno.duracionRes;
      
        if (parseInt(reserva.hora.split(":")[0]) >= limiteInferior && parseInt(reserva.hora.split(":")[0]) < limiteSuperior) {
          espacioReservaPrePut = i; // Se encuentra el espacio de reserva correspondiente
          break;
        };
      };

      if(espacioReserva == -1 || espacioReservaPrePut == -1){
        return res.status(400).json({ msg : "no se encontro un espacio de reserva"});
      };

      if(turno.reservas[reserva.fecha][espacioReserva] < comensales){
        return res.status(400).json({ msg : "no hay espacio disponible para la reserva"});
      };

      // console.log(`turno.reservas[${reserva.fecha}][${espacioReservaPrePut}]`);
      // console.log("---------------"+turno.reservas[reserva.fecha][espacioReservaPrePut]);
      turno.reservas[reserva.fecha][espacioReservaPrePut] = (turno.reservas[reserva.fecha][espacioReservaPrePut] + (Math.ceil((reserva.comensales / turno.personasPorMesa)) * turno.personasPorMesa));
      // console.log(`turno.reservas[${reserva.fecha}][${espacioReservaPrePut}]`);
      // console.log("---------------"+turno.reservas[reserva.fecha][espacioReservaPrePut]);
      // console.log(`turno.reservas[${reserva.fecha}][${espacioReserva}]`);
      // console.log("---------------"+turno.reservas[reserva.fecha][espacioReserva]);
      turno.reservas[reserva.fecha][espacioReserva] = (turno.capacidadMax - (Math.ceil((reserva.comensales / turno.personasPorMesa)) * turno.personasPorMesa));
      // console.log(`turno.reservas[${reserva.fecha}][${espacioReserva}]`);
      // console.log("---------------"+turno.reservas[reserva.fecha][espacioReserva]);
      reserva.hora = `${hora}:00`;
      reserva.comensales = comensales;
      const reservas = turno.reservas;
      console.log(reservas);
      
      const turnoUpdate = await Turno.findByIdAndUpdate(turno._id, {reservas});
      await reserva.save();

      if(!turnoUpdate){
        res.status(400).json({ msg: "se presento un problema actualizando el turno"});
      };

      return res.status(200).json({ msg : "Se actualizo la hora y los comensales de la reserva con exito"});



    };

    if(hora && !comensales){

      let espacioReserva: number = -1;
      let espacioReservaPrePut: number = -1;

      for (let i = 0; i < restaurante.turnos; i++) {
        const limiteInferior = turno.horaApertura + i * turno.duracionRes;
        const limiteSuperior = limiteInferior + turno.duracionRes;
      
        if (hora >= limiteInferior && hora < limiteSuperior) {
          espacioReserva = i; // Se encuentra el espacio de reserva correspondiente
          break;
        };
      };

      for (let i = 0; i < restaurante.turnos; i++) {
        const limiteInferior = turno.horaApertura + i * turno.duracionRes;
        const limiteSuperior = limiteInferior + turno.duracionRes;
      
        if (parseInt(reserva.hora.split(":")[0]) >= limiteInferior && parseInt(reserva.hora.split(":")[0]) < limiteSuperior) {
          espacioReservaPrePut = i; // Se encuentra el espacio de reserva correspondiente
          break;
        };
      };

      if(espacioReserva == -1 || espacioReservaPrePut == -1){
        return res.status(400).json({ msg : "no se encontro un espacio de reserva"});
      };

      if(turno.reservas[reserva.fecha][espacioReserva] < reserva.comensales){
        return res.status(400).json({ msg : "no hay espacio disponible para la reserva"});
      }
      
      turno.reservas[reserva.fecha][espacioReservaPrePut] = (turno.reservas[reserva.fecha][espacioReservaPrePut] + (Math.ceil((reserva.comensales / turno.personasPorMesa)) * turno.personasPorMesa));
      turno.reservas[reserva.fecha][espacioReserva] = (turno.capacidadMax - (Math.ceil((reserva.comensales / turno.personasPorMesa)) * turno.personasPorMesa));
      const reservas = turno.reservas;
      const turnoUpdate = await Turno.findByIdAndUpdate(turno._id, {reservas});
      reserva.hora = `${hora}:00`;
      await reserva.save();

      if(!turnoUpdate){
        res.status(400).json({ msg: "se presento un problema actualizando el turno"});
      };

      return res.status(200).json({ msg : "Se actualizo la hora de la reserva con exito"});
      

    };

    if(!hora && comensales){
      const horaReserva = parseInt(reserva.hora.split(":")[0]);
      let espacioReserva: number = -1;

      for (let i = 0; i < restaurante.turnos; i++) {
        const limiteInferior = turno.horaApertura + i * turno.duracionRes;
        const limiteSuperior = limiteInferior + turno.duracionRes;
      
        if (horaReserva >= limiteInferior && horaReserva < limiteSuperior) {
          espacioReserva = i; // Se encuentra el espacio de reserva correspondiente
          break;
        };
      };

      if(espacioReserva == -1){
        return res.status(400).json({ msg : "no se encontro un espacio de reserva"});
      };

      if(turno.reservas[reserva.fecha][espacioReserva] < comensales){
        return res.status(400).json({ msg : "no hay espacio disponible para la reserva"});
      };
      console.log(`turno.reservas[${reserva.fecha}][${espacioReserva}]`);
      console.log("---------------"+turno.reservas[reserva.fecha][espacioReserva]);
      turno.reservas[reserva.fecha][espacioReserva] = (turno.capacidadMax - (Math.ceil((comensales / turno.personasPorMesa)) * turno.personasPorMesa));
      console.log("---------------"+turno.reservas[reserva.fecha][espacioReserva]);
      reserva.comensales = comensales;
      await reserva.save();
      const reservas = turno.reservas;
      const turnoUpdate = await Turno.findByIdAndUpdate(turno._id, {reservas});
      // await turno.save();

      if(!turnoUpdate){
        res.status(400).json({ msg: "se presento un problema actualizando el turno"});
      };

      return res.status(200).json({ msg : "Se actualizo la hora de la reserva con exito"});

    }

    return res.status(400).json({ msg : "No se proporcionaron datos para actualizar"});

  } catch (error) {
    res.status(400).json({
      msg : "se presento un problema al actualizar la reserva",
      error
    });
  };

}
//todo eliminar reservas
//* al eliminar devolver el valor al array
const deleteReserv = async (req: Request, res: Response) => {
  try {
    const { id } = req.params


    const reserva = await Reservas.findById(id)

    if (!reserva) {
      return res.status(404).json({
        msg: 'No se encontró la reserva , verifique el ID'
      })
    }

    const { id_restaurante, fecha, turno, comensales } = reserva

    const [turnoRest] = await Turno.find({ id_restaurante })

    if (!turnoRest) {
      return res.status(404).json({
        msg: 'No se encontró el restaurante'
      })
    }

    //definimos la cantidad de sillas que tomo la reserva
    const cantidad = (Math.ceil(
      (comensales / turnoRest.personasPorMesa) as number
    ) * turnoRest.personasPorMesa) as number

    //actualizamos el array de reservas
    turnoRest.reservas[fecha][turno] += cantidad

    //actualizamos las reservas antes de eliminar
    await Turno.findByIdAndUpdate(turnoRest._id, {
      reservas: turnoRest.reservas
    })

    //eliminamos el registro de la reserva
    await Reservas.findByIdAndDelete(id)

    res.status(200).json({ msg: 'reserva eliminada Correctamente' })
    //await Reservas.findByIdAndDelete(id)
  } catch (error) {
    res.status(500).json({
      msg: 'Se presento un error al eliminar la reserva',
      error
    })
  }
}
const reservController = { getReserv, editReserv, deleteReserv }

export default reservController
