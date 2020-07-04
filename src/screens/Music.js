import React from "react";
import { Button, Container, Grid } from "@material-ui/core";
import Chat from "../components/Chat";
import Popup from "reactjs-popup";
import MusicBoard from "../components/MusicBoard";
import InstrumentCard from "../components/InstrumentCard";
import Tone from "tone";
import drum from "../img/Drum.png";
import piano from "../img/Piano.png";
import sax from "../img/Sax.png";
import trumpet from "../img/Trumpet.png";

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

const imageNames = ["Piano", "Sax", "Drum", "Trumpet"];
const imagePaths = [piano, sax, drum, trumpet];

class Music extends React.Component {
  constructor(props) {
    super(props);
  }
  playSound = () => {
    const synth = new Tone.MembraneSynth().toMaster();

    const loop = new Tone.Loop(function (time) {
      //triggered every eighth note.
      synth.triggerAttackRelease("C2", "2n");
    }, "2n").start(0);

    Tone.Transport.start();
  };
  render() {
    return (
      <div className="App">
        <Button onClick={() => this.props.history.push("/")}>
          Go back to home
        </Button>

        <p marginBottom="10px">Welcome to music page.</p>

        <Container className="element">
          <MusicBoard />
        </Container>

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Grid container justify="center" spacing={2}>
              {[0, 1, 2, 3].map((value) => (
              <Grid key={value} item>
                <InstrumentCard name={imageNames[value]} path={imagePaths[value]}/>
              </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>

        <div>&nbsp;</div>
        <Button>Download Music</Button>
        <div>&nbsp;</div>
        <Chat/>
        <div>&nbsp;</div>
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
