import auth0 from 'auth0-js';
import { appInfo } from './../global/constants';
import user from '../models/User';

class Auth {
  constructor() {
    this.clientID = 'ATgqm_2d-H595P0cgfNluRZA-FU3UpAd';
    this.auth0 = new auth0.WebAuth({
      domain: 'venom-in-veins.auth0.com',
      clientID: this.clientID,
      redirectUri: appInfo.url + '/callback',
      responseType: 'token id_token',
      scope: 'openid email profile'
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
        this.setSession(authResult).then(() => {
          resolve();
        });
      });
    });
  }

  async setSession(authResult) {
    this.idToken = authResult.idToken;
    this.profile = authResult.idTokenPayload;
    this.expiresAt = authResult.expiresIn * 1000 + new Date().getTime();
    await user.populateFrom(authResult.accessToken);
  }

  silentAuth() {
    return new Promise((resolve, reject) => {
      this.auth0.checkSession({}, (err, authResult) => {
        if (err) return reject(err);
        this.setSession(authResult).then(() => {
          resolve();
        });
      });
    });
  }

  isAuthenticated() {
    return new Date().getTime() < this.expiresAt;
  }

  // scheduleRenewal() {
  //   const delay = this.expiresAt - Date.now();
  //   if (delay > 0) {
  //     this.tokenRenewalTimeout = setTimeout(() => {
  //       this.renewToken();
  //     }, delay);
  //   }
  // }

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
