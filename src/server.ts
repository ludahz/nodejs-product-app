import express from 'express'
import bodyParser from 'body-parser'

import shopRoutes from './routes/shop'

const app = express()

app.use(bodyParser.urlencoded({
    extended: true
}))

app.use(shopRoutes)

app.listen(3000, () => {
    console.log('App is listening at port 3000')
})