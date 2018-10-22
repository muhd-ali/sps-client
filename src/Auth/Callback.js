import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import auth0Client from './Auth';
import LoadingProfile from '../components/SystemMessages/Loading/LoadingProfile/Main';
import user from '../models/User';

class Callback extends Component {


  async componentDidMount() {
    await auth0Client.handleAuthentication();
    let url = '/';
    if (user.info.isNewUser) {
      url = '/account/settings';
    }
    this.props.history.replace(url);
  }

  render() {
    return (
      <LoadingProfile/>
    );
  }
}

export default withRouter(Callback);
