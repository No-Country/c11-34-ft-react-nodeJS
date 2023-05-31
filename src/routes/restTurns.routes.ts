import { Router } from 'express'
import restTurns from '../controllers/restTurns'

const routerRestTurns: Router = Router()

routerRestTurns.get('/', restTurns.getTurns)
routerRestTurns.post('/', restTurns.postTurns)

export default routerRestTurns
