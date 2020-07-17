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
import homeIcon from './home.png';
import backIcon from './back.png';
import shareIcon from './share.png';
import downloadIcon from './download.png';

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
  // constructor(props) {
  //   super(props);
  // }
  playSound = () => {
    const synth = new Tone.MembraneSynth().toMaster();

    // const loop = new Tone.Loop(function (time) {
    //   //triggered every eighth note.
    //   synth.triggerAttackRelease("C2", "2n");
    // }, "2n").start(0);

    Tone.Transport.start();
  };
  render() {
    const share = (
      <Popup
          trigger={
            <Button style={{ backgroundColor: "#2d1a63", color: "white", margin: 10 }}>
              <img alt="alt" src={shareIcon} style={{ height: 20, marginRight: 10 }} />
              Share Music
            </Button>
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
    )

    return (
      <div className="App">
        <div style={{ padding: 20, display: 'flex' }}>
          <Button onClick={() => this.props.history.push("/collabeat")} style={{ backgroundColor: "#2d1a63", marginRight: 20 }}>
            <img alt="alt" src={backIcon} style={{ height: 20, paddingRight: 10 }} />
            <img alt="alt" src={homeIcon} style={{ height: 30 }} />
          </Button>
        </div>

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
        <Button style={{ backgroundColor: "#2d1a63", color: "white", margin: 10 }}>
          <img alt="alt" src={downloadIcon} style={{ height: 20, marginRight: 10 }}/>
          Download Music
        </Button>
        {share}
        <Chat/>
      </div>
    );
  }
}

export default Music;
