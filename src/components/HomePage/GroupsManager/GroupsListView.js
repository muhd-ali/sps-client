import React, { Component } from 'react';
import user from '../../../models/User';
import GroupRowView from './GroupRowView';
import ListView from '../GenericManager/ListView';

class Main extends Component {
  constructor(props) {
    super(props);
    this.listView = React.createRef();
  }

  fetchGroups() {
    return new Promise((resolve, reject) => {
      user.fetchGroups()
        .then(groups => {
          resolve(groups);
        })
        .catch(err => reject(err));
    });
  }

  rowFor(index, item) {
    return <GroupRowView
      index={index+1}
      key={index}
      group={item}
      triggerReset={() => this.reset()}
    />;
  }

  headerFields() {
    return [
      'Group',
      'Created On',
      'Options'
    ];
  }

  reset() {
    this.listView.current.reset();
  }

  render() {
    return (
      <ListView
        ref={this.listView}
        rowFor={(index, item) => this.rowFor(index, item)}
        headerFields={this.headerFields()}
        fetchItems={() => this.fetchGroups()}
      />
    );
  }
}

export default Main;
