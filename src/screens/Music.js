import React from "react";
import { Button } from "@material-ui/core";
import Chat from "../components/Chat";
import Popup from "reactjs-popup";

// import './styles.css';

import {
  EmailShareButton,
  EmailIcon,
  FacebookIcon,
  FacebookShareButton,
  FacebookMessengerIcon,
  FacebookMessengerShareButton,
  TumblrIcon,
  TumblrShareButton,
  TwitterShareButton,
  TwitterIcon,
  RedditIcon,
  RedditShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";

class Music extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="App">
        <Button onClick={() => this.props.history.push("/")}>
          Go back to home
        </Button>
        <p>
          Welcome to music page.
          <div>Music board goes here</div>
          <div>Select from sounds/beats</div>
          <Button>Download Music</Button>
        </p>
        <Chat />
        <Popup
          trigger={
            <button size="lg" className="button">
              Share Music
            </button>
          }
          modal
        >
          {(close) => (
            <div className="modal">
              <a className="close" onClick={close}>
                &times;
              </a>
              <div className="header">Share Music to Social Media</div>
              <div className="content">
                <FacebookShareButton>
                  <FacebookIcon size={36} round />
                </FacebookShareButton>
                <FacebookMessengerShareButton>
                  <FacebookMessengerIcon size={36} round />
                </FacebookMessengerShareButton>
                <TwitterShareButton>
                  <TwitterIcon size={36} round />
                </TwitterShareButton>
                <TumblrShareButton>
                  <TumblrIcon size={36} round />
                </TumblrShareButton>
                <RedditShareButton>
                  <RedditIcon size={36} round />
                </RedditShareButton>
                <WhatsappShareButton>
                  <WhatsappIcon size={36} round />
                </WhatsappShareButton>
                <EmailShareButton>
                  <EmailIcon size={36} round />
                </EmailShareButton>
              </div>
            </div>
          )}
        </Popup>
      </div>
    );
  }
}

export default Music;
