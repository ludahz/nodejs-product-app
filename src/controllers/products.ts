import { Request, Response } from 'express'

export const products: object[] = []

export const getAddProducts = (req: Request, res: Response) => {
	res.render('add-product', {
		pageTitle: 'Add Product',
		path: '/admin/add-product',
	})
}

export const postAddProduct = (req: Request, res: Response) => {
	console.log(req.body)

	const newProduct = {
		title: req.body.title,
		image:
			'https://cdn.pixabay.com/photo/2016/03/31/20/51/book-1296045_960_720.png',
		price: '$19.99',
		description:
			'A very interesting book about so many even more interesting things!',
	}

	products.push(newProduct)

	res.redirect('/')
}

export const getProducts = (req: Request, res: Response) => {
	console.log(products)
	res.render('shop', { products, pageTitle: 'Shop', path: '/' })
}
