import { isUserExists } from '../Services/UsersDBService.js'
import { extractFromBlackList, generateAccessToken, IsLogoutToken, logoutService } from '../Services/LoginService.js'
import jwt from 'jsonwebtoken'

export function LoginMiddleware (req, res, next) {
  const username = req?.body?.username
  if (!username) {
    res.status(400)
    res.send('Please insert username for login.')
    return
  }
  if (!isUserExists(username)) {
    res.status(400)
    res.send(`username ${username} is not registered in the site.`)
    return
  }
  const accessToken = generateAccessToken(username)
  extractFromBlackList(accessToken)
  res.json(accessToken)
  res.status(200)
  next()
}
export function LogoutMiddleware (req, res, next) {
  const authHeader = req.headers.authorization
  const token = authHeader && authHeader.split(' ')[0]

  logoutService(token)
  res.json('logout successfully ')
  res.status(200)
  next()
}
export function authenticateAccessToken (req, res, next) {
  const authHeader = req.headers.authorization
  const token = authHeader && authHeader.split(' ')[0]
  if (token == null) return res.sendStatus(401)
  if (IsLogoutToken(token)) return res.sendStatus(401)

  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403)
    req.username = user.username
    next()
  })
}
