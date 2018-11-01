import React, { Component } from 'react';
import LoadingTemplate from './../LoadingTemplate';

class Main extends Component {
  render() {
    const innerView = <h2>
      Validating Session...
    </h2>;
    return (
      <LoadingTemplate innerView={innerView}></LoadingTemplate>
    );
  }
}

export default Main;
