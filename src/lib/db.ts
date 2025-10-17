import mysql from 'mysql2/promise'

const url = process.env.DATABASE_URL // e.g., mysql://user:pass@localhost:3306/db
if (!url) throw new Error('DATABASE_URL missing')

let pool: mysql.Pool

export function getPool() {
  if (!pool) {
    pool = mysql.createPool({
      uri: url,
      connectionLimit: 10,
      supportBigNumbers: true,
      dateStrings: true,
    })
  }
  return pool
}
