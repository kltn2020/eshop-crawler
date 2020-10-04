import puppeteer from 'puppeteer'
import cheerio from 'cheerio'
import FptRating from '@models/FptRating'

async function getRatingData(product, url) {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto(url)

  let content = await page.content()
  var $ = cheerio.load(content)

  let promises = []

  $('.fs-dtrscout').each(function (i, element) {
    const point = 5 - i
    const number = $(element).text()

    const rating = new FptRating({ product, number, point })
    console.log('getRatingData -> rating', rating)

    return rating.save()
  })

  await Promise.all(promises)

  await browser.close()
}

export { getRatingData }
