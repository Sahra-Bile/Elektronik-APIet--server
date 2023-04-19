import express from 'express'
import * as allData from '../controller/mobileController'
import { authMiddleware } from '../middleware/authMiddleware'
import UserValidator from '../validator/validator'
import { handleValidationError } from '../middleware/handleValidationError'

export const mobileRoutes = express.Router()

mobileRoutes.get('/', allData.getAllMobiles)

mobileRoutes.get('/:id', allData.getMobileById)

mobileRoutes.post('/', authMiddleware, allData.createMobiles)

mobileRoutes.delete('/:id', authMiddleware, allData.deleteMobile)

mobileRoutes.put('/:id', authMiddleware, allData.updateMobilById)
