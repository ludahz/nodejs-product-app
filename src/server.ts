import express, { Express } from 'express'
import { resolve } from 'path'

import shopRoutes from './routes/shop'
import adminRoutes from './routes/admin'
import mainDir from './utils/path'

const app: Express = express()
const PORT: number = 3000

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(express.static(resolve(__dirname, '..', 'public')))

app.use('/admin', adminRoutes)
app.use(shopRoutes)

app.use((req, res) => {
	const filePath = resolve(mainDir, 'views', '404.html')
	res.status(404).sendFile(filePath)
})

app.listen(PORT, () => {
	console.log(`App is listening at port ${PORT}`)
})
