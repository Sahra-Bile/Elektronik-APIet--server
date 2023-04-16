import sqlite3 from 'sqlite3'
import { IUser } from '../models/IUser'

export const db = new sqlite3.Database('database.db')

db.run(`CREATE TABLE IF NOT EXISTS users(
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  firstName TEXT NOT NULL,
  lastName TEXT NOT NULL, 
  email TEXT NOT NULL,
  password TEXT NOT NULL, 
  confirmPassword TEXT NOT NULL,
  CONSTRAINT uniqueEmail UNIQUE(email)


)`)

export const register = async (user: IUser, callBack: Function) => {
  const sql = `INSERT INTO users(firstName, lastName, email, password, confirmPassword)VALUES(?,?,?,?,?)`

  const values = [
    user.firstName,
    user.lastName,
    user.email,
    user.password,
    user.confirmPassword,
  ]
  db.run(sql, values, callBack)
}

export const logIn = async (email: string, callBack: Function) => {
  const sql_query = `SELECT * FROM users WHERE email = ?`

  const values = [email]
  db.get(sql_query, values, callBack)
}

export const getUser = async (callBack: Function) => {
  const sql_query = `SELECT * FROM users`
  db.all(sql_query, callBack)
}

export const findUserByEmail = async (email: string, callBack: Function) => {
  const sql = 'SELECT COUNT(*) AS count FROM users WHERE email = ?'
  db.all(sql, [email], callBack)
}
