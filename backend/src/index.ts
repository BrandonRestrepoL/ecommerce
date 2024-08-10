import "reflect-metadata"
import {connectDB} from './dataSource'
import app from "./app"
import { PORT } from "./config"

const startServer = async () => {
  await connectDB()

  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  })
}

startServer();