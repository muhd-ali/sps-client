import axios from 'axios';
import { appInfo } from '../global/constants';

class User {
  constructor() {
    this.populated = false;
  }

  populateFrom(token){
    this.token = token;
    return this.requestInfoFromServer();
  }

  requestInfoFromServer() {
    const urlExt = '/user/token=' + this.token;
    const url = appInfo.serverAddress + urlExt;
    return axios.get(url)
      .then(response => {
        this.info = response.data;
      });
  }
}

const user = new User();
export default user;
