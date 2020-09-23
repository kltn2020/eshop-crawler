import mongoose from 'mongoose'

let TgddProductSchema = new mongoose.Schema({
  name: { type: String },
  plug: { type: String },
  images: [{ type: String }],
  price: { type: Number },
  discountPrice: { type: Number },
  cpu: { type: String },
  gpu: { type: String },
  os: { type: String },
  ram: { type: String },
  display: { type: String },
  displayResolution: { type: String },
  displayScreen: { type: String },
  webcam: { type: String },
  weight: { type: String },
  material: { type: String },
})

const TgddProduct = mongoose.model('tgdd_products', TgddProductSchema)

export default TgddProduct
