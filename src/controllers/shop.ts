import { Request, Response } from 'express'
import Product from '../models/product'
import CartItem from '../models/cartItem'
import Order from '../models/order'

const renderCart = (res: Response, cart: any[], totalPrice: number) => {
	res.render('shop/cart', {
		pageTitle: 'My Cart',
		path: '/cart',
		cart: cart,
		totalPrice: totalPrice.toFixed(2),
	})
}
const renderErrorPage = (res: Response) => {
	res.status(500).render('error', {
		pageTitle: 'Error',
		errorMessage: 'An error occurred.',
	})
}

const calculateTotalPrice = (items: any[]) => {
	return items.reduce((total, item) => total + item.price, 0)
}

export const getProducts = async (req: Request, res: Response) => {
	try {
		const products = await (req as any).user.getProducts()

		res.render('shop/product-list', {
			pageTitle: 'All Products',
			path: '/products',
			products,
		})
	} catch (error) {
		console.error('Error getting products:', error)
		renderErrorPage(res)
	}
}

export const getProductById = async (req: Request, res: Response) => {
	const prodId = req.params.productId

	try {
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
		renderErrorPage(res)
	}
}

export const getIndex = async (req: Request, res: Response) => {
	try {
		const products = await Product.findAll()

		res.render('shop/index', {
			pageTitle: 'Shop',
			path: '/',
			products,
		})
	} catch (error) {
		console.error('Error getting products for index:', error)
		renderErrorPage(res)
	}
}

export const getCart = async (req: Request, res: Response) => {
	try {
		const user = (req as any).user
		const cart = await user.getCart()

		if (!cart) {
			renderCart(res, [], 0)
		} else {
			const items = await cart.getCartItems()
			const totalPrice = calculateTotalPrice(items)
			renderCart(res, items, totalPrice)
		}
	} catch (error) {
		console.error('Error fetching user cart:', error)
		renderCart(res, [], 0)
	}
}

export const addToCart = async (req: Request, res: Response) => {
	const prodId = req.body.productId

	try {
		const cart = await (req as any).user.getCart()

		const product = await (req as any).user.getProducts({
			where: { id: prodId },
		})

		if (!cart) {
			const newCart = await (req as any).user.createCart({})
			await newCart.createCartItem({
				id: prodId,
				title: product[0].title,
				quantity: 1,
				price: product[0].price,
			})
		} else {
			const items = await cart.getCartItems({
				where: {
					id: prodId,
				},
			})

			if (items.length === 0) {
				await cart.createCartItem({
					id: prodId,
					title: product[0].title,
					quantity: 1,
					price: product[0].price,
				})
			} else {
				items[0].update({
					quantity: items[0].quantity + 1,
					price: items[0].price + product[0].price,
				})
			}
		}

		// res.redirect('/')
		res.redirect('/cart')
	} catch (error) {
		console.error('Error adding product to cart:', error)
		renderErrorPage(res)
	}
}

// export const addToCart = async (req: Request, res: Response) => {
// 	const prodId = req.body.productId

// 	try {
// 		const user: any = (req as any).user // Assuming user instance is stored in req.user

// 		// Get the product by its id
// 		const product = await Product.findByPk(prodId)

// 		if (!product) {
// 			throw new Error('Product not found')
// 		}

// 		// Check if the product is already in the user's cart
// 		const cartItem = await user.getCartItems({
// 			// where: { id: prodId },
// 		})

// 		if (cartItem?.length === 0) {
// 			// Product not in cart, create a new cart item
// 			await user.createCartItem({
// 				id: prodId,
// 				quantity: 1,
// 				title: product.title,
// 				price: product.price,
// 			})
// 		} else {
// 			// Product already in cart, update quantity
// 			if (cartItem[0]?.id === prodId) {
// 				await cartItem[0].update({
// 					quantity: cartItem[0]?.quantity + 1,
// 				})
// 			} else {
// 				await user.createCartItem({
// 					id: prodId,
// 					quantity: 1,
// 					title: product.title,
// 					price: product.price,
// 				})
// 			}
// 		}

// 		res.redirect('/')
// 	} catch (error) {
// 		console.error('Error adding product to cart:', error)
// 		res.status(500).render('error', {
// 			pageTitle: 'Error',
// 			errorMessage: 'An error occurred.',
// 		})
// 	}
// }

export const getOrders = async (req: Request, res: Response) => {
	const orders = await (req as any).user.getOrders({
		include: ['Products'],
	})

	console.log('This is orders', orders)

	res.render('shop/orders', {
		pageTitle: 'My Orders',
		path: '/orders',
		orders: orders,
	})
}

export const postCreateOrder = async (req: Request, res: Response) => {
	console.log('This was triggered in post create order')

	const cart = await (req as any).user.getCart({
		include: {
			model: CartItem,
		},
	})

	const items = await cart.getCartItems()
	const totalPrice = calculateTotalPrice(items)
	const date = new Date()

	const order = await (req as any).user.createOrder({
		orderDate: date.toLocaleDateString('en-US', {
			weekday: 'short',
			month: 'short',
			day: 'numeric',
		}),
		status: 'Pending', // Set the initial order status
		totalAmount: totalPrice,
		// ... other order-specific attributes
	})

	// Move cart items to the order
	for (const cartItem of cart.CartItems) {
		await order.addProduct(cartItem.Product, {
			through: {
				quantity: cartItem.quantity,
				price: cartItem.price,
			},
		})

		// Remove cart item from cart
		await cartItem.destroy()
		await cart.destroy()
	}

	res.redirect('/orders')
}

export const getCheckout = async (req: Request, res: Response) => {
	res.render('shop/checkout', { pageTitle: 'Checkout', path: '/checkout' })
}

export const postDeleteCartItem = async (req: Request, res: Response) => {
	try {
		const id = req.body.itemId
		const user = (req as any).user

		const cart = await user.getCart()

		const itemToDelete = await cart.getCartItems({ where: { id: id } })

		if (itemToDelete.length === 0) {
			throw new Error('Item not found in cart')
		}

		await itemToDelete[0].destroy()

		const newCart = await user.getCart()
		const newItems = await newCart.getCartItems()

		if (newItems.length === 0) {
			await cart.destroy()
		}

		console.log('Cart item deleted successfully')
		res.redirect('/cart')
	} catch (error) {
		console.error('Error deleting cart item:', error)
		renderErrorPage(res)
	}
}
