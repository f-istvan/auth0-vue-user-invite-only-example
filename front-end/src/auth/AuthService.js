import Auth0Lock from 'auth0-lock'
import EventEmitter from 'eventemitter3'
import decode from 'jwt-decode'
import router from '../router/routes'

var AUTH_CONFIG = {
  domain: process.env.AUTH0.DOMAIN,
  clientId: process.env.AUTH0.FRONT_END_CLIENT_ID
}

class AuthService {
  idToken;
  accessToken;
  expiresAt;

  authenticated = this.isAuthenticated()
  admin = this.isAdmin()
  authNotifier = new EventEmitter()

  constructor () {
    // Add callback Lock's `authenticated` event
    this.lock.on('authenticated', this.setSession.bind(this))
    // Add callback for Lock's `authorization_error` event
    this.lock.on('authorization_error', error => console.log(error))
  }

  lock = new Auth0Lock(AUTH_CONFIG.clientId, AUTH_CONFIG.domain, {
    autoclose: true,
    auth: {
      audience: 'https://'+ AUTH_CONFIG.domain +'/api/v2/',
      redirectUrl: window.location.origin + '/login-callback',
      responseType: 'token id_token',
      params: {
        scope: 'openid profile app_metadata'
      },
      autoParseHash: false
    }
  })

  login () {
    // Call the show method to display the widget.
    this.lock.show()
  }

  setSession (authResult) {
    console.log('setSession, authResult', authResult)

    if (authResult && authResult.accessToken && authResult.idToken) {
      // Set the time that the access token will expire at
      const expiresAt = JSON.stringify(
        authResult.expiresIn * 1000 + new Date().getTime()
      )

      console.log('authResult', authResult)
      console.log('authResult.expiresIn', authResult.expiresIn)

      this.idToken = authResult.idToken
      this.accessToken = authResult.accessToken
      this.expiresAt = expiresAt

      localStorage.setItem('loggedIn', 'true')

      this.authNotifier.emit('authChange', { authenticated: true, admin: this.isAdmin() })

      // navigate to the home route
      router.push('/')
    }
  }

  resumeAuth (hash) {
    this.lock.resumeAuth(hash, () => {})
  }

  getAccessToken () {
    const accessToken = this.accessToken

    if (!accessToken) {
      throw new Error('No access token found')
    }

    return accessToken
  }

  renewSession () {
    localStorage.removeItem('renewSession called')
    if (localStorage.getItem('loggedIn') === 'true') {
      this.lock.checkSession({}, (err, authResult) => {
        if (authResult && authResult.accessToken && authResult.idToken) {
          this.setSession(authResult)
        } else if (err) {
          this.logout()
          console.log(err)
          alert(`Could not get a new token (${err.error}: ${err.error_description}).`)
        }
      })
    }
  }

  logout () {
    // Clear access token and ID token from local storage
    this.idToken = null
    this.accessToken = null
    this.expiresAt = null

    this.authNotifier.emit('authChange', { authenticated: false, admin: false })

    localStorage.removeItem('loggedIn')

    console.log('logout, ', this.accessToken)

    let auth0LogoutUrl = 'http://' + process.env.AUTH0.DOMAIN + '/v2/logout' +
      '?returnTo=' + window.location.origin + '/login' +
      '&client_id=' + process.env.AUTH0.FRONT_END_CLIENT_ID

    console.log(auth0LogoutUrl)
    window.location = auth0LogoutUrl
  }

  isAuthenticated () {
    // Check whether the current time is past the
    // access token's expiry time
    const isLoggedIn = localStorage.getItem('loggedIn') === 'true'

    console.log('isAuthenticated, isLoggedIn', isLoggedIn)
    console.log('isAuthenticated, this.expiresAt', this.expiresAt)
    console.log('isAuthenticated, new Date().getTime() < this.expiresAt', new Date().getTime() < this.expiresAt)
    console.log('isAuthenticated, this.expiresAt && isLoggedIn && new Date().getTime() < this.expiresAt', this.expiresAt && isLoggedIn && new Date().getTime() < this.expiresAt)

    // (undef) || false
    return this.expiresAt && isLoggedIn && new Date().getTime() < this.expiresAt
  }

  getRoles () {
    const namespace = process.env.AUTH0.OIDC_CLAIM_CUSTOM_NAMESPACE + '/roles'
    if (this.idToken) {
      return decode(this.idToken)[namespace] || []
    }
    return []
  }

  getUserNickname () {
    if (this.idToken) {
      return decode(this.idToken)['nickname'] || ''
    }
    return ''
  }

  isAdmin () {
    return this.getRoles().includes('admin')
  }
}

export default new AuthService()
