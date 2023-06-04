import { Router } from "express";

import reservController from "../controllers/reservController";

const routerReserv: Router = Router();

routerReserv.get("/", reservController.getReserv);

export default routerReserv;