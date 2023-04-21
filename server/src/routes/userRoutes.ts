import express from 'express'
import * as userController from '../controller/userController'
import { authMiddleware } from '../middleware/authMiddleware'
import UserValidator from '../validator/userValidator'
import { handleValidationError } from '../middleware/handleValidationError'

export const userRouter = express.Router()

userRouter.post(
  '/register',
  UserValidator.checkCreateUser(),
  handleValidationError,
  userController.createUser,
)

userRouter.get('/', userController.getAllUser)

userRouter.post(
  '/login',
  UserValidator.checkLogin(),
  handleValidationError,
  userController.logIn,
)
