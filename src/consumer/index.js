import queue from '@queue'
import crawlTGDD from './crawlTGDD'
import crawlFPT from './crawlFPT'

const startConsumer = async () => {
  console.log('start Consumer')

  queue.crawlTGDD.process(async (job) => {
    await crawlTGDD(job.data)
  })
  queue.crawlFPT.process(async (job) => {
    await crawlFPT(job.data)
  })

  console.log('done start Consumer')
}

export { startConsumer }
