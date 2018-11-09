import React, { Component } from 'react';
import AddFileView from './AddFileView';
import FilesListView from './FilesListView';
import GenericManager from '../GenericManager/Main';

class Main extends Component {
  render() {
    return (
      <GenericManager
        title={'Files'}
        listView={FilesListView}
        addView={AddFileView}
        addViewTitle={'Add File'}
      />
    );
  }
}

export default Main;
