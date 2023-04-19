import axios, { AxiosResponse } from 'axios'
import { ICreateMobile, IMobile, IUpdateOptional } from '../src/models/IMobile'
import { Response } from 'express'

const api = axios.create({
  baseURL: 'http://localhost:1337/api',
})

export const getAll = async (): Promise<IMobile[]> => {
  const response = await api.get(`/mobiles`)

  return response.data
}

export const getById = async (id: number): Promise<IMobile | null> => {
  try {
    const response: AxiosResponse<IMobile> = await api.get(`/mobiles/${id}`)

    return response.data
  } catch (error) {
    if (error) {
      return null
    }
    throw new Error('note: something went wrong, try again later')
  }
}

export const create = async (data: ICreateMobile): Promise<ICreateMobile> => {
  return await api.post(`/mobiles`, data)
}

export const deleteById = async (id: number): Promise<IMobile | null> => {
  try {
    const response: AxiosResponse<IMobile> = await api.delete(`/mobiles/${id}`)

    return response.data
  } catch (error) {
    if (error) {
      return null
    }
    throw new Error('note: something went wrong, try again later')
  }
}

export const update = async (
  id: number,
  data: IUpdateOptional,
): Promise<IUpdateOptional> => {
  return await api.put(`/mobiles/${id}`, data)
}
