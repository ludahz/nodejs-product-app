import { Request, Response } from 'express'
import Product from '../models/product'
// import { Product } from '../models/product'

export const getAddProducts = (req: Request, res: Response) => {
	res.render('admin/edit-product', {
		pageTitle: 'Add Product',
		path: '/admin/add-product',
		editing: false,
	})
}

export const getAdminProducts = async (req: Request, res: Response) => {
	try {
		// Fetch products associated with the currently logged-in user
		const products = await Product.findAll({
			where: {
				userId: (req as any).user.id,
			},
		})

		// const products = await Product.findAll()
		res.render('admin/product-list', {
			pageTitle: 'Admin Products',
			path: '/admin/products',
			products: products,
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
	const { title, imageUrl, description, price } = req.body

	try {
		// const user = await (req.session as any).user
		const user: any = (req as any).user

		if (!user) {
			res.status(403).send('You must be logged in to create a product.')
			return
		} else {
			//same as await Product.create but without passing the UserId
			//Magic associations
			await user.createProduct({
				title: title,
				imageUrl: imageUrl,
				description: description,
				price: price,
			})
		}
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
	const { title, imageUrl, description, price, productId } = req.body

	try {
		await Product.update(
			{
				title: title,
				imageUrl: imageUrl,
				description: description,
				price: price,
			},
			{ where: { id: productId } }
		)

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
		// await Product.deleteById(prodId)
		await Product.destroy({
			where: {
				id: prodId,
			},
		})
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
		const product = await Product.findOne({
			where: {
				id: prodId,
				UserId: (req.session as any).user.id,
			},
		})

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
