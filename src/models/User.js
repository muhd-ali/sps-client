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

  uploadFiles(files, onProgress) {
    return new Promise((resolve, reject) => {
      const url = appInfo.serverAddressWithTokenFor('files/upload', this.token);
      const data = new FormData();
      for (let i = 0; i < files.length; i++) {
        data.append(
          'file_'+i,
          files[i],
          files[i].name
        );
        axios.post(url, data,{
          'onUploadProgress': (e) => onProgress(e)
        }).then(res => {
          resolve(res);
        }).catch(err => {
          reject(err);
        });
      }
    });
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
    const self = this;
    const url = appInfo.serverAddressWithTokenFor('user/info', this.token);
    return new Promise((resolve) => {
      axios.get(url)
        .then(response => {
          self.info = response.data;
          resolve();
        })
    });
  }
}

const user = new User();
export default user;
