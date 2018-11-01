import React, { Component } from 'react';
import './App.css';
import NavBar from './components/NavBar/Main';
import { withRouter } from 'react-router-dom';
import Routes from './routes';
import auth0Client from './Auth/Auth';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

library.add(faSpinner);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkingSession: true,
    };
  }

  async componentDidMount() {
    if (this.props.location.pathname === '/callback') {
      this.setState({checkingSession:false});
      return;
    }
    try {
      await auth0Client.silentAuth();
      this.forceUpdate();
    } catch (err) {
      let redirectLink = '/error/SomethingWentWrong';
      if (err.error === 'login_required') {
        redirectLink = '/error/signin';
      }
      this.props.history.replace(redirectLink);
    }
    this.setState({checkingSession:false});
  }

  render() {
    return (
      <div>
        <NavBar></NavBar>
        <div id="pageContent">
          <Routes checkingSession={this.state.checkingSession}/>
        </div>
      </div>
    );
  }
}

export default withRouter(App);
