import React from 'react';
import Modal from 'react-modal';
import { Switch, Route } from 'react-router-dom';
import { AppBar, Toolbar, Button } from '@material-ui/core';

import Music from './screens/Music';
import Home from './screens/Home';
import SignUp from './screens/SignUp';
import logo from './logo.png'
import './App.css';

const modalStyles = {
  content : {
    top : '50%',
    width : 200,
    left : '50%',
    right : 'auto',
    bottom : 'auto',
    marginRight : '-50%',
    transform : 'translate(-50%, -50%)'
  }
}
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showSignUp: false
    }
  }

  render() {
    const { showSignUp } = this.state;
  
    return (
      <div className="App">
        <AppBar position="static" style={{ backgroundColor: "#2d1a63" }}>
          <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
            <img src={logo} className="App-logo" alt="logo" />
            {/* <span>
              <Button color="inherit">Login</Button>
              <Button color="inherit" onClick={() => this.setState({ showSignUp: true })}>Create an Account</Button>
            </span> */}
          </Toolbar>
        </AppBar>
        <Switch>
          <Route exact path="/" render={(props) => <Home {...props} />} />
          <Route exact path="/music" render={(props) => <Music {...props} />} />
        </Switch>
        <Modal
          isOpen={showSignUp}
          onRequestClose={() => this.setState({ showSignUp: false })}
          style={modalStyles}
        >
          <Button onClick={() => this.setState({ showSignUp: false })} style={{ padding: 'unset', minWidth: 'unset' }}>X</Button>
          <SignUp />
        </Modal>
      </div>
    );
  }
}

export default App;
