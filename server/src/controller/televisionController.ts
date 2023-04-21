import * as allData from '../../client/television.cms'
import { Request, Response } from 'express'
import asyncHandler from 'express-async-handler'
import { ITelevision } from '../models/ITelevision'

class TelevisionController {
  async getAllAudio(req: Request, res: Response) {
    const records = await allData.getAll()
    console.log('this is television list', records)
    res.json(records)
  }

  getTelevisionById = asyncHandler(
    async (req: Request, res: Response): Promise<void> => {
      const id = Number(req.params.id)
      const record = await allData.getById(id)
      if (record) {
        res.status(200).json(record)
      } else {
        res.status(404).json({ message: `  TV with id ${id} not found` })
      }
    },
  )

  createTelevision = asyncHandler(
    async (req: Request, res: Response): Promise<void> => {
      const newTelevision: ITelevision = req.body
      try {
        let response = await allData.add({ data: newTelevision })
        if (!response.data) {
          res
            .status(400)
            .json({ message: 'something is  missing from the body' })
        } else {
          res.status(201).json({
            record: response.data,
            message: 'created a new Television',
          })
        }
      } catch (e) {
        res
          .status(500)
          .json({ error: e, message: 'faild to create a new  Television' })
      }
    },
  )

  updateTelevisionById = asyncHandler(
    async (req: Request, res: Response): Promise<void> => {
      const id = Number(req.params.id)
      const newUpdatedTelevision: ITelevision = req.body

      try {
        const found = await allData.getById(id)
        if (!found) {
          res.status(404).json({
            message: `Can not find existing Television with id - ${id}`,
          })
        } else {
          const updatedRecord = await allData.update(id, {
            data: newUpdatedTelevision,
          })

          res.status(200).json({
            data: updatedRecord.data,
            message: `Updated Television  with id - ${id} successfully!`,
          })
        }
      } catch (e) {
        res.status(500).json({
          error: e,
          message: ` faild to update Television with id - ${id}`,
        })
      }
    },
  )

  deleteTelevision = asyncHandler(async (req: Request, res: Response) => {
    const id = Number(req.params.id)

    try {
      const foundObj = await allData.getById(id)

      if (!foundObj) {
        res
          .status(404)
          .json({ message: `Can not find existing Television with id: ${id}` })
      } else {
        await allData.deleteById(id)

        res
          .status(200)
          .json({ message: `deleted Television with id: ${id} successfully!` })
      }
    } catch (e) {
      res
        .status(500)
        .json({
          error: e,
          message: `faild to deleted Television with id: ${id}`,
        })
    }
  })
}

export default new TelevisionController()
