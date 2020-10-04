import { setQueues } from 'bull-board'

import crawlTGDD from './crawlTGDD'
import crawlFPT from './crawlFPT'

setQueues([crawlTGDD, crawlFPT])

export default {
  crawlTGDD,
  crawlFPT,
}
