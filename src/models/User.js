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

  addComment(file, text) {
    return new Promise((resolve, reject) => {
      const url = appInfo.serverAddressWithTokenFor('comments/add/file=' + file._id, this.token);
      const data = {
        'text': text,
      };
      axios.post(url, data).then(res => {
        resolve(res);
      }).catch(err => {
        console.log('error');
        reject(err);
      });
    });
  }

  getCommentsFor(file) {
    return new Promise((resolve, reject) => {
      const url = appInfo.serverAddressWithTokenFor('comments/file=' + file._id, this.token);
      axios.get(url)
        .then(response => {
          resolve(response.data);
        })
        .catch(err => reject(err));
    });
  }

  fetchFiles() {
    return new Promise((resolve, reject) => {
      const url = appInfo.serverAddressWithTokenFor('files/all', this.token);
      axios.get(url)
        .then(response => {
          resolve(response.data);
        })
        .catch(err => reject(err));
    });
  }

  download(file) {
    const url = appInfo.serverAddressWithTokenFor('files/download/id=' + file._id, this.token);
    return new Promise((resolve) => {
      axios.get(url)
        .then(response => {
          resolve(response);
        });
    });
  }

  uploadFiles(files, onProgress) {
    return new Promise((resolve, reject) => {
      const url = appInfo.serverAddressWithTokenFor('files/upload', this.token);
      const data = new FormData();
      for (let i = 0; i < files.length; i++) {
        data.append(
          'files',
          files[i],
        );
      }
      axios.post(url, data,{
        'onUploadProgress': (e) => onProgress(e)
      }).then(res => {
        resolve(res);
      }).catch(err => {
        reject(err);
      });
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

  createGroup(name, users) {
    return new Promise((resolve, reject) => {
      const url = appInfo.serverAddressWithTokenFor('groups/add', this.token);
      const data = {
        'name': name,
        'users': users,
      };
      axios.post(url, data)
        .then(res => {
          resolve();
        })
        .catch(err => {
          reject();
        });
    });
  }

  fetchUsers() {
    const url = appInfo.serverAddressWithTokenFor('user/all', this.token);
    return new Promise((resolve) => {
      axios.get(url)
        .then(response => {
          resolve(response.data);
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
        });
    });
  }
}

const user = new User();
export default user;
