import { Request, Response } from 'express'
import { Product } from '../models/product'

export const getAddProducts = (req: Request, res: Response) => {
	res.render('admin/edit-product', {
		pageTitle: 'Add Product',
		path: '/admin/add-product',
		editing: false,
	})
}

export const getAdminProducts = async (req: Request, res: Response) => {
	try {
		const products = await Product.fetchAll()
		res.render('admin/product-list', {
			pageTitle: 'Admin Products',
			path: '/admin/products',
			products,
		})
	} catch (error) {
		console.error('Error getting admin products:', error)
		res.status(500).render('error', {
			pageTitle: 'Error',
			errorMessage: 'An error occurred.',
		})
	}
}

export const postAddProduct = async (req: Request, res: Response) => {
	console.log(req.body)

	const { title, imageUrl, description, price } = req.body

	try {
		const product = new Product(null, title, imageUrl, description, price)
		await product.save()
		res.redirect('/')
	} catch (error) {
		console.error('Error adding product:', error)
		res.status(500).render('error', {
			pageTitle: 'Error',
			errorMessage: 'An error occurred.',
		})
	}
}

export const postEditProduct = async (req: Request, res: Response) => {
	console.log('This is post', req.body)

	const { title, imageUrl, description, price, productId } = req.body

	try {
		const product = new Product(productId, title, imageUrl, description, price)
		await product.save()
		res.redirect('/admin/products')
	} catch (error) {
		console.error('Error editing product:', error)
		res.status(500).render('error', {
			pageTitle: 'Error',
			errorMessage: 'An error occurred.',
		})
	}
}

export const postDeleteProduct = async (req: Request, res: Response) => {
	const prodId = req.params.productId

	try {
		await Product.deleteById(prodId)
		console.log('Product deleted successfully')
		res.redirect('/admin/products')
	} catch (error) {
		console.error('Error deleting product:', error)
		res.status(500).render('error', {
			pageTitle: 'Error',
			errorMessage: 'An error occurred.',
		})
	}
}

export const getEditProduct = async (req: Request, res: Response) => {
	const editMode = req.query.edit === 'true'

	if (!editMode) {
		res.redirect('/')
		return
	}

	const prodId = req.params.productId

	try {
		const product = await Product.findById(prodId)
		res.render('admin/edit-product', {
			pageTitle: 'Edit Product',
			path: '/admin/edit-product',
			editing: editMode,
			product: product,
		})
	} catch (error) {
		console.error('Error getting edit product:', error)
		res.status(500).render('error', {
			pageTitle: 'Error',
			errorMessage: 'An error occurred.',
		})
	}
}
