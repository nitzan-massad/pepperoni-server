/* eslint-disable no-undef */
import { BuildUrlQueryParams, SendMailService } from '../Services/MailService.js'
import assert from 'assert'

describe('Test AddToCart function', () => {
  it('check send mail service', () => {
    SendMailService()
  })
})

describe('Test BuildUrlQueryParams function', () => {
  it('check building correct ', () => {
    const dataToCheck = {
      from: 'postmaster@sandboxb1816692980043c1bc064f5a172771c1.mailgun.org',
      to: 'nitzanmassad@gmail.com',
      subject: 'Hello',
      text: 'Congratulations'
    }
    const expectedVale = 'from=postmaster%40sandboxb1816692980043c1bc064f5a172771c1.mailgun.org&to=nitzanmassad%40gmail.com&subject=Hello&text=Congratulations'
    const ans = BuildUrlQueryParams(dataToCheck)
    assert(ans === expectedVale)
  })
})
