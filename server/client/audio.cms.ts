import axios, { AxiosResponse } from 'axios'
import { IAudio, ICreateAudio, IOptional } from '../src/models/IAudio'

const API = axios.create({
  baseURL: 'http://localhost:1337/api',
})

export const getAll = async (): Promise<IAudio[] | null> => {
  try {
    const response = await API.get(`/audio-devices`)

    return response.data
  } catch (error) {
    if (error) {
      return null
    }
    throw new Error('note: something went wrong, try again later')
  }
}

export const getById = async (id: number): Promise<IAudio | null> => {
  try {
    const response = await API.get(`/audio-devices/${id}`)

    return response.data
  } catch (error) {
    if (error) {
      return null
    }
    throw new Error('note: something went wrong, try again later')
  }
}

export const create = async (data: ICreateAudio): Promise<ICreateAudio> => {
  return await API.post(`/audio-devices`, data)
}

export const deleteById = async (id: number): Promise<IAudio | null> => {
  try {
    const response: AxiosResponse<IAudio> = await API.delete(
      `/audio-devices/${id}`,
    )

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
  data: IOptional,
): Promise<IOptional> => {
  return await API.put(`/audio-devices/${id}`, data)
}
