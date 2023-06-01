"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postRestaurant = void 0;
const postRestaurant = async (req, res) => {
    try {
        const dataImg = req.files;
        const allData = req.body;
        console.log({ dataImg });
        if (!dataImg) {
            return res.status(400).json({
                msg: 'No se subio ninguna imagen'
            });
        }
        const transformarStringtoArray = (cadena) => {
            const resultado = JSON.parse(cadena.replace(/'/g, '"'));
            return resultado;
        };
        allData.dias = transformarStringtoArray(allData.dias);
        allData.tipoComida = transformarStringtoArray(allData.tipoComida);
        allData.caracteristicasPrinc = transformarStringtoArray(allData.caracteristicasPrinc);
        allData.otrosDetalles = transformarStringtoArray(allData.otrosDetalles);
        const horaI = parseInt(allData.horarioIn.split(':')[0], 10);
        const horaO = parseInt(allData.horarioOut.split(':')[0], 10);
        const capacidadMax = allData.sillasPorMesa * allData.mesas;
        const turnos = Math.trunc((horaO - horaI) / allData.intervaloMesa);
        const reservas = {
            fecha: Array(turnos).fill(capacidadMax)
        };
        console.log(allData);
        console.log({ horaI, horaO, capacidadMax, turnos, reservas });
        res.json({
            msg: 'postRestaurant'
        });
    }
    catch (error) {
        res.status(500).json({
            msg: 'Error al crear el restaurante, verificar que los datos sean correctos',
            error
        });
    }
};
exports.postRestaurant = postRestaurant;
//# sourceMappingURL=restController.js.map