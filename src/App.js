import React, { Component } from 'react';
import {AppBar} from 'material-ui';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import CompanyView from './containers/CompanyView';
import './App.css';

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
          <div className="App">
              <AppBar/>
              <CompanyView/>
          </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
