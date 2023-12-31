import { Model, DataTypes } from 'sequelize'
import { sequelize } from '../utils/dbUtils'

class Product extends Model {
	// Use 'declare' to add typing information without emitting the public class field
	declare id: number
	declare title: string
	declare imageUrl: string
	declare description: string
	declare price: number
}

Product.init(
	{
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
		},
		title: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		imageUrl: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		description: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		price: {
			type: DataTypes.DOUBLE,
			allowNull: false,
		},
	},
	{
		sequelize,
		tableName: 'products',
	}
)

export default Product
