import { app } from './src/index'

const port = process.env.PORT || 4444

const start = () => {
  try {
    app.listen(port, () =>
      console.log(`SERVER RUNNING ON PORT: http://localhost:${port}`),
    )
  } catch (e) {
    console.log(`we have some error in the server: ${e}`)
  }
}

start()
