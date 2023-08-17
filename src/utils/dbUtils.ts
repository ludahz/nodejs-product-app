// const mysql = require('mysql2/promise')
import mysql from 'mysql2/promise'

// Create a reusable connection pool
const pool = mysql.createPool({
	host: 'localhost',
	user: 'root',
	database: 'node-complete',
	password: '106*park',
})

// Execute a query using the connection pool
async function executeQuery(query: string) {
	try {
		const connection = await pool.getConnection()
		const [rows, fields] = await connection.query(query)
		connection.release()
		return rows
	} catch (err) {
		throw err
	}
}

export default { executeQuery }
