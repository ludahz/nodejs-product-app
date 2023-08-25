import { DataTypes, Model } from 'sequelize'
import { sequelize } from '../utils/dbUtils'

class CartItem extends Model {
	declare id: string
	declare quantity: number
	declare price: number
	declare title: string
}

CartItem.init(
	{
		id: {
			type: DataTypes.INTEGER,
			// autoIncrement: true,
			allowNull: false,
			primaryKey: true,
		},
		quantity: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		price: {
			type: DataTypes.DOUBLE,
			allowNull: false,
		},
		title: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	},
	{
		sequelize,
		tableName: 'CartItems',
	}
)

export default CartItem
