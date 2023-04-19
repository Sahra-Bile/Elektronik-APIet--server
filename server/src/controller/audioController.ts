import * as allData from '../../client/audio.cms'
import { Request, Response } from 'express'
import asyncHandler from 'express-async-handler'
import { IAudio, ICreateAudio } from '../models/IAudio'

class AudioController {
  async getAllAudio(req: Request, res: Response) {
    const audio = await allData.getAll()
    console.log('this is audio list', audio)
    res.json(audio)
  }

  getAudioById = asyncHandler(
    async (req: Request, res: Response): Promise<void> => {
      const id = Number(req.params.id)
      const audio = await allData.getById(id)
      if (audio) {
        res.status(200).json(audio)
      } else {
        res
          .status(404)
          .json({ message: ` audio electronic with id ${id} not found` })
      }
    },
  )

  createAudio = asyncHandler(
    async (req: Request, res: Response): Promise<void> => {
      const newComputer: IAudio = req.body
      try {
        let response = await allData.create({ data: newComputer })
        if (!response.data) {
          res
            .status(400)
            .json({ message: 'something is  missing from the body' })
        } else {
          res
            .status(201)
            .json({ record: response.data, message: 'created a new audio' })
        }
      } catch (e) {
        res
          .status(500)
          .json({ error: e, message: 'faild to create a new audio' })
      }
    },
  )

  deleteAudio = asyncHandler(async (req: Request, res: Response) => {
    const id = Number(req.params.id)

    try {
      const foundObj = await allData.getById(id)

      if (!foundObj) {
        res
          .status(404)
          .json({ message: `Can not find existing audio with id - ${id}` })
      } else {
        await allData.deleteById(id)

        res
          .status(200)
          .json({ message: `deleted audio with id - ${id} successfully!` })
      }
    } catch (e) {
      res
        .status(500)
        .json({ error: e, message: `faild to deleted audio with id- ${id}` })
    }
  })

  updateAudioById = asyncHandler(
    async (req: Request, res: Response): Promise<void> => {
      const id = Number(req.params.id)
      const newUpdatedAudio: IAudio = req.body

      try {
        const foundAudio = await allData.getById(id)
        if (!foundAudio) {
          res
            .status(404)
            .json({ message: `Can not find existing audio with id - ${id}` })
        } else {
          const updatedRecord = await allData.update(id, {
            data: newUpdatedAudio,
          })

          res.status(200).json({
            data: updatedRecord.data,
            message: `Updated audio  with id - ${id} successfully!`,
          })
        }
      } catch (e) {
        res.status(500).json({
          error: e,
          message: ` faild to update audio with id - ${id}`,
        })
      }
    },
  )
}

export default new AudioController()
