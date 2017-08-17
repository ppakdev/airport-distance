import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

import AirportContainer from './AirportContainer';
import plane from '../media/plane.svg';
import './App.css';

injectTapEventPlugin();


class App extends Component {
  render() {
    return (
        <MuiThemeProvider>
          <div className="App">
            <div className="App-header">
              <img src={plane} className="App-logo" alt="logo" />
              <h2>Airport Distance Calculator</h2>
            </div>
            <AirportContainer />
          </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
