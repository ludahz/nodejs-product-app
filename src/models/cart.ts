// import fs from 'fs/promises'
// import path from 'path'
// import mainDir from '../utils/path'
// import { Product } from './product'

// const productFilePath = path.join(mainDir, 'data', 'cart.json')

// interface iProduct {
// 	id: string
// 	quantity: number
// 	price: number
// 	title: string
// }

// interface CartData {
// 	products: iProduct[]
// 	totalPrice: number
// }

// export class Cart {
// 	private static async getCartFromFile(): Promise<CartData> {
// 		try {
// 			const fileContent = await fs.readFile(productFilePath)
// 			return JSON.parse(fileContent.toString())
// 		} catch (error) {
// 			return { products: [], totalPrice: 0 }
// 		}
// 	}

// 	private static async writeCartToFile(cart: CartData): Promise<void> {
// 		try {
// 			await fs.writeFile(productFilePath, JSON.stringify(cart))
// 		} catch (error) {
// 			console.error('Error writing cart data:', error)
// 		}
// 	}

// 	static async addProduct(id: string, productPrice: number) {
// 		try {
// 			const cart = await this.getCartFromFile()
// 			if (!cart.products) {
// 				cart.products = []
// 			}

// 			const existingProductIndex = cart.products.findIndex(
// 				(product) => product.id === id
// 			)

// 			if (existingProductIndex !== -1) {
// 				cart.products[existingProductIndex].quantity++
// 			} else {
// 				const product = await Product.findById(id)
// 				console.log('This is product in add product', product)
// 				const newProduct: iProduct = {
// 					id,
// 					quantity: 1,
// 					price: +productPrice,
// 					title: product.title,
// 				}
// 				cart.products.push(newProduct)
// 			}

// 			cart.totalPrice = cart.products.reduce(
// 				(total, product) => total + product.price * product.quantity,
// 				0
// 			)

// 			await this.writeCartToFile(cart)
// 		} catch (error) {
// 			console.error('Error adding product:', error)
// 		}
// 	}

// 	static async deleteItemById(id: string) {
// 		try {
// 			const cart = await this.getCartFromFile()
// 			const productIndex = cart.products.findIndex(
// 				(product) => product.id === id
// 			)

// 			if (productIndex !== -1) {
// 				const deletedProduct = cart.products.splice(productIndex, 1)[0]
// 				cart.totalPrice -= deletedProduct.price * deletedProduct.quantity
// 				await this.writeCartToFile(cart)
// 			} else {
// 				cart.totalPrice = 0
// 			}
// 		} catch (error) {
// 			console.error('Error deleting product:', error)
// 		}
// 	}

// 	static async getCart(): Promise<CartData> {
// 		try {
// 			const cart = await this.getCartFromFile()
// 			console.log('This is cart in get cart', cart)
// 			return cart
// 		} catch (error) {
// 			console.error('Error getting cart data:', error)
// 			return { products: [], totalPrice: 0 }
// 		}
// 	}
// }
