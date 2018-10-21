import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import HomePage from './components/HomePage/Main';
import NotFoundPage from './components/SystemMessages/Errors/NotFound/Main';
import SignInError from './components/SystemMessages/Errors/SignIn/Main';
import SignIn from './Auth/SignIn';
import auth0Client from './Auth/Auth';
import Callback from './Auth/Callback';
import AccountSettings from './components/Account/Settings/Main';
// <Route exact path={'/order/:type(' + productTypes.join('|') + ')'} component={OrderPage}></Route>

class SecuredRoute extends Component {
  render() {
    if (this.props.checkingSession) {
      return <h3 className="text-center">
        Validating session...
      </h3>;
    }
    if (!auth0Client.isAuthenticated()) {
      auth0Client.signIn();
      return <div></div>;
    }
    return <Route path={this.props.path} component={this.props.component}></Route>;
  }
}

class Routes extends Component {
  render() {
    return <Switch>
      <SecuredRoute exact path='/' component={HomePage} checkingSession={this.props.checkingSession}></SecuredRoute>
      <SecuredRoute exact path='/account/settings' component={AccountSettings} checkingSession={this.props.checkingSession}></SecuredRoute>
      <Route exact path='/signin' component={SignIn}/>
      <Route exact path='/error/signin' component={SignInError}/>
      <Route exact path='/callback' component={Callback}/>
      <Route exact path='*' component={NotFoundPage}></Route>
    </Switch>;
  }
}

export default Routes;
