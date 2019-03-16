import auth0 from 'auth0-js'

let webAuth = new auth0.WebAuth({
  domain: process.env.AUTH0.DOMAIN,
  clientID: process.env.AUTH0.WEB_AUTH_CLIENT_ID
})

const changePassword = function (email, cb) {
  webAuth.changePassword({
    connection: process.env.AUTH0.CONNECTION,
    email: email
  }, cb)
}

export {
  changePassword
}
