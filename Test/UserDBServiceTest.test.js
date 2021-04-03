/* eslint-disable no-undef */
import assert from 'assert'
import { isUserExists, getUser, setNewUser, updateUser, deleteUser } from '../Services/UsersDBService.js'
import { extractFromBlackList, generateAccessToken, IsLogoutToken, logoutService } from '../Services/LoginService.js'
import { authenticateAccessToken } from '../Middlewares/SessionMiddleware.js'
import dotenv from 'dotenv'

const userDetails1 = { email: 'user1@gmail.com', streetAdderss: 'morad hysmin 10', name: 'shlomi shabat' }
const userDetails2 = { email: 'user2@gmail.com', streetAdderss: 'morad hysmin 12', name: 'shlomi shishi' }
const newUser1 = 'newUser1'
const newUser2 = 'newUser2'

describe('Test getUser function', () => {
  it('should be true', () => {
    const expectedAns = { username: newUser1, ...userDetails1 }
    setNewUser(newUser1, userDetails1)
    setNewUser(newUser2, userDetails2)
    const ans = getUser(newUser1)
    assert(JSON.stringify(ans) === JSON.stringify(expectedAns))
  })

  it('should be false', () => {
    const expectedAns = { username: newUser1, ...userDetails2 }
    setNewUser(newUser1, userDetails1)
    setNewUser(newUser2, userDetails2)

    const ans = getUser(newUser1)
    assert(JSON.stringify(ans) !== JSON.stringify(expectedAns))
  })
})

describe('Test isUserExists function', () => {
  it('should be true', () => {
    setNewUser(newUser1, userDetails1)
    setNewUser(newUser2, userDetails2)
    const ans = isUserExists(newUser1)
    assert(ans)
  })

  it('should be false', () => {
    setNewUser(newUser2, userDetails2)
    const ans = isUserExists(newUser1)
    assert(ans)
  })
})

describe('Test updateUser function', () => {
  it('should be true', () => {
    const expectedAns = { username: newUser1, ...userDetails2 }
    setNewUser(newUser1, userDetails1)
    updateUser(newUser1, userDetails2)
    const ans = getUser(newUser1)
    assert(JSON.stringify(ans) === JSON.stringify(expectedAns))
  })

  it('should be false', () => {
    const expectedAns = { username: newUser1, ...userDetails1 }
    setNewUser(newUser1, userDetails1)
    updateUser(newUser1, userDetails2)
    const ans = getUser(newUser1)
    assert(JSON.stringify(ans) !== JSON.stringify(expectedAns))
  })
  it('update part of user details', () => {
    setNewUser(newUser1, userDetails1)
    const partOfDetails = { email: userDetails2.email }
    const expectedAns = { username: newUser1, ...userDetails1, ...partOfDetails }
    updateUser(newUser1, partOfDetails)
    const ans = getUser(newUser1)
    assert(JSON.stringify(ans) === JSON.stringify(expectedAns))
  })
})
describe('Test deleteUser function', () => {
  it('should be true', () => {
    setNewUser(newUser1, userDetails1)
    deleteUser(newUser1)
    const ans = getUser(newUser1)
    assert(ans === undefined)
  })

  it('should be true, the othe user was not deleted', () => {
    const expectedAns = { username: newUser1, ...userDetails1 }
    setNewUser(newUser1, userDetails1)
    setNewUser(newUser2, userDetails2)
    deleteUser(newUser2)
    const ans = getUser(newUser1)
    assert(JSON.stringify(ans) === JSON.stringify(expectedAns))
  })
})
describe('Test logoutService function', () => {
  it('should be true', () => {
    dotenv.config()

    const responseMock = {
      statusCode: undefined,
      sendStatus: (value) => { responseMock.statusCode = value },
      send: (value) => {}
    }
    const token = generateAccessToken(newUser1)
    const defaultRequest = {
      headers: {
        authorization: token
      }
    }
    logoutService(token)
    authenticateAccessToken(defaultRequest, responseMock, () => {})
    assert(responseMock.statusCode === 401)
  })

  it('check logout', () => {
    dotenv.config()
    const token = generateAccessToken('shlomiShani')
    logoutService(token)
    const ans = IsLogoutToken(token)
    assert(ans)
  })
})
describe('Test extractFromBlackList function', () => {
  it('list is empty', () => {
    dotenv.config()
    const token = generateAccessToken('shlomiShani23')
    extractFromBlackList(token)
    const ans = IsLogoutToken(token)
    assert(!ans)
  })
  it('list is with token should work', () => {
    dotenv.config()
    const token = generateAccessToken('shlomiShani24')
    logoutService(token)
    extractFromBlackList(token)
    const ans = IsLogoutToken(token)
    assert(!ans)
  })
  it('item is not in the list ', () => {
    dotenv.config()
    const token = generateAccessToken('shlomiShani21')
    const token2 = generateAccessToken('shlomiShani22')
    logoutService(token)
    extractFromBlackList(token2)
    const ans = IsLogoutToken(token2)
    assert(!ans)
  })
})

describe('Test IsLogoutToken function', () => {
  it('blacklist is empty, so he is not logout ', () => {
    dotenv.config()
    const token = generateAccessToken('shlomiShani7')
    const ans = IsLogoutToken(token)
    assert(!ans)
  })
  it('should be true', () => {
    dotenv.config()
    const token = generateAccessToken('shlomiShani5')
    logoutService(token)
    const ans = IsLogoutToken(token)
    assert(ans)
  })

  it('token dont exist in the list ', () => {
    dotenv.config()
    const token = generateAccessToken('shlomiShani3')
    const token2 = generateAccessToken('shlomiShani4')
    logoutService(token)
    const ans = IsLogoutToken(token2)
    assert(!ans)
  })
  it('token is undefined  ', () => {
    dotenv.config()
    const token = generateAccessToken('shlomiShani7')
    logoutService(token)
    const ans = IsLogoutToken(undefined)
    assert(!ans)
  })
})
