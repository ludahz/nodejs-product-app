import { Sequelize } from 'sequelize'

const sequelize = new Sequelize({
	dialect: 'mysql',
	host: 'localhost',
	port: 3306,
	username: 'root',
	password: '106*park',
	database: 'node-complete',
})

export { sequelize }

// // const mysql = require('mysql2/promise')
// import mysql from 'mysql2/promise'

// // Create a reusable connection pool
// const pool = mysql.createPool({
// 	host: 'localhost',
// 	user: 'root',
// 	database: 'node-complete',
// 	password: '106*park',
// })

// // Execute a query using the connection pool
// async function executeQuery(query: string, values?: any[]) {
// 	try {
// 		const connection = await pool.getConnection()
// 		const [rows, fields] = await connection.query(query, values)
// 		connection.release()
// 		return rows
// 	} catch (err) {
// 		throw err
// 	}
// }

// export default { executeQuery }
