import React, { Component } from 'react';
import Template from './../../Template';

class Main extends Component {
  render() {
    const innerView = <h2>
      Loading Profile...
    </h2>;
    return (
      <Template innerView={innerView}></Template>
    );
  }
}

export default Main;
