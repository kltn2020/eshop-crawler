import { setQueues } from 'bull-board'

import crawlTGDD from './crawlTGDD'

setQueues([crawlTGDD])

export default {
  crawlTGDD,
}
