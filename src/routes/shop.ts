import { Router } from 'express'
import {
	addToCart,
	getCart,
	getCheckout,
	getIndex,
	getOrders,
	getProductById,
	getProducts,
	postCreateOrder,
	postDeleteCartItem,
} from '../controllers/shop'

const router = Router()

router.get('/', getIndex)

router.get('/products', getProducts)
router.get('/products/:productId', getProductById)
router.get('/cart', getCart)
router.post('/cart', addToCart)
router.get('/orders', getOrders)
router.get('/checkout', getCheckout)

router.post('/create-order', postCreateOrder)

router.post('/delete-cart-item', postDeleteCartItem)

export default router
