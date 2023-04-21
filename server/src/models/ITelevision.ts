export interface ITelevision {
  id?: number
  name: string
  description: string
  maker: string
  imageUrl: string
  price: number
  screen_size: number
}

export interface ITelevisionOptional {
  data: ITelevision
}
