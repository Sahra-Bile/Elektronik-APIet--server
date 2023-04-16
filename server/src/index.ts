import bodyParser from 'body-parser'
import express, { Application } from 'express'
import { userRouter } from './routes/userRoutes'
import * as dotenv from 'dotenv'
import { errorHandler, notFound } from './middleware/middleware'

dotenv.config()

export const app: Application = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/users', userRouter)
app.use(notFound)
app.use(errorHandler)
