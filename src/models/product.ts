import fs from 'fs'
import path from 'path'
import mainDir from '../utils/path'

const productsFilePath = path.join(mainDir, 'data', 'products.json')

const readProductsFile = (
	callback: (error: NodeJS.ErrnoException | null, data: Buffer) => void
) => {
	fs.readFile(productsFilePath, callback)
}

const writeProductsFile = (
	data: any,
	callback: (error: NodeJS.ErrnoException | null) => void
) => {
	fs.writeFile(productsFilePath, JSON.stringify(data), callback)
}

const parseJson = (jsonString: string) => {
	try {
		return jsonString ? JSON.parse(jsonString) : []
	} catch (error) {
		console.error('Error parsing JSON:', error)
		return []
	}
}

// const parseJson = (jsonString: string) => {
// 	try {
// 		return JSON.parse(jsonString)
// 	} catch (error) {
// 		console.error('Error parsing JSON:', error)
// 		return []
// 	}
// }

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

	save(): void {
		readProductsFile((err, fileContent) => {
			if (err) {
				console.error(err)
				return
			}

			const products = parseJson(fileContent.toString())
			console.log('THis is this id', this)
			if (this.id) {
				const existingProductIndex = products.findIndex(
					(product: any) => product.id === this.id
				)
				products[existingProductIndex] = this
			} else {
				this.id = Math.random().toString()
				products.push(this)
			}
			writeProductsFile(products, (writeErr) => {
				if (writeErr) {
					console.error('Error writing to file:', writeErr)
				}
			})
		})
	}

	static fetchAll(cb: any) {
		readProductsFile((err, fileContent) => {
			if (err) {
				console.log('There was an error', err)
				return cb([])
			}
			cb(parseJson(fileContent.toString()))
		})
	}

	static findById(id: string, cb: any) {
		readProductsFile((err, fileContent) => {
			if (err) {
				console.log('There was an error', err)
				return cb([])
			}
			const products = parseJson(fileContent.toString())
			const product = products.find((p: any) => p.id === id)
			cb(product)
		})
	}

	static deleteById(id: string, cb: any) {
		readProductsFile((err, fileContent) => {
			if (err) {
				console.log('There was an error', err)
				return cb([])
			}
			const products = parseJson(fileContent.toString())
			const updatedProducts = products.filter((p: any) => p.id !== id)

			writeProductsFile(updatedProducts, (writeErr) => {
				if (writeErr) {
					console.error('Error writing to file:', writeErr)
				}
				cb(writeErr)
			})

			cb(updatedProducts)
		})
	}
}
