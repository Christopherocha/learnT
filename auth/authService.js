// import auth0 from 'auth0-js';

// export default class Auth {
//   auth0 = new auth0.WebAuth({
//     domain: 'todayilearnt.auth0.com',
//     clientID: 'XASKjI4mAfsyRqTf9Rjp7HecVTqPDMy_',
//     redirectUri: 'http://localhost:3000/callback',
//     audience: 'https://todayilearnt.auth0.com/userinfo',
//     responseType: 'token id_token',
//     scope: 'openid'
//   });

//   login() {
//     this.auth0.authorize();
//   }
// }

import { EventEmitter } from 'events'
import { isTokenExpired } from './jwtHelper'
import auth0 from 'auth0-js'
export default class AuthService extends EventEmitter {
  constructor(clientId, domain) {
    super()
    // Configure Auth0
    this.auth0 = new auth0.WebAuth({
      clientID: clientId,
      domain: domain,
      responseType: 'token id_token',
      redirectUri: `${window.location.origin}/`
    })
    this.login = this.login.bind(this)
    this.signup = this.signup.bind(this)
    this.loginWithGoogle = this.loginWithGoogle.bind(this)
  }
login(email, password) {
    this.auth0.client.login({
      realm: 'learntDB',
      username: email,
      password: password,
      scope: 'openid profile'
    }, (err, authResult) => {
      if (err) {
        alert('Error: ' + err.description)
        return
      }
      console.log(authResult);
      if (authResult && authResult.idToken && authResult.accessToken) {
        this.setToken(authResult.accessToken, authResult.idToken)
        this.getUser(authResult.accessToken)
        window.location = window.location.origin //redirect to main page
      }
    })
  }
signup(email, password){
    this.auth0.redirect.signupAndLogin({
      connection: 'learntDB',
      email,
      password,
    }, function(err) {
      if (err) {
        alert('Error: ' + err.description)
      }
    })
  }
loginWithGoogle() {
    this.auth0.authorize({
      connection: 'google-oauth2',
    })
  }
parseHash(hash) {
    this.auth0.parseHash({ hash }, (err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setToken(authResult.accessToken, authResult.idToken)
        console.log('AuthService parseHash : code to transition to /')
        this.auth0.client.userInfo(authResult.accessToken, (error, profile) => {
          if (error) {
            console.log('Error loading the Profile', error)
          } else {
            this.setProfile(profile)
          }
        })
      } else if (authResult && authResult.error) {
        alert('Error: ' + authResult.error)
      }
    })
  }
getUser(token) {
  this.auth0.client.userInfo(token, (error, profile) => {
    if (error) {
      console.log('Error loading the Profile', error)
    } else {
      this.setProfile(profile);
      this.getProfile();
    }
  })
}
loggedIn() {
    // Checks if there is a saved token and it's still valid
    const token = this.getToken()
    return !!token && !isTokenExpired(token)
  }
setToken(accessToken, idToken) {
    // Saves user access token and ID token into local storage
    localStorage.setItem('access_token', accessToken)
    localStorage.setItem('id_token', idToken)
  }
setProfile(profile) {
    // Saves profile data to localStorage
    localStorage.setItem('profile', JSON.stringify(profile))
    // Triggers profile_updated event to update the UI
    this.emit('profile_updated', profile)
  }
getProfile() {
    // Retrieves the profile data from localStorage
    const profile = localStorage.getItem('profile')
    return profile ? JSON.parse(localStorage.profile) : {}
  }
getToken() {
    // Retrieves the user token from localStorage
    return localStorage.getItem('id_token')
  }
logout() {
    // Clear user token and profile data from localStorage
    localStorage.removeItem('id_token')
    localStorage.removeItem('profile')
  }
}