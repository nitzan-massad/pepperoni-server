import { AddToCart, getCartItemsForUser } from '../Services/CartService.js'

export function AddToCartMiddleware (req, res, next) {
  const username = req.username
  const cartItems = req.body.cartItems
  AddToCart(username, cartItems)
  res.json(getCartItemsForUser(username))
  res.status(200)
  next()
}
