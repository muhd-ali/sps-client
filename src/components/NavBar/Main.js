import React, { Component } from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { appName } from './../../global/constants';
import AccountButton from './AccountButton';
import GroupsButton from './GroupsButton';
import {withRouter} from 'react-router-dom';

class Main extends Component {
  render() {
    return (
      <Navbar inverse fixedTop>
        <Navbar.Header>
          <Navbar.Brand>
            <a href='/'>{appName}</a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav pullRight>
            <AccountButton></AccountButton>
            <GroupsButton></GroupsButton>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default withRouter(Main);
