import React, { Component } from 'react';
import './App.css';
import NavBar from './components/NavBar/Main';
import { BrowserRouter } from 'react-router-dom';
import Routes from './routes';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <NavBar></NavBar>
          <div id="pageContent">
            <Routes></Routes>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
