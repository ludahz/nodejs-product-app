import express, { Express, Request } from 'express'
import { resolve } from 'path'

import shopRoutes from './routes/shop'
import { adminRoutes } from './routes/admin'
import mainDir from './utils/path'
import { get404 } from './controllers/error'
import { sequelize } from './utils/dbUtils'

import './models/association'

import User from './models/user'
import session from 'express-session'

const app: Express = express()
const PORT: number = 3000

// Set up view engine and views directory
app.set('view engine', 'ejs')
app.set('views', resolve(mainDir, 'views'))

// Middleware
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static(resolve(mainDir, '..', 'public')))

// Set up session
app.use(
	session({
		secret: '-thisIsMySecretKey-',
		resave: false,
		saveUninitialized: false,
		// store: new SequelizeStore({
		// 	db: sequelize,
		// }),
	})
)

app.use(async (req: any, res, next) => {
	// If user is not already stored in the session, fetch it from the database
	if (!req.user) {
		try {
			const user = await User.findByPk(1)
			// req.session.user = user
			req.user = user
		} catch (error) {
			console.error('Error fetching user:', error)
			next(error)
			return
		}
	}
	next()
})

// Routes
app.use('/admin', adminRoutes)
app.use(shopRoutes)

// 404 Not Found Route
app.use(get404)

sequelize
	.sync()
	.then(async () => {
		const [user] = await User.findOrCreate({
			where: { id: 1 },
			defaults: {
				name: 'Ludah',
				email: 'ludah@example.com',
			},
		})
		app.listen(PORT, () => {
			console.log(`App is listening at port ${PORT}`)
			console.log('Database synchronization was successful')
		})
	})
	.catch((error) => {
		console.error('Error syncing models with database:', error)
	})
