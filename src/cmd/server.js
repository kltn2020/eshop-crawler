import express from 'express'
import cors from 'cors'
import http from 'http'
import bodyParser from 'body-parser'
import { UI } from 'bull-board'
import queue from '@queue'
import User from '@models/User'
import TgddRating from '@models/TgddRating'
import TgddProduct from '@models/TgddProduct'
import Product from '@root/models/Product'
import Review from '@root/models/Review'

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

const DATA = [
  { regex: /Apple/, id: 1 },
  { regex: /Dell/, id: 2 },
  { regex: /HP/, id: 3 },
  { regex: /Asus/, id: 4 },
  { regex: /Logitech/, id: 5 },
  { regex: /Acer/, id: 6 },
  { regex: /Lenovo/, id: 7 },
  { regex: /LG/, id: 8 },
  { regex: /Huawei/, id: 9 },
  { regex: /MSI/, id: 10 },
]

function findBrand(name) {
  for (let index = 0; index < DATA.length; index++) {
    const ele = DATA[index]

    if (name.match(ele.regex)) {
      return ele.id
    }
  }
}

function xoa_dau(str) {
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a')
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e')
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i')
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o')
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u')
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y')
  str = str.replace(/đ/g, 'd')
  str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, 'A')
  str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, 'E')
  str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, 'I')
  str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, 'O')
  str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, 'U')
  str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, 'Y')
  str = str.replace(/Đ/g, 'D')
  str = str.replace(/\s/g, '')
  return str
}

app.get('/tgddImport', async (req, res) => {
  const data = await TgddRating.find({})

  for (let index = 0; index < data.length; index++) {
    const element = data[index]

    const email = `${xoa_dau(element.name)}@mail.com`.toLowerCase()

    let user = await User.findOne({ where: { email: email } })

    if (user === null) {
      user = new User()
      user.email = email
      user.passwordHash =
        '$pbkdf2-sha512$100000$ysB3RWxrS+f+5L0G6Vlikg==$YdlDikZIjntarWoSTRPo137pQVZc0owTiFGSMlkihhrFGHS1lSOe2kfV7TMBPPlbOWYcUOxJkmh/gqJrBNIl/g=='

      await user.save()
    }

    const mproduct = await TgddProduct.findById(element.product)

    const product = await Product.findOne({ where: { name: mproduct.name } })

    const review = new Review({
      content: element.content,
      point: element.point,
      userId: user.id,
      productId: product.id,
    })

    await review.save()
  }

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
