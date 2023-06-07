"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dbConnection_1 = __importDefault(require("../database/dbConnection"));
const userController_routes_1 = __importDefault(require("../routes/userController.routes"));
const userAuth_routes_1 = __importDefault(require("../routes/userAuth.routes"));
const userDetails_routes_1 = __importDefault(require("../routes/userDetails.routes"));
const otherServices_routes_1 = __importDefault(require("../routes/otherServices.routes"));
const restController_routes_1 = __importDefault(require("../routes/restController.routes"));
const restTurns_routes_1 = __importDefault(require("../routes/restTurns.routes"));
const reservController_routes_1 = __importDefault(require("../routes/reservController.routes"));
const favController_routes_1 = __importDefault(require("../routes/favController.routes"));
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || '3000';
        this.favPath = '/api/favoritos';
        this.usuariosPath = '/api/usuarios';
        this.usuariosAuth = '/api/auth';
        this.usuariosDetails = '/api/details';
        this.otherServices = '/api/other';
        this.restController = '/api/restaurant';
        this.restTurns = '/api/restaurant/turnos';
        this.restReservas = '/api/reservas';
        this.conectarDB();
        this.middlewares();
        this.routes();
    }
    async conectarDB() {
        await (0, dbConnection_1.default)();
    }
    middlewares() {
        this.app.use(express_1.default.static('src/public'));
        this.app.use(express_1.default.json());
        this.app.use((0, cors_1.default)());
    }
    routes() {
        this.app.use(this.usuariosPath, userController_routes_1.default);
        this.app.use(this.usuariosAuth, userAuth_routes_1.default);
        this.app.use(this.usuariosDetails, userDetails_routes_1.default);
        this.app.use(this.otherServices, otherServices_routes_1.default);
        this.app.use(this.restController, restController_routes_1.default);
        this.app.use(this.restTurns, restTurns_routes_1.default);
        this.app.use(this.restReservas, reservController_routes_1.default);
        this.app.use(this.favPath, favController_routes_1.default);
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log('servidor levantado en el puerto: ', this.port);
        });
    }
}
exports.default = Server;
//# sourceMappingURL=server.js.map