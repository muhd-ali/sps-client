import React, { Component } from 'react';
import { FormGroup, Panel, Checkbox, Table, Well, Col, Row, ControlLabel, FormControl, ProgressBar, Button } from 'react-bootstrap';
import user from '../../../models/User';
import TextField from '../../TextField';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      'isCreateButtonDisabled': true,
      'isUsersLoaded': false,
      'isLoadSuccessfully': false,
      'users': null,
    };
    this.name = '';
    this.fetchFiles();
    this.selectedUsers = [];
  }

  fetchFiles() {
    user.fetchUsers()
      .then(users => {
        this.setState({
          'isUsersLoaded': true,
          'isLoadSuccessfully': true,
          'users': users,
        });
      })
      .catch(err => {
        this.setState({
          'isUsersLoaded': true,
          'isLoadSuccessfully': false,
        });
      });
  }

  message() {
    if (this.state.isUsersLoaded) {
      if (this.state.isLoadSuccessfully) {
        if (!this.state.users.length > 0) {
          return <p>No Users to show.</p>;
        }
      } else {
        return <p>Something went wrong. Please try Again.</p>;
      }
    } else {
      return <div>
        <p>Loading Users... <FontAwesomeIcon icon='spinner' spin/></p>
      </div>;
    }
  }

  toggleFor(e, user) {
    const key = user.email_address;
    if (e.target.checked) {
      this.selectedUsers.push(key);
    } else {
      const index = this.selectedUsers.indexOf(key);
      this.selectedUsers.splice(index, 1);
    }
  }

  rowsFor(users) {
    const rows = [];
    for (let i=0; i<users.length; i++) {
      rows.push(
        <tr key={i}>
          <td style={{'textAlign': 'center'}}>
            <Checkbox
              onChange={e => {
                this.toggleFor(e, users[i]);
              }}
            />
          </td>
          <td>
            {users[i].name}
          </td>
          <td>
            {users[i].email_address}
          </td>
        </tr>
      );
    }
    return rows;
  }

  viewForFiles() {
    return <div
      style={{
        'overflowY': 'scroll',
        'maxHeight': '400px',
      }}
    >
      <Table striped bordered condensed hover>
        <thead>
          <tr>
            <th>Select</th>
            <th>Name</th>
            <th>Email Address</th>
          </tr>
        </thead>
        <tbody
          style={{
            'overflowY': 'scroll',
            'height': '500px',
          }}
        >
          { this.rowsFor(this.state.users) }
        </tbody>
      </Table>
    </div>;
  }

  usersView() {
    if (this.state.isUsersLoaded &&
      this.state.isLoadSuccessfully &&
      this.state.users.length > 0) {
      return this.viewForFiles();
    } else {
      return <Row>
        <Col smOffset={4} sm={4}>
          <br/>
          <Well
            style={{
              'textAlign': 'center'
            }}
          >
            {this.message()}
          </Well>
        </Col>
      </Row>;
    }
  }

  groupNameChanged(name) {
    if (name === '') {
      this.setState({
        'isCreateButtonDisabled': true,
      });
    } else {
      this.setState({
        'isCreateButtonDisabled': false,
      });
    }
    this.name = name;
  }

  create() {
    if (this.state.isCreateButtonDisabled) return;
    this.setState({
      'isCreateButtonDisabled': true,
    });
    user.createGroup(this.name, this.selectedUsers)
      .then(() => {
        this.props.onDone();
      });
  }

  render() {
    return (
      <div>
        <form>
          <TextField
            controlId='groupName'
            label='Group Name'
            value={''}
            valueChangedTo={(name) => {
              this.groupNameChanged(name);
            }}
          />
          <Panel>
            { this.usersView() }
          </Panel>
          <hr/>
          <Button
            bsStyle="primary"
            disabled={this.state.isCreateButtonDisabled}
            onClick={() => this.create()}
          >
            Create
          </Button>
        </form>
      </div>
    );
  }
}

export default Main;
