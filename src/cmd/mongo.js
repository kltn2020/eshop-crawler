import mongoose from 'mongoose'

const startMongo = async () => {
  mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })

  mongoose.set('debug', true)

  const db = mongoose.connection

  db.on('error', console.error.bind(console, 'connection error:'))

  await db.once('open', () => {
    console.log('connect to mongodb')
  })
}

export { startMongo }
