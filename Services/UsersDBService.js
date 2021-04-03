
const usersInformation = []

export function setNewUser (username, userDetails) {
  usersInformation[username] = userDetails
}
export function getUser (username) {
  if (!isUserExists(username)) { return undefined }
  return { username: username, ...usersInformation[username] }
}

export function isUserExists (username) {
  return username in usersInformation
}
export function updateUser (username, userDetails) {
  usersInformation[username] = { ...usersInformation[username], ...userDetails }
}
export function deleteUser (username) {
  delete usersInformation[username]
}
