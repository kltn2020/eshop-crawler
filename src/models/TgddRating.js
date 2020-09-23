import mongoose, { Schema } from 'mongoose'

let TgddRatingSchema = new mongoose.Schema({
  name: { type: String },
  content: { type: String },
  point: { type: Number },
  product: { type: Schema.Types.ObjectId, ref: 'TgddProduct' },
})

const TgddRating = mongoose.model('tgdd_ratings', TgddRatingSchema)

export default TgddRating
