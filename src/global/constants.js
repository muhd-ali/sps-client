class AppInfo {
  constructor() {
    this.url = 'http://localhost:3000';
    this.name = 'SP Share';
    this.serverAddress ='http://localhost:8080';
  }

  serverAddressWithTokenFor(url, token) {
    return this.serverAddress + '/' + url + '/token=' + token;
  }
}

const appInfo = new AppInfo();
export {
  appInfo,
};
