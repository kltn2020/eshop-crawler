import mongoose from 'mongoose'

let FptProductSchema = new mongoose.Schema({
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

const FptProduct = mongoose.model('fpt_products', FptProductSchema)

export default FptProduct
