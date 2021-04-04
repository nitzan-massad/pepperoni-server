import axios from 'axios'

export function SendMailService (mailAddressToSendTo, contentOfMail) {
  const data = {
    from: 'postmaster@sandbox2d66f08ea90f4c899007250d43e94dab.mailgun.org',
    to: mailAddressToSendTo,
    subject: 'Receipt From Pepperoni Pizza',
    text: contentOfMail
  }
  const queryParam = BuildUrlQueryParams(data)
  axios.post('https://api.mailgun.net/v3/sandbox2d66f08ea90f4c899007250d43e94dab.mailgun.org/messages',
    queryParam,
    {
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'cache-control': 'no-cache'
      },
      auth: {
        username: process.env.MAIL_USER,
        password: process.env.MAIL_SECRET
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
