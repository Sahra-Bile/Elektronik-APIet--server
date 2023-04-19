import * as mobileData from '../../client/mobile.cms'
import { Request, Response } from 'express'
import asyncHandler from 'express-async-handler'
import { IMobile } from '../models/IMobile'

export const getAllMobiles = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const mobiles = await mobileData.getAll()
    console.log('this is mobiles list', mobiles)
    res.json(mobiles)
  },
)

export const getMobileById = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const id = Number(req.params.id)
    const mobiles = await mobileData.getById(id)
    if (mobiles) {
      res.status(200).json(mobiles)
    } else {
      res
        .status(404)
        .json({ message: ` computer electronic with id ${id} not found` })
    }
  },
)

export const createMobiles = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const newMobile: IMobile = req.body
    try {
      let response = await mobileData.create({ data: newMobile })
      if (!response.data) {
        res.status(400).json({ message: 'something is  missing from the body' })
      } else {
        res.status(201).json({
          record: response.data,
          message: 'created a new mobile object',
        })
      }
    } catch (e) {
      res
        .status(500)
        .json({ error: e, message: 'faild to create a new mobile object' })
    }
  },
)

export const deleteMobile = asyncHandler(
  async (req: Request, res: Response) => {
    const id = Number(req.params.id)

    try {
      const record = await mobileData.getById(id)

      if (!record) {
        res
          .status(404)
          .json({ message: `Can not find existing mobile with id - ${id}` })
      } else {
        await mobileData.deleteById(id)

        res
          .status(200)
          .json({ message: `deleted mobile with id - ${id} successfully!` })
      }
    } catch (e) {
      res
        .status(500)
        .json({ error: e, message: `faild to deleted mobile with id- ${id}` })
    }
  },
)

export const updateMobilById = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const id = Number(req.params.id)
    const newUpdatedMobile: IMobile = req.body

    try {
      const found = await mobileData.getById(id)
      if (!found) {
        res
          .status(404)
          .json({ message: `Can not find existing mobile with id - ${id}` })
      } else {
        const updatedRecord = await mobileData.update(id, {
          data: newUpdatedMobile,
        })

        res.status(200).json({
          data: updatedRecord.data,
          message: `Updated mobile  with id - ${id} successfully!`,
        })
      }
    } catch (e) {
      res.status(500).json({
        error: e,
        message: ` faild to update mobile with id - ${id}`,
      })
    }
  },
)
