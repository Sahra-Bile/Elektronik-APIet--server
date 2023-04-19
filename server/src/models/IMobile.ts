export interface IMobile {
  id?: number
  name: string
  description: string
  maker: string
  price: string
  screen_type: string
  imgeUrl: string
}

export interface ICreateMobile {
  data: IMobile
}

export interface IUpdateOptional {
  data: IMobile
}
