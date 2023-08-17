import { Cart } from './cart'
import dbUtils from '../utils/dbUtils'

export class Product {
	title: string
	imageUrl: string
	description: string
	price: number
	id: string | null

	constructor(
		id: string | null,
		title: string,
		imageUrl: string,
		description: string,
		price: number
	) {
		this.id = id
		this.title = title
		this.imageUrl = imageUrl
		this.description = description
		this.price = price
	}

	async save(): Promise<void> {
		try {
			if (this.id) {
				// Update existing product
				const values = [
					this.title,
					this.imageUrl,
					this.description,
					this.price,
					this.id,
				]
				const query =
					'UPDATE products SET title=?, imageUrl=?, description=?, price=? WHERE id=?'
				await dbUtils.executeQuery(query, values)
			} else {
				// Insert new product
				this.id = Math.random().toString() // Generate a suitable ID
				const values = [this.title, this.imageUrl, this.description, this.price]
				const query =
					'INSERT INTO products (title, imageUrl, description, price) VALUES (?, ?, ?, ?)'
				await dbUtils.executeQuery(query, values)
			}
		} catch (error) {
			console.error('Error saving product:', error)
		}
	}

	static async fetchAll(): Promise<any[]> {
		try {
			const query = 'SELECT * FROM products'

			const results = await dbUtils.executeQuery(query)

			return results as Product[]
		} catch (error) {
			console.error('Error fetching products:', error)
			return []
		}
	}

	static async findById(id: string): Promise<any | null> {
		try {
			const query = 'SELECT * FROM products WHERE id = ?'
			const values = [id]
			const results: any = await dbUtils.executeQuery(query, values)

			return results.length ? results[0] : null
		} catch (error) {
			console.error('Error finding product:', error)
			return null
		}
	}

	static async deleteById(id: string): Promise<void> {
		try {
			const query = 'DELETE FROM products WHERE id = ?'
			const values = [id]
			await dbUtils.executeQuery(query, values)
			await Cart.deleteItemById(id) // Make sure Cart is updated appropriately
		} catch (error) {
			console.error('Error deleting product:', error)
		}
	}
}
