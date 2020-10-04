import puppeteer from 'puppeteer'
import cheerio from 'cheerio'
import FptProduct from '@models/FptProduct'

const DATA = [
  { regex: /1920 x 1080/, value: 'FHD' },
  { regex: /1366 x 768/, value: 'HD' },
  { regex: /3840 x 2160/, value: 'UHD' },
  { regex: /2560 x 1600/, value: 'Retina' },
]

function findScreen(value) {
  for (let index = 0; index < DATA.length; index++) {
    const ele = DATA[index]

    if (value.match(ele.regex)) {
      return ele.value
    }
  }

  return value
}

async function getPrice($) {
  try {
    let value
    if ($('.fs-dtprice ').length >= 1) {
      value = $('.fs-dtprice ').text().trim()
    } else {
      value = $('.fs-gsocit strong').text().trim()
    }

    console.log('getPrice -> value', value)
    return value
  } catch (error) {
    return ''
  }
}
async function getValue($, selector) {
  try {
    let value = $(selector).text().trim()

    return value
  } catch (error) {
    return ''
  }
}

async function getImages($, selector) {
  let imgs = []

  $(selector).each(function (i, ele) {
    let img = $(ele).attr('href').replace('//', 'https://')

    imgs.push(img)
  })

  return imgs
}

async function getData(url) {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto(url)

  let content = await page.content()
  var $ = cheerio.load(content)

  const name = await getValue($, '.fs-breadcrumb > li.active')
  const images = await getImages($, '.easyzoom a')
  const discountPrice = (await getPrice($))
    .replace('Trả góp 0%', '')
    .split('₫')[0]
    .match(/\d+/g)
    ?.join([])
  const price = (await getPrice($))
    .replace('Trả góp 0%', '')
    .split('₫')[1]
    .match(/\d+/g)
    ?.join([])

  const cpu = await getValue($, '.fs-tsright li:nth-child(1) span')
  const gpu = await getValue($, '.fs-tsright li:nth-child(4) span')
  const os = await getValue($, '.fs-tsright li:nth-child(6) span')
  const ram = await getValue($, '.fs-tsright li:nth-child(2) span')
  const display = (await getValue($, '.fs-tsright li:nth-child(3) span'))
    .split(',')[0]
    .replace(/\"/, ' inch')
  let displayResolution = (
    await getValue($, '.fs-tsright li:nth-child(3) span')
  )
    .split(',')[1]
    .replace(' Pixel', '')

  displayResolution = findScreen(displayResolution)

  const displayScreen = (await getValue($, '.fs-tsright li:nth-child(3) span'))
    .split(',')[1]
    .replace(' Pixel', '')

  const weight = await getValue($, '.fs-tsright li:nth-child(7) span')

  return {
    name,
    images,
    discountPrice,
    price,
    cpu,
    gpu,
    os,
    ram,
    display,
    displayResolution,
    displayScreen,
    weight: `${weight} kg`,
  }
}

async function saveData(data) {
  let product = new FptProduct({ ...data })

  await product.save()

  return product
}

export { getData, saveData }
