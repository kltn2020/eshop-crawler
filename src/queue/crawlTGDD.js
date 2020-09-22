import Queue from 'bull'

const crawlTGDD = new Queue('crawl_tgdd', process.env.REDIS_URI)

export default crawlTGDD
