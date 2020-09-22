import express from 'express'
import cors from 'cors'
import http from 'http'
import bodyParser from 'body-parser'
import { UI } from 'bull-board'
import queue from '@queue'

const app = express()
const server = http.Server(app)

app.use(cors())
app.use(express.json())
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
)

app.get('/api/ping', (_, res) => {
  res.json({ msg: 'pong' })
})

app.use('/queues', UI)
app.get('/tgdd', (req, res) => {
  queue.crawlTGDD.add({ url: req.query.url })
  res.json({ msg: 'ok' })
})

app.use((error, req, res, _next) => {
  res.status(500).json({
    msg: 'server error',
  })
})

app.use(function (req, res) {
  res.status(404).json({
    msg: 'Page does not exist',
  })
})

const startServer = async () => {
  try {
    const port = process.env.PORT || 5000

    server.listen(port, () => console.log(`Server started on port ${port}`))
  } catch (err) {
    console.error(err)

    process.exit(1)
  }
}

export { startServer }
