import mongoose, { Schema } from 'mongoose'

let FptRatingSchema = new mongoose.Schema({
  point: { type: Number },
  number: { type: Number },
  product: { type: Schema.Types.ObjectId, ref: 'TgddProduct' },
})

const TgddRating = mongoose.model('fpt_ratings', FptRatingSchema)

export default TgddRating
