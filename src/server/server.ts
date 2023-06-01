import express from 'express'
import cors from 'cors'
import dbConnection from '../database/dbConnection'
import routerUser from '../routes/userController.routes'
import routerAuth from '../routes/userAuth.routes'
import routerDetails from '../routes/userDetails.routes'
import routerResDetails from '../routes/restaurantDetails.routes'
import routerOtherServices from '../routes/otherServices.routes'
import routerRestaurant from '../routes/restaurantController.routes'

class Server {
  private app: express.Application;
  private port: string;
  private usuariosPath: string;
  private usuariosAuth: string;
  private usuariosDetails: string;
  private otherServices: string;
  private restaurantPath: string;
  private restaurantDetails: string;
  
  constructor() {
    this.app = express()
    this.port = process.env.PORT || '3000'
    // Define ruta de mis usuarios
    this.usuariosPath = '/api/usuarios'
    this.usuariosAuth = '/api/auth'
    this.usuariosDetails = '/api/details'
    this.restaurantDetails = '/api/restaurantDetails'
    this.otherServices = '/api/other'
    this.restaurantPath = '/api/restaurant'
    // Conectar a base de datos
    this.conectarDB()
    // Middlewares
    this.middlewares()
    // Rutas de mi aplicacion
    this.routes()
  }

  async conectarDB() {
    await dbConnection()
  }

  middlewares() {
    this.app.use(express.static('src/public'))
    // serializa objetos json
    this.app.use(express.json())
    // permite la conexion de otros servidores
    this.app.use(cors())
  }

  routes() {
    // en este middleware se definen las rutas
    // ! router es una ruta de ejemplo, colocar la suya
    this.app.use(this.usuariosPath, routerUser)
    this.app.use(this.usuariosAuth, routerAuth)
    this.app.use(this.usuariosDetails, routerDetails)
    this.app.use(this.restaurantDetails, routerResDetails)
    this.app.use(this.otherServices, routerOtherServices)
    this.app.use(this.restaurantPath, routerRestaurant)
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log('servidor levantado en el puerto: ', this.port)
    })
  }
}

export default Server
