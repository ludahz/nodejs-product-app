import { DataTypes, Model } from 'sequelize'
import { sequelize } from '../utils/dbUtils'
import CartItem from './cartItem'
import User from './user'

class Cart extends Model {
	declare id: number
}

Cart.init(
	{
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
		},
	},
	{
		sequelize,
		tableName: 'Cart',
	}
)

export default Cart
