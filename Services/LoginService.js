import jwt from 'jsonwebtoken'

export function generateAccessToken (username) {
  const ans = jwt.sign(username, process.env.TOKEN_SECRET)
  return ans
}

function generateSecretToken () {
  const secretToken = require('crypto').randomBytes(64).toString('hex')
  process.env.TOKEN_SECRET = secretToken
}
