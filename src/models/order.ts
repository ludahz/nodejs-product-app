import { DataTypes, Model } from 'sequelize'
import { sequelize } from '../utils/dbUtils'

class Order extends Model {
	declare id: number
	declare orderDate: Date
	declare totalAmount: number
	declare status: string
	declare paymentMethod: string
	declare shippingAddress: string
	declare billingAddress: string
	declare trackingNumber: string
	declare notes: string
}

Order.init(
	{
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
		},
		orderDate: {
			type: DataTypes.DATE,
			allowNull: true,
		},
		totalAmount: {
			type: DataTypes.DECIMAL(10, 2),
			allowNull: true,
		},
		status: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		paymentMethod: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		shippingAddress: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		billingAddress: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		trackingNumber: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		notes: {
			type: DataTypes.TEXT,
			allowNull: true,
		},
	},
	{
		sequelize,
		tableName: 'Orders',
	}
)

export default Order
