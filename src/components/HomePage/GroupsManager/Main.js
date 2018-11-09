import React, { Component } from 'react';
import AddGroupView from './AddGroupView';
import GroupsListView from './GroupsListView';
import GenericManager from '../GenericManager/Main';

class Main extends Component {
  render() {
    return (
      <GenericManager
        title={'Groups'}
        listView={GroupsListView}
        addView={AddGroupView}
        addViewTitle={'Add Group'}
      />
    );
  }
}

export default Main;
