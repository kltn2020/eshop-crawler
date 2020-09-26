import { sequelize } from '@root/cmd/sequelize'
import { DataTypes, Model } from 'sequelize'

class Review extends Model {}

Review.init(
  {
    content: {
      type: DataTypes.STRING,
    },
    point: {
      type: DataTypes.NUMBER,
    },
    userId: {
      type: DataTypes.NUMBER,
    },
    productId: {
      type: DataTypes.NUMBER,
    },
  },
  {
    sequelize,
    modelName: 'reviews',
    underscored: true,
    timestamps: false,
  },
)

export default Review
