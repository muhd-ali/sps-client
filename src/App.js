import React, { Component } from 'react';
import './App.css';
import NavBar from './components/NavBar/Main';
import { withRouter } from 'react-router-dom';
import Routes from './routes';
import auth0Client from './Auth/Auth';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkingSession: true,
    };
  }

  async componentDidMount() {
    console.log('here1');
    if (this.props.location.pathname === '/callback') {
      this.setState({checkingSession:false});
      return;
    }
    console.log('here2');
    try {
      await auth0Client.silentAuth();
      this.forceUpdate();
    } catch (err) {
      if (err.error === 'login_required') {
        this.props.history.replace('/error/signin');
      }
    }
    console.log('here3');
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
