import React from 'react';
import { Button } from '@material-ui/core';
// import './App.css';


class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>
            Welcome to Collabeat!
          </p>
          <Button color="secondary" variant="outlined" onClick={() => this.props.history.push('/music')}>Let's Make Some Music!</Button>
        </header>
      </div>
    );
  }
}

export default Home;
