import React, { Component } from 'react';
import {AppBar} from 'material-ui';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import CompanyView from './containers/CompanyView';
import './App.css';
import EmployeeDisplayFormat from './containers/EmployeeDisplayFormat';


class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
          <div className="App">
              <AppBar />
              <EmployeeDisplayFormat />
          </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
