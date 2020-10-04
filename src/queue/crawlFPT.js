import Queue from 'bull'

const crawlFPT = new Queue('crawl_fpt', process.env.REDIS_URI)

export default crawlFPT
