import React, { Component } from 'react';
import { Button, ListGroupItem } from 'react-bootstrap';
import ButtonMenu from './ButtonMenu';
import auth0Client from '../../Auth/Auth.js';


class AccountButton extends Component {
  signIn() {
    auth0Client.signIn();
  }

  signOut() {
    console.log('trying to sign out');
    auth0Client.signOut();
  }

  render() {
    const innerView = [
      <ListGroupItem key={1} style={{'textAlign': 'center'}}>
        {!auth0Client.isAuthenticated() &&
          <Button bsStyle="primary" onClick={() => this.signIn()}>Sign in</Button>
        }
        {auth0Client.isAuthenticated() &&
          <Button bsStyle="danger" onClick={() => this.signOut()}>Sign out</Button>
        }
      </ListGroupItem>,
    ];

    return (
      <ButtonMenu id='account_navbar' title='My Account' innerView={innerView}>
      </ButtonMenu>
    );
  }
}

export default AccountButton;
