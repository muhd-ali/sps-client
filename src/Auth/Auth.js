import auth0 from 'auth0-js';
import { appInfo } from './../global/constants';

class Auth {
  constructor() {
    this.clientID = 'ATgqm_2d-H595P0cgfNluRZA-FU3UpAd';
    this.auth0 = new auth0.WebAuth({
      domain: 'venom-in-veins.auth0.com',
      clientID: this.clientID,
      redirectUri: appInfo.url + '/callback',
      responseType: 'token id_token',
      scope: 'openid profile'
    });

    this.getProfile = this.getProfile.bind(this);
    this.handleAuthentication = this.handleAuthentication.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
    this.signIn = this.signIn.bind(this);
    this.signOut = this.signOut.bind(this);
  }

  getProfile() {
    return this.profile;
  }

  getIdToken() {
    return this.idToken;
  }

  handleAuthentication() {
    return new Promise((resolve, reject) => {
      this.auth0.parseHash((err, authResult) => {
        if (err) return reject(err);
        if (!authResult || !authResult.idToken) {
          return reject(err);
        }
        this.idToken = authResult.idToken;
        this.profile = authResult.idTokenPayload;
        // set the time that the id token will expire at
        this.expiresAt = authResult.expiresIn * 5000 + new Date().getTime();
        resolve();
      });
    });
  }

  isAuthenticated() {
    return new Date().getTime() < this.expiresAt;
  }

  signIn() {
    this.auth0.authorize();
  }

  signOut() {
    this.auth0.logout({
      returnTo: appInfo.url,
      clientID: this.clientID,
    });
  }
}

const auth0Client = new Auth();

export default auth0Client;
