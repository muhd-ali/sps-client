import React, { Component } from 'react';
import { Grid, Table, Well, Col, Row, Button } from 'react-bootstrap';
import user from '../../../models/User';
import FileRowView from './FileRowView';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      'isCommentsModalShowing': false,
      'isfilesLoaded': false,
      'isLoadSuccessfully': false,
      'files': null,
    };
    this.fetchFiles();
  }

  reset() {
    this.setState({
      'isfilesLoaded': false,
      'isLoadSuccessfully': false,
      'files': null,
    }, () => {
      this.fetchFiles();
    });
  }

  fetchFiles() {
    user.fetchFiles()
      .then(files => {
        this.setState({
          'isfilesLoaded': true,
          'isLoadSuccessfully': true,
          'files': files,
        });
      })
      .catch(err => {
        this.setState({
          'isfilesLoaded': true,
          'isLoadSuccessfully': false,
        });
      });
  }

  message() {
    if (this.state.isfilesLoaded) {
      if (this.state.isLoadSuccessfully) {
        if (!this.state.files.length > 0) {
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

  rowsFor(files) {
    const rows = [];
    for (let i=0; i<files.length; i++) {
      rows.push(
        <FileRowView
          index={i}
          key={i}
          file={files[i]}
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
          { this.rowsFor(this.state.files) }
        </tbody>
      </Table>
    </div>;
  }

  view() {
    if (this.state.isfilesLoaded &&
      this.state.isLoadSuccessfully &&
      this.state.files.length > 0) {
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
