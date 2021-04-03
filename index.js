import express from 'express'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import { CreateNewUserMiddleware, DeleteUserMiddleware, EditUserMiddleware } from './Middlewares/UsersMiddleware.js'
import { authenticateAccessToken, LoginMiddleware, LogoutMiddleware } from './Middlewares/SessionMiddleware.js'
import { MenuItemMiddleware } from './Middlewares/MenuItemMiddleware.js'
import { AddToCartMiddleware } from './Middlewares/CartMiddleware.js'
import { FinishOrderMiddleware } from './Middlewares/FinishOrderMiddleware.js'

dotenv.config()
const app = express()

const hostname = '127.0.0.1'
const port = 3000

app.post('/createNewUser', bodyParser.json(), CreateNewUserMiddleware, (req, res) => {
})
app.post('/editUser', bodyParser.json(), authenticateAccessToken, EditUserMiddleware, (req, res) => {
})
app.get('/deleteUser', bodyParser.json(), authenticateAccessToken, DeleteUserMiddleware, (req, res) => {
})
app.post('/login', bodyParser.json(), LoginMiddleware, (req, res) => {
})
app.get('/logout', bodyParser.json(), authenticateAccessToken, LogoutMiddleware, (req, res) => {
})
app.get('/getAllMenuItems', bodyParser.json(), authenticateAccessToken, MenuItemMiddleware, (req, res) => {
})
app.post('/addToCart', bodyParser.json(), authenticateAccessToken, AddToCartMiddleware, (req, res) => {
})
app.get('/finishOrder', bodyParser.json(), authenticateAccessToken, FinishOrderMiddleware, (req, res) => {
})

app.listen(port, hostname, () => {
  console.log(`app listening at http://${hostname}:${port}`)
})

console.log(`TOKEN_SECRET:${process.env.TOKEN_SECRET}`)
