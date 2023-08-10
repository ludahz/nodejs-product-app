import { Router } from 'express'
import {
	getAddProducts,
	getAdminProducts,
	getEditProduct,
	postAddProduct,
	postDeleteProduct,
	postEditProduct,
} from '../controllers/admin'

const router = Router()

//admin/add-product => GET
router.get('/add-product', getAddProducts)

//admin/add-product => GET
router.get('/products', getAdminProducts)

//admin/add-product => POST
router.post('/add-product', postAddProduct)

router.get('/edit-product/:productId', getEditProduct)

router.post('/edit-product', postEditProduct)

router.post('/delete-product/:productId', postDeleteProduct)

export { router as adminRoutes }
