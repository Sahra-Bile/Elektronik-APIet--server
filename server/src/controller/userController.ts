import asyncHandler from 'express-async-handler'
import * as userData from '../database/db'
import { Request, Response } from 'express'
import * as utils from '../database/utills'

import { IUser } from '../models/IUser'
import { hashPassword } from '../database/utills'

export const createUser = asyncHandler(async (req: Request, res: Response) => {
  let email = req.body.email
  const body = req.body
  body.password = hashPassword(body.password)
  body.confirmPassword = hashPassword(body.confirmPassword)

  await userData.findUserByEmail(email, (error: Error, results: any) => {
    const count = results[0].count

    const emailExists = count === 1
    try {
      if (!emailExists) {
        const record = userData.register({ ...body }, (err: any) => {
          if (err)
            return res.status(400).json({
              err,
              message: 'faild to   register',
            })
          return res.status(201).json({
            record,
            message: 'created a user account Successfully!',
          })
        })
      } else {
        return res
          .status(409)
          .json({ message: `User with email ${email} already exists!` })
      }
    } catch (e) {
      return res.status(500).json({ msg: 'fail to register' })
    }
  })
})

export const getAllUser = asyncHandler(async (req: Request, res: Response) => {
  try {
    await userData.getUser((err: any, user: IUser[]) => {
      if (err)
        res.status(404).json({
          err,
          mgs: `could not find  list with user`,
        })
      res.status(200).json({
        user,
        mgs: `here you go  all  users from database`,
      })
    })
  } catch (e) {
    res.status(500).json({
      mgs: `faild to read  user from database`,
    })
  }
})

export const logIn = asyncHandler(async (req: any, res: any) => {
  const { email, password } = req.body

  await userData.logIn(email, (error: Error, user: IUser) => {
    if (error) {
      res.status(500).send(error)
    } else if (user) {
      const hashedPassword = user.password
      const correctPassword = utils.comparePassword(password, hashedPassword)

      if (correctPassword) {
        const jwtToken = utils.getJWTToken(user)
        res
          .status(200)
          .json({ mgs: `Welcome back ${user.firstName}!`, jwtToken })
      } else {
        res.sendStatus(404)
      }
    } else {
      res.sendStatus(404)
    }
  })
})
