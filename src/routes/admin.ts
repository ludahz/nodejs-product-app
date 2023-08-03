import { Router } from 'express'
import { getAddProducts, postAddProduct } from '../controllers/products'

const router = Router()

router.get('/add-product', getAddProducts)

router.post('/add-product', postAddProduct)

export { router as adminRoutes }
