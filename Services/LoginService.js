import jwt from 'jsonwebtoken'

const blacklist = []
export function generateAccessToken (username) {
  const ans = jwt.sign(username, process.env.TOKEN_SECRET)
  return ans
}

export function logoutService (token) {
  blacklist.push(token)
}
export function IsLogoutToken (token) {
  return blacklist.find(element => JSON.stringify(element) === JSON.stringify(token))
}
function generateSecretToken () {
  const secretToken = require('crypto').randomBytes(64).toString('hex')
  process.env.TOKEN_SECRET = secretToken
}
