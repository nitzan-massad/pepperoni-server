import axios from 'axios'

export function SendMailService (mailAddressToSendTo, contentOfMail) {
/*  const data = {
    from: 'postmaster@sandboxb1816692980043c1bc064f5a172771c1.mailgun.org',
    to: 'nitzanmassad@gmail.com',
    subject: 'Hello',
    text: 'Congratulations'
  } */
  const data = {
    from: 'postmaster@sandboxb1816692980043c1bc064f5a172771c1.mailgun.org',
    to: mailAddressToSendTo,
    subject: 'Receipt From Pepperoni Pizza',
    text: contentOfMail
  }
  const queryParam = BuildUrlQueryParams(data)
  axios.post('https://api.mailgun.net/v3/sandboxb1816692980043c1bc064f5a172771c1.mailgun.org/messages',
    queryParam,
    {
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'cache-control': 'no-cache'
      },
      auth: {
        username: 'api',
        password: 'af48b29fd78767f8ef151754fb7ecf93-b6d086a8-89632cb6'
      }
    }).then((response) => {
    console.log(`response from mail service: ${response.status}`)
  }, (error) => {
    console.log(`error in mail service: ${error}`)
  })
}

export function BuildUrlQueryParams (data) {
  const esc = encodeURIComponent
  const UrlQueryParam = Object.keys(data)
    .map(k => esc(k) + '=' + esc(data[k]))
    .join('&')
  return UrlQueryParam
}
