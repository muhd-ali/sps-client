import React, { Component } from 'react';
import { Grid } from 'react-bootstrap';

class Template extends Component {
  render() {
    return (
      <Grid>
        <div>
          <h1>Awww...Don’t Cry.</h1>
          {this.props.innerView}
        </div>
      </Grid>
    );
  }
}

export default Template;
