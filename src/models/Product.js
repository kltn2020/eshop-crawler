import { sequelize } from '@root/cmd/sequelize'
import { DataTypes, Model } from 'sequelize'

class Product extends Model {}

Product.init(
  {
    sku: {
      type: DataTypes.STRING,
    },
    name: {
      type: DataTypes.STRING,
    },
    cpu: {
      type: DataTypes.STRING,
    },
    gpu: {
      type: DataTypes.STRING,
    },
    os: {
      type: DataTypes.STRING,
    },
    ram: {
      type: DataTypes.STRING,
    },
    storage: {
      type: DataTypes.STRING,
    },
    display: {
      type: DataTypes.STRING,
    },
    displayResolution: {
      type: DataTypes.STRING,
    },
    displayScreen: {
      type: DataTypes.STRING,
    },
    camera: {
      type: DataTypes.STRING,
    },
    video: {
      type: DataTypes.STRING,
    },
    wifi: {
      type: DataTypes.STRING,
    },
    bluetooth: {
      type: DataTypes.STRING,
    },
    ports: {
      type: DataTypes.STRING,
    },
    size: {
      type: DataTypes.STRING,
    },
    weight: {
      type: DataTypes.STRING,
    },
    material: {
      type: DataTypes.STRING,
    },
    batteryCapacity: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING,
    },
    sold: {
      type: DataTypes.STRING,
    },
    categoryId: {
      type: DataTypes.STRING,
    },
    brandId: {
      type: DataTypes.STRING,
    },
    images: {
      type: DataTypes.JSONB,
    },
    price: {
      type: DataTypes.NUMBER,
    },
    discountPrice: {
      type: DataTypes.NUMBER,
    },
  },
  {
    sequelize,
    modelName: 'product',
    underscored: true,
    timestamps: false,
  },
)

export default Product
