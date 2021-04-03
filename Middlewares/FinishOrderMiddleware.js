import { getCartItemsForUser } from '../Services/CartService.js'
import { getUser } from '../Services/UsersDBService.js'
import { SendMailService } from '../Services/MailService.js'

export function FinishOrderMiddleware (req, res, next) {
  const username = req.username
  const userEmail = getUser(username).email
  const userCart = getCartItemsForUser(username)
  const mailContent = BuildMailContent(username, userCart)
  SendMailService(userEmail, mailContent)
  res.status(200)
  next()
}

function BuildMailContent (username, userCart) {
  let mailContent = ` Hi ${username}\n\n We are happy to give you service.\nHere are the items you ordered:\n\n`
  userCart?.forEach((value) => { mailContent += `${value}\n` })
  return mailContent
}
