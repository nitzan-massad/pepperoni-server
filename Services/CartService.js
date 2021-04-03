const userCarts = {}

export function AddToCart (username, cartItems) {
  if (username in userCarts) {
    userCarts[username] = [...userCarts[username], ...cartItems]
  } else {
    userCarts[username] = [...cartItems]
  }
}

export function getCartItemsForUser (username) {
  return userCarts[username]
}
