import { Model, DataTypes } from 'sequelize'
import { sequelize } from '../utils/dbUtils' //sequelize instance

class User extends Model {
	// Use 'declare' to add typing information without emitting the public class field
	declare id: number
	declare name: string
	declare email: string
}

User.init(
	{
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
		},
	},
	{
		sequelize,
		tableName: 'users',
	}
)

export default User
