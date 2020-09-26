import { sequelize } from '@root/cmd/sequelize'
import { DataTypes, Model } from 'sequelize'

class User extends Model {}

User.init(
  {
    email: {
      type: DataTypes.STRING,
    },
    passwordHash: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: 'user',
    underscored: true,
    timestamps: false,
  },
)

export default User
