class AppInfo {
  constructor() {
    this.url = 'http://localhost:3000';
    this.name = 'SP Service';
    this.serverAddress ='http://localhost:8080';
  }
}

const appInfo = new AppInfo();
export {
  appInfo,
};
