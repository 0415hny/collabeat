import React from 'react';
import { Button } from '@material-ui/core';
import { Widget } from 'react-chat-widget';
import 'react-chat-widget/lib/styles.css'; 
import './Chat.css'
class Chat extends React.Component {
  constructor(props) {
    super(props);
  }

  handleNewUserMessage =(e) => {
    console.log("new message?", e);
  }

  render() {
    return (
        <div>
          <Widget
            title="Chat"
            subtitle="Say something"
            handleNewUserMessage={this.handleNewUserMessage}
            className="chatStyle"
          />
        </div>
      );
  }
}

export default Chat;
