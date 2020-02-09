// This will be the only class in the app. 
//Note that this isn’t a React class component, but instead a vanilla javascript class.
//I tried to setup this file as an arrow function but it did not work well. 
// This file is best setup as a class. 
//This file will hold all of our authentication associated functions and variables.

import auth0 from 'auth0-js'
import history from './history';

export default class Auth {
  //auth0: This is the property we will use to initialize our Auth0 app.
  auth0 = new auth0.WebAuth({
    domain: 'webapp1.auth0.com',
    clientID: '',
    redirectUri: 'http://localhost:3000/callback',
    responseType: 'token id_token',
    scope: 'openid profile email'
  })

  userProfile = {}
//userProfile: This is an empty object that will hold the user profile data we get from Auth0.
  login = () => {
      this.auth0.authorize()
  }
//allowing the user to login with the given .authorize() function.  
  handleAuth = () => {
    //saves the id and access tokens we get from Auth0 to the local browser storage. 
    this.auth0.parseHash((err, authResult) => {
      if(authResult) {
        localStorage.setItem('access_token', authResult.accessToken)
        localStorage.setItem('id_token', authResult.idToken)

        let expiresAt = JSON.stringify((authResult.expiresIn * 1000 + new Date().getTime()))
        localStorage.setItem('expiresAt', expiresAt)

        this.getProfile();
        setTimeout(() => { history.replace('/authcheck') }, 600);
      } else {
        console.log(err)
      }
    })
  }

  getAccessToken = () => {
    //Get the access token from local storage
    if(localStorage.getItem('access_token')) {
      const accessToken = localStorage.getItem('access_token')
      return accessToken
    } else {
      return null
    }
  }


  getProfile = () => {
    // Parse (analyse )the access token to extract the user profile data
    let accessToken = this.getAccessToken()
    if(accessToken) {
      this.auth0.client.userInfo(accessToken, (err, profile) => {
          if(profile) {
            this.userProfile = { profile }
          }
      } )
    }
  }


  logout = () => {
    //Logs out the user by removing the tokens from local storage
    localStorage.removeItem('access_token')
    localStorage.removeItem('id_token')
    localStorage.removeItem('expiresAt')
    setTimeout(() => { history.replace('/authcheck') }, 200);
  }

  isAuthenticated = () => {
    // makes sure the user is logged in by comparing the expires time to the current time.
    let expiresAt = JSON.parse(localStorage.getItem('expiresAt'))
    return new Date().getTime() < expiresAt
  }

}
//Now we can initialize this auth object and add authentication to the context_state_config.js file.