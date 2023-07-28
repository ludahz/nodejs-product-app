import { join } from 'path'
import { Router } from 'express'

import mainDir from '../utils/path'

const router = Router()

const products: object[] = []

router
	.route('/add-product')
	.get((req, res) => {
		res.render('add-product', {
			pageTitle: 'Add Product',
			path: '/admin/add-product',
		})
	})
	.post((req, res) => {
		console.log(req.body)
		products.push({
			title: req.body.title,
			image:
				'https://cdn.pixabay.com/photo/2016/03/31/20/51/book-1296045_960_720.png',
			price: '$19.99',
			description:
				'A very interesting book about so many even more interesting things!',
		})
		res.redirect('/')
	})

export { router as adminRoutes, products }
