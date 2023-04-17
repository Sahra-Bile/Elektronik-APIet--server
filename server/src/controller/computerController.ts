import { getAllComputers } from '../../client/computer.cms'
import * as computerData from '../../client/computer.cms'
import { Request, Response } from 'express'
import { IComputer } from '../models/IComputer'

export const getAllComputer = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const computers = await computerData.getAllComputers()
  res.json(computers)
}

export const getComputerById = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const id = Number(req.params.id)
  const computer = await computerData.getComputerById(id)
  if (computer) {
    res.status(200).json(computer)
  } else {
    res
      .status(404)
      .json({ message: ` computer electronic with id ${id} not found` })
  }
}

export const createComputer = async (req: Request, res: Response) => {
  const newComputer: IComputer = req.body
  try {
    let response = await computerData.createComputer({ data: newComputer })
    if (!response.data) {
      return res
        .status(400)
        .json({ message: 'something is  missing from the body' })
    } else {
      return res
        .status(201)
        .json({ record: response.data, message: 'created a new computer' })
    }
  } catch (e) {
    return res
      .status(500)
      .json({ error: e, message: 'faild to create a new computer' })
  }
}

export const updateComputerById = async (req: Request, res: Response) => {
  const id = Number(req.params.id)
  const newUpdatedComputer: IComputer = req.body

  try {
    const foundComputer = await computerData.getComputerById(id)
    if (!foundComputer) {
      return res
        .status(404)
        .json({ message: `Can not find existing computer with id - ${id}` })
    } else {
      const updatedRecord = await computerData.updateComputer(id, {
        data: newUpdatedComputer,
      })

      return res.status(200).json({
        record: updatedRecord.data,
        message: `Updated computer  with id - ${id} successfully!`,
      })
    }
  } catch (e) {
    res
      .status(500)
      .json({ error: e, message: ` faild to update computer with id - ${id}` })
  }
}

export const deleteComputer = async (req: Request, res: Response) => {
  const id = +req.params.id

  try {
    const record = await computerData.getComputerById(id)

    if (!record) {
      return res
        .status(404)
        .json({ message: `Can not find existing computer with id - ${id}` })
    } else {
      await computerData.deleteComputerById(id)

      return res
        .status(200)
        .json({ message: `deleted computer with id - ${id} successfully!` })
    }
  } catch (e) {
    res
      .status(500)
      .json({ error: e, message: `faild to deleted computer with id- ${id}` })
  }
}
