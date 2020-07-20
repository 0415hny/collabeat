import React from "react";
import { Button, Container, Grid } from "@material-ui/core";
import Chat from "../components/Chat";
import Popup from "reactjs-popup";
import MusicBoard from "../components/MusicBoard";
import InstrumentCard from "../components/InstrumentCard";
import piano from "../img/piano.jpg";
import sax from "../img/saxophone.jpg";
import guitar from "../img/guitar.jpg";
import harp from "../img/harp.jpg";
import cello from "../img/cello.jpg";
import homeIcon from "../img/home.png";
import backIcon from "../img/back.png";
import shareIcon from "../img/share.png";
import downloadIcon from "../img/download.png";
import Autogenerate from "../components/Autogenerate";
import { targets } from "../GA/Targets";
import Selection from "../GA/Selection";

import {
  EmailShareButton,
  EmailIcon,
  FacebookIcon,
  FacebookShareButton,
  FacebookMessengerIcon,
  FacebookMessengerShareButton,
} from "react-share";

const imageNames = ["Piano", "Guitar", "Saxophone", "Harp", "Cello"];
const imagePaths = [piano, guitar, sax, harp, cello];
const scales = [
  ["B2", "A2", "G2", "F2", "E2", "D2", "C2"],
  ["B2", "A2", "G2", "F2", "E2", "D2", "C2"],
  ["B2", "A3", "G2", "F2", "E2", "D2", "C3"],
  ["B3", "A2", "G3", "F2", "E3", "D2", "C3"],
  ["B2", "A2", "G2", "F2", "E2", "D2", "C2"],
];

class Music extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      disabledDownload: true,
      musicSrc: null,
      instrument: 0,
    };
  }

  musicComposed = (src) => {
    this.setState({
      disabledDownload: false,
      musicSrc: src,
    });
  };

  changeInstrument = (val) => {
    this.setState({
      instrument: val,
    });
  };

  onGenreChange = (newGenre) => {
    console.log("you just changed genres", newGenre);
    let target = targets[newGenre];

    let pop = new Selection();
    pop.repeatSelection();
    const finalSound = pop.findFittest(target);

    console.log({ finalSound: finalSound });
  };

  render() {
    const { disabledDownload, musicSrc } = this.state;

    const share = (
      <Popup
        trigger={
          <Button
            style={{ backgroundColor: "#2d1a63", color: "white", margin: 10 }}
          >
            <img
              alt="alt"
              src={shareIcon}
              style={{ height: 20, marginRight: 10 }}
            />
            Share Music
          </Button>
        }
        modal
      >
        {(close) => (
          <div className="modal">
            <a className="close" onClick={close} href="/">
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
              <EmailShareButton>
                <EmailIcon size={36} round />
              </EmailShareButton>
            </div>
          </div>
        )}
      </Popup>
    );

    return (
      <div className="App">
        <div style={{ padding: 20, display: "flex" }}>
          <Button
            onClick={() => this.props.history.push("/")}
            style={{ backgroundColor: "#2d1a63", marginRight: 20 }}
          >
            <img
              alt="alt"
              src={backIcon}
              style={{ height: 20, paddingRight: 10 }}
            />
            <img alt="alt" src={homeIcon} style={{ height: 30 }} />
          </Button>
        </div>

        <Container className="element">
          <MusicBoard
            musicComposed={this.musicComposed}
            instrument={this.state.instrument}
            scale={scales[this.state.instrument]}
          />
        </Container>

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Grid container justify="center" spacing={2}>
              {/* <Carousel> */}
              {[0, 1, 2, 3, 4].map((value) => (
                <Grid key={value} item>
                  <InstrumentCard
                    name={imageNames[value]}
                    path={imagePaths[value]}
                    val={value}
                    onClick={this.changeInstrument}
                  />
                </Grid>
              ))}
              {/* </Carousel> */}
            </Grid>
          </Grid>
        </Grid>

        <Button
          disabled={disabledDownload}
          style={{
            opacity: disabledDownload ? 0.7 : 1,
            backgroundColor: disabledDownload ? "grey" : "#2d1a63",
            color: "white",
            margin: 10,
          }}
        >
          <img
            alt="alt"
            src={downloadIcon}
            style={{ height: 20, marginRight: 10 }}
          />
          <a
            href={musicSrc}
            download
            style={{ textDecoration: "none", color: "white" }}
          >
            Download Music
          </a>
        </Button>
        {share}
        <Chat />

        <h1>Autogenerate Feature</h1>
        <Grid container justify="center">
          <Autogenerate
            onGenreChange={(newGenre) => this.onGenreChange(newGenre)}
          ></Autogenerate>
        </Grid>
      </div>
    );
  }
}

export default Music;
