import queue from '@queue'
import crawlTGDD from './crawlTGDD'

const startConsumer = async () => {
  console.log('start Consumer')

  queue.crawlTGDD.process(async (job) => {
    await crawlTGDD(job.data)
  })

  console.log('done start Consumer')
}

export { startConsumer }
