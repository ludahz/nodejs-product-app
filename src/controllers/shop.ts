import { Request, Response } from 'express'
import Product from '../models/product'

// import { Cart } from '../models/cart'

export const getProducts = async (req: Request, res: Response) => {
	console.log('WE are here')
	try {
		const products = await Product.findAll()
		console.log('This is products', products)
		res.render('shop/product-list', {
			pageTitle: 'All Products',
			path: '/products',
			products,
		})
	} catch (error) {
		console.error('Error getting products:', error)
		res.status(500).render('error', {
			pageTitle: 'Error',
			errorMessage: 'An error occurred.',
		})
	}
}

export const getProductById = async (req: Request, res: Response) => {
	const prodId = req.params.productId

	try {
		// const product = await Product.findById(prodId)
		// res.render('shop/product-detail', {
		// 	pageTitle: 'Product Detail',
		// 	path: '/products',
		// 	product,
		// })

		const product = await Product.findByPk(prodId)
		if (product === null) {
			console.log('Product not found')
		} else {
			res.render('shop/product-detail', {
				pageTitle: 'Product Detail',
				path: '/products',
				product,
			})
		}
	} catch (error) {
		console.error('Error getting product by ID:', error)
		res.status(500).render('error', {
			pageTitle: 'Error',
			errorMessage: 'An error occurred.',
		})
	}
}

export const getIndex = async (req: Request, res: Response) => {
	try {
		const products = await Product.findAll()
		console.log('This is products', products)
		res.render('shop/index', {
			pageTitle: 'Shop',
			path: '/',
			products,
		})
	} catch (error) {
		console.error('Error getting products for index:', error)
		res.status(500).render('error', {
			pageTitle: 'Error',
			errorMessage: 'An error occurred.',
		})
	}
}

export const getCart = async (req: Request, res: Response) => {
	// const cart = await Cart.getCart()
	// console.log('This is cart', cart)
	// res.render('shop/cart', {
	// 	pageTitle: 'My Cart',
	// 	path: '/cart',
	// 	cart: cart.products,
	// 	totalPrice: cart.totalPrice,
	// })
}

export const addToCart = async (req: Request, res: Response) => {
	const prodId = req.body.productId

	try {
		// const product = await Product.findById(prodId)
		// Cart.addProduct(prodId, product.price)
		res.redirect('/')
	} catch (error) {
		console.error('Error adding product to cart:', error)
		res.status(500).render('error', {
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

export const postDeleteCartItem = async (req: Request, res: Response) => {
	const id = req.body.itemId

	console.log('This is id', id)
	try {
		// await Cart.deleteItemById(id)
		console.log('Cart item deleted successfully')
		res.redirect('/cart')
	} catch (error) {
		console.error('Error deleting cart item:', error)
		res.status(500).render('error', {
			pageTitle: 'Error',
			errorMessage: 'An error occurred.',
		})
	}
}
