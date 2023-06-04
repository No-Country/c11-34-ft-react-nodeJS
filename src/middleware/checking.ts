import { Result, ValidationError, validationResult } from 'express-validator'
import { Response, Request, NextFunction } from 'express'

const checking = (req: Request, res: Response, next: NextFunction) => {
  const errors: Result<ValidationError> = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ data: errors })
  }
  next()
}

export const checkingParams = (req: Request, res: Response, next: NextFunction) => {
  const errors: Result<ValidationError> = validationResult(req.query)
  if (!errors.isEmpty()) {
    return res.status(400).json({ data: errors })
  }
  next()
}

export default checking
