import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    return res.status(401).json({
      error: 'Unauthorized. Authentication header missing.',
    })
  }

  const token = authHeader.split(' ')[1]

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || '')
    req.body.user = decoded
    next()
  } catch (error) {
    return res.status(401).json({
      error: 'Unauthorized. Invalid token.',
    })
  }
}
