import express from 'express'
import * as allData from '../controller/computerController'
import { authMiddleware } from '../middleware/authMiddleware'
import UserValidator from '../validator/validator'
import { handleValidationError } from '../middleware/handleValidationError'
export const computerRoutes = express.Router()

computerRoutes.get('/', allData.getAllComputer)

computerRoutes.get('/:id', allData.getComputerById)

computerRoutes.post('/', authMiddleware, allData.createComputer)

computerRoutes.delete(
  '/:id',
  UserValidator.checkIdParam(),
  handleValidationError,
  authMiddleware,
  allData.deleteComputer,
)

computerRoutes.put(
  '/:id',
  UserValidator.checkIdParam(),
  handleValidationError,
  authMiddleware,
  allData.updateComputerById,
)
