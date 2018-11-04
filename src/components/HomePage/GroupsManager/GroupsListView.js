import React, { Component } from 'react';
import { Grid, Table, Well, Col, Row, Button } from 'react-bootstrap';
import user from '../../../models/User';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import GroupRowView from './GroupRowView';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      'isCommentsModalShowing': false,
      'isGroupsLoaded': false,
      'isLoadSuccessfully': false,
      'groups': null,
    };
    this.fetchGroups();
  }

  reset() {
    this.setState({
      'isGroupsLoaded': false,
      'isLoadSuccessfully': false,
      'groups': null,
    }, () => {
      this.fetchGroups();
    });
  }

  fetchGroups() {
    user.fetchGroups()
      .then(groups => {
        this.setState({
          'isGroupsLoaded': true,
          'isLoadSuccessfully': true,
          'groups': groups,
        });
      })
      .catch(err => {
        this.setState({
          'isGroupsLoaded': true,
          'isLoadSuccessfully': false,
        });
      });
  }

  message() {
    if (this.state.isGroupsLoaded) {
      if (this.state.isLoadSuccessfully) {
        if (!this.state.groups.length > 0) {
          return <p>No Groups to show.</p>;
        }
      } else {
        return <p>Something went wrong. Please try Again.</p>;
      }
    } else {
      return <div>
        <p>Loading Groups... <FontAwesomeIcon icon='spinner' spin/></p>
      </div>;
    }
  }

  rowsFor(groups) {
    const rows = [];
    for (let i=0; i<groups.length; i++) {
      rows.push(
        <GroupRowView
          index={i+1}
          key={i}
          group={groups[i]}
        />
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
            <th>#</th>
            <th>Group</th>
            <th>Created On</th>
            <th>Options</th>
          </tr>
        </thead>
        <tbody
          style={{
            'overflowY': 'scroll',
            'height': '500px',
          }}
        >
          { this.rowsFor(this.state.groups) }
        </tbody>
      </Table>
    </div>;
  }

  view() {
    if (this.state.isGroupsLoaded &&
      this.state.isLoadSuccessfully &&
      this.state.groups.length > 0) {
      return this.viewForFiles();
    } else {
      return <Row>
        <Col smOffset={4} sm={4}>
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

  render() {
    return (
      <div>
        <Grid>
          { this.view() }
        </Grid>
      </div>
    );
  }
}

export default Main;
