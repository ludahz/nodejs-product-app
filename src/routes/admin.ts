import { join } from 'path'
import { Router } from 'express'

import mainDir from '../utils/path'

const router = Router()

router
	.route('/add-product')
	.get((req, res) => {
		const filePath = join(mainDir, 'views', 'add-product.html')
		res.sendFile(filePath)
	})
	.post((req, res) => {
		res.redirect('/')
	})

export default router
