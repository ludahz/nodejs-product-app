import { Model, DataTypes } from 'sequelize'
import { sequelize } from '../utils/dbUtils'

class Product extends Model {
	private _id!: number
	private _title!: string
	private _imageUrl!: string
	private _description!: string
	private _price!: number

	// Getter methods for private fields
	public get id(): number {
		return this._id
	}

	public get title(): string {
		return this._title
	}

	public get imageUrl(): string {
		return this._imageUrl
	}

	public get description(): string {
		return this._description
	}

	public get price(): number {
		return this._price
	}
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
