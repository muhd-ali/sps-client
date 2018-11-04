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
