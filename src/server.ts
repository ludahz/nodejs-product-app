import express, { Express } from 'express'
import { resolve } from 'path'

import shopRoutes from './routes/shop'
import { adminRoutes, products } from './routes/admin'
import mainDir from './utils/path'

const app: Express = express()
const PORT: number = 3000

// set ejs as the view engine
app.set('view engine', 'ejs')

// Set the directory for your views
app.set('views', 'src/views')

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(express.static(resolve(mainDir, '..', 'public')))

app.use('/admin', adminRoutes)
app.use(shopRoutes)

app.use((req, res) => {
	// const filePath = resolve(mainDir, 'views', '404.html')
	// res.status(404).sendFile(filePath)
	res.status(404).render('404', { pageTitle: 'Page Not Found' })
})

app.listen(PORT, () => {
	console.log(`App is listening at port ${PORT}`)
})
