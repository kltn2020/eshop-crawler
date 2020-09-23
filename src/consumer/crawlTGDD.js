import { saveData, getData } from '@services/tgdd/crawlProduct'
import { getRatingData } from '@services/tgdd/crawlRating'

export default async ({ url }) => {
  try {
    const data = await getData(url)

    const product = await saveData(data)

    await getRatingData(product, url, 1)
    await getRatingData(product, url, 2)
  } catch (error) {
    console.log(error)
  }
}
