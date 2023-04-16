import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

export const notFound = (req: Request, res: Response, next: NextFunction) => {
  res.status(404)
  const error = new Error(`🔍 - Not Found - ${req.originalUrl}`)
  next(error)
}

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode
  res.status(statusCode)
  res.json({
    message: err?.message,
    stack: err?.stack,
  })
}
