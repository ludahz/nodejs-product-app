import { Request, Response } from 'express'
import { Product } from '../models/product'
import { Cart } from '../models/cart'

export const getProducts = async (req: Request, res: Response) => {
	try {
		const products = await Product.fetchAll()
		res.render('shop/product-list', {
			pageTitle: 'All Products',
			path: '/products',
			products,
		})
	} catch (error) {
		console.error('Error getting products:', error)
		res
			.status(500)
			.render('error', {
				pageTitle: 'Error',
				errorMessage: 'An error occurred.',
			})
	}
}

export const getProductById = async (req: Request, res: Response) => {
	const prodId = req.params.productId

	try {
		const product = await Product.findById(prodId)
		res.render('shop/product-detail', {
			pageTitle: 'Product Detail',
			path: '/products',
			product,
		})
	} catch (error) {
		console.error('Error getting product by ID:', error)
		res
			.status(500)
			.render('error', {
				pageTitle: 'Error',
				errorMessage: 'An error occurred.',
			})
	}
}

export const getIndex = async (req: Request, res: Response) => {
	try {
		const products = await Product.fetchAll()
		res.render('shop/index', { pageTitle: 'Shop', path: '/', products })
	} catch (error) {
		console.error('Error getting products for index:', error)
		res
			.status(500)
			.render('error', {
				pageTitle: 'Error',
				errorMessage: 'An error occurred.',
			})
	}
}

export const getCart = async (req: Request, res: Response) => {
	res.render('shop/cart', { pageTitle: 'My Cart', path: '/cart' })
}

export const addToCart = async (req: Request, res: Response) => {
	const prodId = req.body.productId

	try {
		const product = await Product.findById(prodId)
		Cart.addProduct(prodId, product.price)
		res.redirect('/')
	} catch (error) {
		console.error('Error adding product to cart:', error)
		res
			.status(500)
			.render('error', {
				pageTitle: 'Error',
				errorMessage: 'An error occurred.',
			})
	}
}

export const getOrders = async (req: Request, res: Response) => {
	res.render('shop/orders', { pageTitle: 'My Orders', path: '/orders' })
}

export const getCheckout = async (req: Request, res: Response) => {
	res.render('shop/checkout', { pageTitle: 'Checkout', path: '/checkout' })
}
