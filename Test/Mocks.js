import v8 from 'v8'

const userDetails1 = { email: 'user1@gmail.com', streetAdderss: 'morad hysmin 10', name: 'shlomi shabat' }
const newUser2 = 'newUser21'

export const responseMock = {
  statusCode: undefined
}
const defaultRequest = {
  body: {
    username: undefined,
    ...userDetails1
  }
}

export const StructuredClone = obj => { return v8.deserialize(v8.serialize(obj)) }

export function getResponseMock () {
  const ans = StructuredClone(responseMock)
  ans.status = (value) => { responseMock.statusCode = value }
  ans.send = (value) => {}
  return ans
}
export function getDefaultRequest () {
  return StructuredClone(defaultRequest)
}
