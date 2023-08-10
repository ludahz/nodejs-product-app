import { Request, Response } from 'express'
import { Product } from '../models/product'

export const getAddProducts = (req: Request, res: Response) => {
	res.render('admin/edit-product', {
		pageTitle: 'Add Product',
		path: '/admin/add-product',
		editing: false,
	})
}

export const getAdminProducts = (req: Request, res: Response) => {
	Product.fetchAll(async (prod: any) => {
		const products = await prod

		res.render('admin/product-list', {
			pageTitle: 'Admin Products',
			path: '/admin/products',
			products,
		})
	})
}

export const postAddProduct = (req: Request, res: Response) => {
	console.log(req.body)

	const { title, imageUrl, description, price } = req.body

	// const newProduct = {
	// 	title: req.body.title,
	// 	image:
	// 		'https://cdn.pixabay.com/photo/2016/03/31/20/51/book-1296045_960_720.png',
	// 	price: '$19.99',
	// 	description:
	// 		'A very interesting book about so many even more interesting things!',
	// }

	const product = new Product(null, title, imageUrl, description, price)
	product.save()

	res.redirect('/')
}

export const postEditProduct = (req: Request, res: Response) => {
	console.log('This is post', req.body)

	const { title, imageUrl, description, price, productId } = req.body

	const product = new Product(productId, title, imageUrl, description, price)
	product.save()

	res.redirect('/admin/products')
}

export const postDeleteProduct = (req: Request, res: Response) => {
	console.log('This is post', req.params)

	const prodId = req.params.productId

	// const { title, imageUrl, description, price, productId } = req.body

	// const product = new Product(productId, title, imageUrl, description, price)
	// product.save()

	Product.deleteById(prodId, (product: any) => {
		console.log('This is product', product)
		// res.redirect('/admin/products')
	})
	res.redirect('/admin/products')
}

export const getEditProduct = (req: Request, res: Response) => {
	const editMode = req.query.edit === 'true' && true

	if (!editMode) {
		res.redirect('/')
	}

	const prodId = req.params.productId

	Product.findById(prodId, (product: any) => {
		res.render('admin/edit-product', {
			pageTitle: 'Edit Product',
			path: '/admin/edit-product',
			editing: editMode,
			product: product,
		})
	})
}
