import fs from 'fs/promises'
import path from 'path'
import mainDir from '../utils/path'
import { Cart } from './cart'

const productsFilePath = path.join(mainDir, 'data', 'products.json')

const parseJson = (jsonString: string) => {
	try {
		return jsonString ? JSON.parse(jsonString) : []
	} catch (error) {
		console.error('Error parsing JSON:', error)
		return []
	}
}

async function readFileContent(filePath: string): Promise<string> {
	try {
		const fileContent = await fs.readFile(filePath)
		return fileContent.toString()
	} catch (error) {
		console.error('Error reading file:', error)
		return ''
	}
}

async function writeFileContent(filePath: string, data: any): Promise<void> {
	try {
		await fs.writeFile(filePath, JSON.stringify(data))
	} catch (error) {
		console.error('Error writing to file:', error)
	}
}

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
			const fileContent = await readFileContent(productsFilePath)
			const products = parseJson(fileContent)

			if (this.id) {
				const existingProductIndex = products.findIndex(
					(product: any) => product.id === this.id
				)
				products[existingProductIndex] = this
			} else {
				this.id = Math.random().toString()
				products.push(this)
			}

			await writeFileContent(productsFilePath, products)
		} catch (error) {
			console.error('Error saving product:', error)
		}
	}

	static async fetchAll(): Promise<any[]> {
		try {
			const fileContent = await readFileContent(productsFilePath)
			return parseJson(fileContent)
		} catch (error) {
			console.error('Error fetching products:', error)
			return []
		}
	}

	static async findById(id: string): Promise<any | null> {
		try {
			const fileContent = await readFileContent(productsFilePath)
			const products = parseJson(fileContent)
			return products.find((p: any) => p.id === id) || null
		} catch (error) {
			console.error('Error finding product:', error)
			return null
		}
	}

	static async deleteById(id: string): Promise<void> {
		try {
			const fileContent = await readFileContent(productsFilePath)
			const products = parseJson(fileContent)
			const updatedProducts = products.filter((p: any) => p.id !== id)
			await Cart.deleteItemById(id)
			await writeFileContent(productsFilePath, updatedProducts)
		} catch (error) {
			console.error('Error deleting product:', error)
		}
	}
}
