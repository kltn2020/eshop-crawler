import { getData, saveData } from '@services/fpt/crawlProduct'
import { getRatingData } from '@services/fpt/crawlRating'

export default async ({ url }) => {
  try {
    console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>')
    console.log('url', url)
    const data = await getData(url)
    console.log('data', data)
    const product = await saveData(data)
    console.log('<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<')

    await getRatingData(product, url)
    console.log('done')
  } catch (error) {
    console.log(error)
  }
}
