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

  updateDataTo(data) {
    return new Promise((resolve, reject) => {
      const url = appInfo.serverAddressWithTokenFor('user/update', this.token);
      axios.post(url, data)
        .then(response => {
          resolve('Updated changes successfully at server');
        })
        .catch(err => {
          reject('I am sorry. I failed you.');
        });
    });
  }

  requestInfoFromServer() {
    const url = appInfo.serverAddressWithTokenFor('user/info', this.token);
    return axios.get(url)
      .then(response => {
        this.info = response.data;
      });
  }
}

const user = new User();
export default user;
