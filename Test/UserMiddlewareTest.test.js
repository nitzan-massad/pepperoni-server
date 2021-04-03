/* eslint-disable no-undef */
import { CreateNewUserMiddleware, DeleteUserMiddleware, EditUserMiddleware } from '../Middlewares/UsersMiddleware.js'
import assert from 'assert'

const userDetails1 = { email: 'user1@gmail.com', streetAdderss: 'morad hysmin 10', name: 'shlomi shabat' }
const newUser1 = 'newUser11'
const newUser2 = 'newUser21'

describe('Test CreateNewUserMiddleware middleware', () => {
  it('should be false user undefined', () => {
    const localResponseMock = {
      statusCode: undefined,
      status: (value) => { localResponseMock.statusCode = value },
      send: (value) => {}
    }
    const defaultRequest = {
      body: {
        username: undefined,
        ...userDetails1
      }
    }
    CreateNewUserMiddleware(defaultRequest, localResponseMock, () => {})
    assert(localResponseMock.statusCode === 400)
  })

  it('should be false no username ', () => {
    const responseMock = {
      statusCode: undefined,
      status: (value) => { responseMock.statusCode = value },
      send: (value) => {}
    }
    const defaultRequest = {
      body: {
        ...userDetails1
      }
    }
    CreateNewUserMiddleware(defaultRequest, responseMock, () => {})
    assert(responseMock.statusCode === 400)
  })

  it('should be true', () => {
    const responseMock = {
      statusCode: undefined,
      status: (value) => { responseMock.statusCode = value },
      send: (value) => {}
    }
    const defaultRequest = {
      body: {
        username: newUser1,
        ...userDetails1
      }
    }
    CreateNewUserMiddleware(defaultRequest, responseMock, () => {})
    assert(responseMock.statusCode === 200)
  })

  it('should be false adding same username twice', () => {
    const responseMock = {
      statusCode: undefined,
      status: (value) => { responseMock.statusCode = value },
      send: (value) => {}
    }
    const defaultRequest = {
      body: {
        username: newUser2,
        ...userDetails1
      }
    }
    CreateNewUserMiddleware(defaultRequest, responseMock, () => {})
    CreateNewUserMiddleware(defaultRequest, responseMock, () => {})

    assert(responseMock.statusCode === 400)
  })
})

describe('Test EditUserMiddleware middleware', () => {
  it('should be false user undefined', () => {
    const responseMock = {
      statusCode: undefined,
      status: (value) => { responseMock.statusCode = value },
      send: (value) => {}
    }
    const defaultRequest = {
      body: {
        username: undefined,
        ...userDetails1
      }
    }
    EditUserMiddleware(defaultRequest, responseMock, () => {})
    assert(responseMock.statusCode === 400)
  })

  it('should be false username not provided', () => {
    const responseMock = {
      statusCode: undefined,
      status: (value) => { responseMock.statusCode = value },
      send: (value) => {}
    }
    const defaultRequest = {
      body: {
        ...userDetails1
      }
    }
    EditUserMiddleware(defaultRequest, responseMock, () => {})
    assert(responseMock.statusCode === 400)
  })

  it('should be false username not exists', () => {
    const responseMock = {
      statusCode: undefined,
      status: (value) => { responseMock.statusCode = value },
      send: (value) => {}
    }
    const defaultRequest = {
      body: {
        username: newUser1 + 'blabla',
        ...userDetails1
      }
    }
    EditUserMiddleware(defaultRequest, responseMock, () => {})
    assert(responseMock.statusCode === 400)
  })
  it('should be true', () => {
    const responseMock = {
      statusCode: undefined,
      status: (value) => { responseMock.statusCode = value },
      send: (value) => {}
    }
    const defaultRequest = {
      body: {
        username: newUser1,
        ...userDetails1
      }
    }
    EditUserMiddleware(defaultRequest, responseMock, () => {})
    assert(responseMock.statusCode === 200)
  })
})

describe('Test DeleteUserMiddleware middleware', () => {
  it('should be false user undefined ', () => {
    const localResponseMock = {
      statusCode: undefined,
      status: (value) => {
        localResponseMock.statusCode = value
      },
      send: (value) => {
      }
    }
    const defaultRequest = {
      body: {
        username: undefined,
        ...userDetails1
      }
    }
    DeleteUserMiddleware(defaultRequest, localResponseMock, () => {
    })
    assert(localResponseMock.statusCode === 400)
  })
  it('should be false no username ', () => {
    const responseMock = {
      statusCode: undefined,
      status: (value) => { responseMock.statusCode = value },
      send: (value) => {}
    }
    const defaultRequest = {
      body: {
        ...userDetails1
      }
    }
    DeleteUserMiddleware(defaultRequest, responseMock, () => {})
    assert(responseMock.statusCode === 400)
  })

  it('should be deleted', () => {
    const responseMock = {
      statusCode: undefined,
      status: (value) => { responseMock.statusCode = value },
      send: (value) => {}
    }
    const defaultRequest = {
      body: {
        username: newUser1,
        ...userDetails1
      }
    }
    DeleteUserMiddleware(defaultRequest, responseMock, () => {})
    assert(responseMock.statusCode === 200)
  })
})
