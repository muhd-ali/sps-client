import React, { Component } from 'react';
import { } from 'react-bootstrap';
import user from '../../models/User';

class Main extends Component {
  render() {
    return (
      <div>
        <h1>
          Hi {user.info.name}
        </h1>
      </div>
    );
  }
}

export default Main;
