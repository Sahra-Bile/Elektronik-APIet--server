import express from 'express'
import TelevisionController from '../controller/televisionController'
import { authMiddleware } from '../middleware/authMiddleware'
import televisionController from '../controller/televisionController'

export function createTelevision(): express.Router {
  const router = express.Router()
  router.post(
    '/',
    authMiddleware,
    TelevisionController.createTelevision.bind(TelevisionController),
  )
  router.get('/', TelevisionController.getAllAudio.bind(TelevisionController))
  router.get(
    '/:id',
    televisionController.getTelevisionById.bind(televisionController),
  )
  router.put(
    '/:id',
    authMiddleware,
    televisionController.updateTelevisionById.bind(televisionController),
  )

  router.delete(
    '/:id',
    authMiddleware,
    televisionController.deleteTelevision.bind(televisionController),
  )

  return router
}
