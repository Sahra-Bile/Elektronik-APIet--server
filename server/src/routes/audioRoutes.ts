import express from 'express'
import AudioController from '../controller/audioController'
import { authMiddleware } from '../middleware/authMiddleware'

export function createAudio(): express.Router {
  const router = express.Router()
  router.post(
    '/',
    authMiddleware,
    AudioController.createAudio.bind(AudioController),
  )
  router.get('/', AudioController.getAllAudio.bind(AudioController))

  router.get('/:id', AudioController.getAudioById.bind(AudioController))

  router.delete(
    '/:id',
    authMiddleware,
    AudioController.deleteAudio.bind(AudioController),
  )
  router.put(
    '/:id',
    authMiddleware,
    AudioController.updateAudioById.bind(AudioController),
  )

  return router
}
