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
		return JSON.parse(jsonString)
	} catch (error) {
		console.error('Error parsing JSON:', error)
		return []
	}
}

export class Product {
	title: string

	constructor(t: string) {
		this.title = t
	}

	save(): void {
		readProductsFile((err, fileContent) => {
			if (err) {
				console.error(err)
				return
			}

			const products = parseJson(fileContent.toString())
			products.push(this)

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
}
