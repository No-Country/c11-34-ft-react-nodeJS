import express from 'express'
import cors from 'cors'
import dbConnection from '../database/dbConnection'
import routerUser from '../routes/userController.routes'
import routerAuth from '../routes/userAuth.routes'
import routerDetails from '../routes/userDetails.routes'
import routerOtherServices from '../routes/otherServices.routes'
import routerRest from '../routes/restController.routes'
import routerTurns from '../routes/restTurns.routes'
import routerReservas from '../routes/reservController.routes'
import routerFav from '../routes/favController.routes'

class Server {
  private app: express.Application
  private port: string
  private usuariosPath: string
  private usuariosAuth: string
  private usuariosDetails: string
  private otherServices: string
  private restController: string
  private restTurns: string
  private restReservas: string
  private favPath: string

  constructor() {
    this.app = express()
    this.port = process.env.PORT || '3000'
    // Define ruta de mis usuarios
    this.favPath = '/api/favoritos'
    this.usuariosPath = '/api/usuarios'
    this.usuariosAuth = '/api/auth'
    this.usuariosDetails = '/api/details'
    this.otherServices = '/api/other'
    this.restController = '/api/restaurant'
    this.restTurns = '/api/restaurant/turnos'
    this.restReservas = '/api/reservas'
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
    this.app.use(this.otherServices, routerOtherServices)
    this.app.use(this.restController, routerRest)
    this.app.use(this.restTurns, routerTurns)
    this.app.use(this.restReservas, routerReservas)
    this.app.use(this.favPath, routerFav)
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log('servidor levantado en el puerto: ', this.port)
    })
  }
}

export default Server
