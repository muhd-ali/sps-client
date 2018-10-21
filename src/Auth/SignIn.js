import React, {Component} from 'react';
import auth0Client from './Auth';

class SignIn extends Component {


  componentDidMount() {
    auth0Client.signIn();
  }

  render() {
    return (
      <p>Signing in...</p>
    );
  }
}

export default SignIn;
