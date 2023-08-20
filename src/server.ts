import express, { Express, Request, Response, NextFunction } from 'express'
import { resolve } from 'path'

import shopRoutes from './routes/shop'
import { adminRoutes } from './routes/admin'
import mainDir from './utils/path'
import { get404 } from './controllers/error'
import { sequelize } from './utils/dbUtils'

const app: Express = express()
const PORT: number = 3000

// Set up view engine and views directory
app.set('view engine', 'ejs')
app.set('views', resolve(mainDir, 'views'))

// Middleware
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static(resolve(mainDir, '..', 'public')))

// Routes
app.use('/admin', adminRoutes)
app.use(shopRoutes)

// 404 Not Found Route
app.use(get404)

sequelize
	.sync()
	.then(() => {
		// Start the server
		app.listen(PORT, () => {
			console.log(`App is listening at port ${PORT}`)
			console.log('Database synchronization was successful')
		})
	})
	.catch((error) => {
		console.error('Error syncing models with database:', error)
	})
