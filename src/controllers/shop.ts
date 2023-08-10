import { Request, Response } from 'express'
import { Product } from '../models/product'
import { Cart } from '../models/cart'

export const getProducts = async (req: Request, res: Response) => {
	Product.fetchAll(async (prod: any) => {
		const products = await prod

		res.render('shop/product-list', {
			pageTitle: 'All Products',
			path: '/products',
			products,
		})
	})
}

export const getProductById = async (req: Request, res: Response) => {
	const prodId = req.params.productId

	Product.findById(prodId, (product: any) => {
		res.render('shop/product-detail', {
			pageTitle: 'Product Detail',
			path: '/products',
			product,
		})
	})
	// res.redirect('/')
}

export const getIndex = async (req: Request, res: Response) => {
	Product.fetchAll(async (prod: any) => {
		const products = await prod

		res.render('shop/index', { pageTitle: 'Shop', path: '/', products })
	})
}

export const getCart = async (req: Request, res: Response) => {
	res.render('shop/cart', { pageTitle: 'My Cart', path: '/cart' })
}

export const addToCart = async (req: Request, res: Response) => {
	const prodId = req.body.productId

	// console.log('This is product id', prodId)
	Product.findById(prodId, (product: any) => {
		Cart.addProduct(prodId, product.price)
	})

	res.redirect('/')
}

export const getOrders = async (req: Request, res: Response) => {
	res.render('shop/orders', { pageTitle: 'My Orders', path: '/orders' })
}

export const getCheckout = async (req: Request, res: Response) => {
	res.render('shop/checkout', { pageTitle: 'Checkout', path: '/checkout' })
}
