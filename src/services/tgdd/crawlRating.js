import puppeteer from 'puppeteer'
import cheerio from 'cheerio'
import TgddRating from '@models/TgddRating'

async function getRatingData(product, url, pageNumber) {
  url = `${url}/danh-gia?p=${pageNumber}`

  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto(url)

  let content = await page.content()
  var $ = cheerio.load(content)

  let promises = []
  $('.ratingLst .par').each(function (i, element) {
    const name = $(element).find('.rh span').text().trim()
    const content = $(element).find('.rc').text().trim()
    const point = $(element).find('.rc .iconcom-txtstar').length

    const rating = new TgddRating({ name, point, content, product })

    return rating.save()
  })

  await Promise.all(promises)

  await browser.close()
}

export { getRatingData }
