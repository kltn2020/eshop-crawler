import puppeteer from 'puppeteer'
import axios from 'axios'
import { parse } from 'node-html-parser'
import TgddProduct from '@models/TgddProduct'
import cheerio from 'cheerio'

const productIDRegex = /productid=(\d+)/
const PRODUCT_URL =
  'https://www.thegioididong.com/aj/ProductV4/GetFullSpec?productID='

const convertData = [
  { char: /&#253;/g, trans: 'ý' },
  { char: /&#224;/g, trans: 'à' },
  { char: /&#236;/g, trans: 'ì' },
  { char: /&#237;/g, trans: 'í' },
  { char: /&#194;/g, trans: 'â' },
  { char: /&#244;/g, trans: 'ô' },
  { char: /&amp;/g, trans: '&' },
  { char: /&#225;/g, trans: 'á' },
  { char: /&#226;/g, trans: 'â' },
  { char: /&#232;/g, trans: 'è' },
  { char: /&#243;/g, trans: 'ố' },
  { char: /\r\n/g, trans: '' },
  { char: /\s\s/g, trans: '' },
]

async function getValue($, selector) {
  try {
    let value = $(selector).text()

    return value
  } catch (error) {
    return ''
  }
}

async function getImages($, selector) {
  let imgs = []

  $(selector).each(function (i, ele) {
    let img = $(ele).attr('src')

    imgs.push(img)
  })

  return imgs
}

async function getHref($, selector) {
  let value = $(selector).attr('href')

  return value.match(productIDRegex)[1]
}

function convertText(input) {
  input = input.toString()
  convertData.forEach((t) => (input = input.replace(t.char, t.trans)))
  return input.trim()
}

async function getProduct(productID) {
  try {
    const { data } = await axios.get(`${PRODUCT_URL}${productID}`)

    const text = data['spec'].replace(/\r\n/, '')
    const root = parse(text)

    const rawData = root
      .querySelectorAll('li div')
      .map((t) => t.rawText)
      .map((t) => convertText(t))

    const webcam = rawData[20]
    const weight = rawData[28]
    const material = rawData[29]

    return { webcam, weight, material }
  } catch (error) {
    console.error(error)
  }
}

async function getData(url) {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto(url)

  let content = await page.content()
  var $ = cheerio.load(content)

  const name = await getValue($, '.rowtop h1')
  const images = await getImages($, '.picture .icon-position img')
  const discountPrice = (await getValue($, '.area_price strong'))
    .match(/\d+/g)
    ?.join([])
  const price = (await getValue($, '.hisprice')).match(/\d+/g)?.join([])
  const cpu = await getValue($, 'ul.parameter li:nth-child(1) div')
  const gpu = await getValue($, 'ul.parameter li:nth-child(5) div')
  const os = await getValue($, 'ul.parameter li:nth-child(7) div')
  const ram = await getValue($, 'ul.parameter li:nth-child(2) div')
  const display = (await getValue($, 'ul.parameter li:nth-child(4) div')).match(
    /^(.+?),/,
  )[1]
  const displayResolution = (
    await getValue($, 'ul.parameter li:nth-child(4) div')
  )
    .match(/\,(.*?)\(/)[1]
    .trim()
  const displayScreen = (
    await getValue($, 'ul.parameter li:nth-child(4) div')
  ).match(/\((.*?)\)/)[1]

  const productID = await getHref($, '.d2 a')

  const { webcam, weight, material } = await getProduct(productID)

  await browser.close()

  return {
    name,
    images,
    price,
    discountPrice,
    cpu,
    gpu,
    os,
    ram,
    display,
    displayResolution,
    displayScreen,
    webcam,
    weight,
    material,
  }
}

async function saveData(data) {
  let product = new TgddProduct({ ...data })

  await product.save()

  return product
}

export { saveData, getData }
