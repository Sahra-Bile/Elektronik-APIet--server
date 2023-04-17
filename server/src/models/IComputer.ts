export interface IComputer {
  id?: number
  name: string
  description: string
  maker: string
  processor: string
  price: number
  imageUrl: string
}

export interface ICreateComputer {
  data: IComputer
}

export interface IUpdateComputer {
  data: IComputer
}
