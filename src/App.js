import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { AppBar, Toolbar, Button } from '@material-ui/core';

import Music from './screens/Music';
import Home from './screens/Home';
import logo from './logo.png'
import './App.css';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <AppBar position="static">
          <Toolbar>
            <img src={logo} className="App-logo" alt="logo" />
            <Button color="inherit">Login</Button>
            <Button color="inherit">Create Account</Button>
          </Toolbar>
        </AppBar>
        <Switch>
          <Route exact path="/" render={(props) => <Home {...props} />} />
          <Route exact path="/music" render={(props) => <Music {...props} />} />
        </Switch>
      </div>
    );
  }
}

export default App;
