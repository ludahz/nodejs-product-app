import { MongoClient, MongoClientOptions } from 'mongodb'
import * as dotenv from 'dotenv'

//Connect URL

dotenv.config()

const username = process.env.NODEJS_USER
const password = process.env.NODEJS_USER_PASSWORD

const url = `mongodb+srv://${username}:${password}@cluster0.n0pxf.mongodb.net/?retryWrites=true&w=majority`

//Database Name
const dbName = 'myDataBase'

// create a new MongoClient
const client = new MongoClient(url, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
} as MongoClientOptions)

const mongoConnect = (callback: any) => {
	client
		.connect()
		.then(() => {
			callback(client)
		})
		.catch((err) => {
			console.error('Error connecting to MongoDB:', err)
		})
}

export default mongoConnect
