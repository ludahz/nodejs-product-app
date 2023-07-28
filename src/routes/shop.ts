import express from 'express'
import path from 'path'

import { products } from './admin'

const router = express.Router()

router.get('/', (req, res) => {
	console.log(products)
	// res.sendFile(path.join(__dirname, '../', 'views', 'shop.html'))
	res.render('shop', { products, pageTitle: 'Shop', path: '/' })
})

export default router
