import fs from 'fs/promises'
import path from 'path'
import mainDir from '../utils/path'

const productFilePath = path.join(mainDir, 'data', 'cart.json')

interface Product {
	id: string
	quantity: number
	price: number
}

interface CartData {
	products: Product[]
	totalPrice: number
}

export class Cart {
	private static async getCartFromFile(): Promise<CartData> {
		try {
			const fileContent = await fs.readFile(productFilePath)
			return JSON.parse(fileContent.toString())
		} catch (error) {
			return { products: [], totalPrice: 0 }
		}
	}

	private static async writeCartToFile(cart: CartData): Promise<void> {
		try {
			await fs.writeFile(productFilePath, JSON.stringify(cart))
		} catch (error) {
			console.error('Error writing cart data:', error)
		}
	}

	static async addProduct(id: string, productPrice: number) {
		try {
			const cart = await this.getCartFromFile()
			if (!cart.products) {
				cart.products = []
			}

			const existingProductIndex = cart.products.findIndex(
				(product) => product.id === id
			)

			if (existingProductIndex !== -1) {
				cart.products[existingProductIndex].quantity++
			} else {
				const newProduct: Product = { id, quantity: 1, price: +productPrice }
				cart.products.push(newProduct)
			}

			cart.totalPrice = cart.products.reduce(
				(total, product) => total + product.price * product.quantity,
				0
			)

			await this.writeCartToFile(cart)
		} catch (error) {
			console.error('Error adding product:', error)
		}
	}

	static async deleteProduct(id: string) {
		try {
			const cart = await this.getCartFromFile()
			const productIndex = cart.products.findIndex(
				(product) => product.id === id
			)

			if (productIndex !== -1) {
				const deletedProduct = cart.products.splice(productIndex, 1)[0]
				cart.totalPrice -= deletedProduct.price * deletedProduct.quantity
				await this.writeCartToFile(cart)
			} else {
				cart.totalPrice = 0
			}
		} catch (error) {
			console.error('Error deleting product:', error)
		}
	}
}
