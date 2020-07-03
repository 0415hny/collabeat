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
            This is homepage
            Welcome to collabeatbeatbeat
          </p>
          <Button onClick={() => this.props.history.push('/music')}>go to music page</Button>
        </header>
      </div>
    );
  }
}

export default Home;
