"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPlaces = void 0;
const getPlaces = async (data, date, turn) => {
    const reservaDis = parseInt(turn);
    const cantReserva = data.reservas[date];
    if (!cantReserva) {
        return {
            disponible: data.reservas['fecha'][reservaDis]
        };
    }
    return { disponible: cantReserva[reservaDis] };
};
exports.getPlaces = getPlaces;
//# sourceMappingURL=places.js.map