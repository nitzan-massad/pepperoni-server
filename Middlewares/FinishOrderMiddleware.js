import { getCartItemsForUser } from '../Services/CartService.js'
import { getUser } from '../Services/UsersDBService.js'
import { SendMailService } from '../Services/MailService.js'

export function FinishOrderMiddleware (req, res, next) {
  const username = req.username
  const userEmail = getUser(username)?.email
  if (!userEmail) {
    res.json('Mail Address is not correct.')
    res.status(400)
    next()
    return
  }
  const userCart = getCartItemsForUser(username)
  const mailContent = BuildMailContent(username, userCart)
  SendMailService(userEmail, mailContent).then((response) => {
    console.log(`response from mail service: ${response.status}`)
    res.json(`Mail was sent to your email ${userEmail} with your cart content: ${userCart}`)
    res.status(200)
    next()
  }, (error) => {
    console.log(`error in mail service: ${error}`)
    res.json(error.response.data.message)
    res.status(error.response.status)
    next()
  })
}

function BuildMailContent (username, userCart) {
  let mailContent = ` Hi ${username}\n\n We are happy to give you service.\nHere are the items you ordered:\n\n`
  if (userCart) { userCart?.forEach((value) => { mailContent += `${value}\n` }) }
  return mailContent
}
