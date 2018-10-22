import React, { Component } from 'react';
import Template from './../../Template';

class Main extends Component {
  render() {
    const innerView = <h2>
      Validating Session...
    </h2>;
    return (
      <Template innerView={innerView}></Template>
    );
  }
}

export default Main;
