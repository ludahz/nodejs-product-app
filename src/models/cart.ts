import fs from 'fs'
import path from 'path'
import mainDir from '../utils/path'

const productFilePath = path.join(mainDir, 'data', 'cart.json')

interface Product {
	id: string
	// Add other properties of a product here
	quantity: number
	price: number
}

interface CartData {
	products: Product[]
	totalPrice: number
}

export class Cart {
	static addProduct(id: string, productPrice: number) {
		//fetch the previous cart
		fs.readFile(productFilePath, (err, fileContent) => {
			let cart: CartData = { products: [], totalPrice: 0 } // Initialize cart with default values
			if (!err) {
				cart = JSON.parse(fileContent.toString())
			}

			//analyze the cart => find existing product
			const existingProductIndex = cart.products.findIndex(
				(product) => product.id === id
			)

			//Add new product/ increase the quantity
			if (existingProductIndex !== -1) {
				// Increase the quantity of the existing product
				cart.products[existingProductIndex].quantity++
			} else {
				// Add a new product with quantity 1
				const newProduct: Product = { id, quantity: 1, price: +productPrice } // You should define other properties here
				cart.products.push(newProduct)
			}

			// Calculate totalPrice based on the updated cart products
			cart.totalPrice = cart.products.reduce(
				(total, product) => total + product.price * product.quantity,
				0
			)
			fs.writeFile(productFilePath, JSON.stringify(cart), (writeErr) => {
				if (writeErr) {
					console.error('Error writing cart data:', writeErr)
				}
			})
		})
	}
}
