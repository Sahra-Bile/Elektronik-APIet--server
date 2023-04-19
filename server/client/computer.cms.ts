import axios, { AxiosResponse } from 'axios'
import {
  IComputer,
  ICreateComputer,
  IUpdateComputer,
} from '../src/models/IComputer'

const API_URL = 'http://localhost:1337/api'

export const getAllComputers = async (): Promise<IComputer[]> => {
  const response: AxiosResponse<IComputer[]> = await axios.get(
    `${API_URL}/computers`,
  )
  return response.data
}

export const getComputerById = async (
  id: number,
): Promise<IComputer | null> => {
  try {
    const response: AxiosResponse<IComputer> = await axios.get(
      `${API_URL}/computers/${id}`,
    )
    return response.data
  } catch (error) {
    if (error) {
      return null
    }
    throw new Error('note: something went wrong, try again later')
  }
}

export const createComputer = async (
  data: ICreateComputer,
): Promise<ICreateComputer> => {
  return await axios.post(`${API_URL}/computers`, data)
}

export const updateComputer = async (
  id: number,
  data: IUpdateComputer,
): Promise<IUpdateComputer> => {
  return await axios.put(`${API_URL}/computers/${id}`, data)
}

export const deleteComputerById = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/computers/${id}`)
}
