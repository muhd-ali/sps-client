class AppInfo {
  constructor() {
    this.url_local = 'http://localhost:3000';
    this.url = 'https://thawing-badlands-89809.herokuapp.com';
    this.name = 'SP Share';
    this.serverAddress_local ='http://localhost:8080';
    this.serverAddress ='https://quiet-stream-72857.herokuapp.com';
  }

  serverAddressWithTokenFor(url, token) {
    return this.serverAddress + '/' + url + '/token=' + token;
  }

  securedRoutes() {
    return {
      'root': '/',
      'accountSettings': '/account/settings',
      'callback': '/callback',
    };
  }

  unsecuredRoutes() {
    return {
      'signIn': '/signin',
      'errorSignIn': '/error/signin',
      'errorSomething': '/error/SomethingWentWrong',
    };
  }

  getRoutes() {
    return {
      ...this.securedRoutes(),
      ...this.unsecuredRoutes(),
      'default': '*',
    };
  }
}

class AppSecurity {
  getNameBlackList() {
    return /[/\\+*]/;
  }
}

const appInfo = new AppInfo();
const appSecurity = new AppSecurity();
export {
  appInfo,
  appSecurity,
};
