import React, { Component } from 'react';
import LoadingTemplate from './../LoadingTemplate';

class Main extends Component {
  render() {
    const innerView = <h2>
      Loading Profile...
    </h2>;
    return (
      <LoadingTemplate innerView={innerView}></LoadingTemplate>
    );
  }
}

export default Main;
