import bodyParser from 'body-parser'
import express, { Application } from 'express'
import { userRouter } from './routes/userRoutes'
import * as dotenv from 'dotenv'
import { errorHandler, notFound } from './middleware/middleware'
import { computerRoutes } from './routes/computerRoutes'
import { mobileRoutes } from './routes/mobileRoutes'
import { createAudio } from './routes/audioRoutes'
import { createTelevision } from './routes/televisionRoutes'
import cors from 'cors'
dotenv.config()

export const app: Application = express()
// app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/users', userRouter)
app.use('/computers', computerRoutes)
app.use('/mobiles', mobileRoutes)
app.use('/audio', createAudio())
app.use('/televisions', createTelevision())
app.use(notFound)
app.use(errorHandler)
