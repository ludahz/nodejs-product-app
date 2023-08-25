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

Cart.hasMany(CartItem) // A Cart can have many CartItems
Cart.belongsTo(User) // A Cart belongs to a User

export default Cart
