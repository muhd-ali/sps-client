import React, { Component } from 'react';

class Template extends Component {
  render() {
    return (
      <div>
        <h1>Awww...Don’t Cry.</h1>
        {this.props.innerView}
      </div>
    );
  }
}

export default Template;
