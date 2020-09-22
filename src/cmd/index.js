import { startServer } from './server'
import { startMongo } from './mongo'
import { startConsumer } from '@consumer'

const excute = async () => {
  await startMongo()
  await startConsumer()
  startServer()
}

export { excute }
