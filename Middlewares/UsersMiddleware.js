import { deleteUser, getUser, isUserExists, setNewUser, updateUser } from '../Services/UsersDBService.js'

export function CreateNewUserMiddleware (req, res, next) {
  const username = req?.body?.username
  if (!username) {
    res.status(400)
    res.send('Please insert username for register to site.')
    return
  }
  if (isUserExists(username)) {
    res.status(400)
    res.send(`username ${username} already registered in the site.`)
    return
  }
  setNewUser(username, { email: req?.body?.email, streetAddress: req?.body?.streetAdderss, name: req?.body?.name })
  res.status(200)
  res.send(`user ${username} added successfully.`)
  next()
}

export function EditUserMiddleware (req, res, next) {
  const username = req?.username

  updateUser(username, { ...req.body })
  getUser(username)
  res.status(200)
  res.send(`user ${username} updated successfully.`)
  next()
}

export function DeleteUserMiddleware (req, res, next) {
  const username = req?.username

  if (!isUserExists(username)) {
    res.status(400)
    res.send(`username ${username} is not registered in the site so will not be deleted`)
    return
  }
  deleteUser(username)
  res.status(200)
  res.send(`user ${username} deleted successfully.`)
  next()
}
