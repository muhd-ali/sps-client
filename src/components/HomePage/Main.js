import React, { Component } from 'react';
import { Grid, Row } from 'react-bootstrap';
import user from '../../models/User';
import FileManager from './FileManager/Main';
import GroupsManager from './GroupsManager/Main';

class Main extends Component {
  render() {
    return (
      <div>
        <Grid>
          <Row>
            <h1>
              Hi {user.info.name},
            </h1>
          </Row>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          <Row>
            <FileManager/>
          </Row>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          <Row>
            <GroupsManager/>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default Main;
