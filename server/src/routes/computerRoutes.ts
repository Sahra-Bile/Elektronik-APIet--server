import express from 'express'
import * as allData from '../controller/computerController'
import { authMiddleware } from '../middleware/authMiddleware'
import * as validator from '../validator/computerValidator'
import { handleValidationError } from '../middleware/handleValidationError'
export const computerRoutes = express.Router()

computerRoutes.get('/', allData.getAllComputer)

computerRoutes.get(
  '/:id',
  validator.checkIdParam(),
  handleValidationError,
  allData.getComputerById,
)

computerRoutes.post(
  '/',
  validator.checkCreateComputer(),
  handleValidationError,
  authMiddleware,
  allData.createComputer,
)

computerRoutes.delete(
  '/:id',
  validator.checkIdParam(),
  handleValidationError,
  authMiddleware,
  allData.deleteComputer,
)

computerRoutes.put(
  '/:id',
  validator.checkIdParam(),
  handleValidationError,
  authMiddleware,
  allData.updateComputerById,
)
