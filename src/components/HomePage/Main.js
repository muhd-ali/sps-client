import React, { Component } from 'react';
import { Grid, Col, Row, Button } from 'react-bootstrap';
import user from '../../models/User';
import FileManager from './FileManager/Main';

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
        </Grid>
      </div>
    );
  }
}

export default Main;
