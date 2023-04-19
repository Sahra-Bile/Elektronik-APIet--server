export interface IAudio {
  id?: number
  name: string
  description: string
  maker: string
  price: number
  effect: number
  imageUrl: string
}

export interface ICreateAudio {
  data: IAudio
}

export interface IOptional {
  data: IAudio
}
