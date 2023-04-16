import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { IUser } from '../models/IUser'
import jwt_decode, { JwtPayload } from 'jwt-decode'

export const hashPassword = (password: string) => {
  const hashValue = bcrypt.hashSync(password, 8)
  return hashValue
}

export const comparePassword = (password: string, hash: string) => {
  const correct = bcrypt.compareSync(password, hash)
  return correct
}

export const getJWTToken = (user: IUser) => {
  const userData = { userId: user.id, email: user.email }
  const accessToken = jwt.sign(userData, process.env.JWT_SECRET || '')
  return accessToken
}

export const verifyJWT = (token: string) => {
  return jwt.verify(token, process.env.JWT_SECRET || '')
}

export const decodeJWT = (token: string) => {
  return jwt_decode<JwtPayload>(token || '') || null || process.env.JWT_SECRET
}
