import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import HomePage from './components/HomePage/Main';
import NotFoundPage from './components/NotFound/Main';
import auth0Client from './Auth/Auth';
import Callback from './Auth/Callback';
// <Route exact path={'/order/:type(' + productTypes.join('|') + ')'} component={OrderPage}></Route>

class SecuredRoute extends Component {
  render() {
    if (!auth0Client.isAuthenticated()) {
      auth0Client.signIn();
      return <div></div>;
    } else {
      return <Route path={this.props.path} component={this.props.component}></Route>;
    }
  }
}

function Routes() {
  return <Switch>
    <SecuredRoute exact path='/' component={HomePage}></SecuredRoute>
    <Route exact path='/callback' component={Callback}/>
    <Route exact path='*' component={NotFoundPage}></Route>
  </Switch>;
}
export default Routes;
