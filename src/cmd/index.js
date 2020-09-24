import { startServer } from './server'
import { startMongo } from './mongo'
import { startSequelize } from './sequelize'
import { startConsumer } from '@consumer'

const excute = async () => {
  await startMongo()
  await startSequelize()
  await startConsumer()
  startServer()
}

export { excute }
