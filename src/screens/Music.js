import React from 'react';
import { Button } from '@material-ui/core';
import Chat from '../components/Chat'
// import './styles.css';

class Music extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
        <div className="App">
        <Button onClick={() => this.props.history.push('/')}>Go back to home</Button>
        <p>
            Welcome to music page.
            <Button>Share link</Button>
            <div>
            Music board goes here
            </div>
            <div>
            Select from sounds/beats
            </div>
            <Button>Download Music</Button>
        </p>
        <Chat />
        </div>
      );
  }
}

export default Music;
