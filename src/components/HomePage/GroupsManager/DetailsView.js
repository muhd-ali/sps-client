import React, { Component } from 'react';
import { FormGroup, ListGroupItem, ListGroup, ControlLabel, FormControl, Button, Well, Col, Row } from 'react-bootstrap';
import user from '../../../models/User';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import TextField from '../../TextField';


class Main extends Component {
  viewFor(index, user) {
    return <ListGroupItem
      key={index}
    >
      {user}
    </ListGroupItem>;
  }

  viewForUsers() {
    const list = [];
    const users = this.props.group.users;
    for (let i=0; i<users.length; i++) {
      list.push(
        this.viewFor(i, users[i])
      );
    }
    return <div
      style={{
        'overflowY': 'scroll',
        'maxHeight': '400px',
      }}
    >
      <ListGroup>
        { list }
      </ListGroup>
    </div>;
  }

  render() {
    return (
      <div>
        {this.viewForUsers()}
      </div>
    );
  }
}

export default Main;
