class AppInfo {
  constructor() {
    this.url = 'http://localhost:3000';
    this.name = 'SP Share';
    this.serverAddress ='http://localhost:8080';
  }

  serverAddressWithTokenFor(url, token) {
    return this.serverAddress + '/' + url + '/token=' + token;
  }

  securedRoutes() {
    return {
      'root': '/',
      'accountSettings': '/account/settings',
    };
  }

  unsecuredRoutes() {
    return {
      'signIn': '/signin',
      'errorSignIn': '/error/signin',
      'errorSomething': '/error/SomethingWentWrong',
      'callback': '/callback',
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

const appInfo = new AppInfo();
export {
  appInfo,
};
