import axios, { AxiosResponse } from 'axios'
import { ITelevision, ITelevisionOptional } from '../src/models/ITelevision'

const api = axios.create({
  baseURL: 'http://localhost:1337/api',
})

export const getAll = async (): Promise<ITelevision[]> => {
  const response: AxiosResponse<ITelevision[]> = await api.get(`/televisions`)

  return response.data
}

export const getById = async (id: number): Promise<ITelevision | null> => {
  try {
    const response: AxiosResponse<ITelevision> = await api.get(
      `/televisions/${id}`,
    )

    return response.data
  } catch (error) {
    if (error) {
      return null
    }
    throw new Error('note: something went wrong, try again later')
  }
}

export const add = async (data: ITelevisionOptional) => {
  return await api.post(`/televisions`, data)
}

export const update = async (id: number, data: ITelevisionOptional) => {
  return await api.put(`/televisions/${id}`, data)
}

export const deleteById = async (id: number): Promise<ITelevision | null> => {
  try {
    const response: AxiosResponse<ITelevision> = await api.delete(
      `/televisions/${id}`,
    )

    return response.data
  } catch (error) {
    if (error) {
      return null
    }
    throw new Error('note: something went wrong, try again later')
  }
}
