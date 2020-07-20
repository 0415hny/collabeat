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
import Tone from "tone";
import {
  clap,
  closeHiHat,
  kick,
  openHiHat,
  ride,
  rim,
  snare,
} from "../music/GAsounds";

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

const audioCtx = Tone.context;
const dest = audioCtx.createMediaStreamDestination();
const recorder = new MediaRecorder(dest.stream);

class Music extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      disabledDownload: true,
      musicSrc: null,
      instrument: 0,
      isLoaded: false,
      players: new Tone.Players(
        { clap, closeHiHat, kick, openHiHat, ride, rim, snare },
        {
          onload: () => {
            this.setState({ isLoaded: true });
          },
        }
      ).toMaster(),
      autoGenTrack: null,
      autoGenMusicSrc: null,
      disabledAutoGenDownload: true,
    };
  }

  componentDidMount() {}

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

  playAutoGeneratedTrack = () => {
    if (this.state.players && this.state.autoGenTrack) {
      let k = this.state.players.get("kick");
      let sn = this.state.players.get("snare");
      let chh = this.state.players.get("closeHiHat");
      let ohh = this.state.players.get("openHiHat");
      let cl = this.state.players.get("clap");
      let ri = this.state.players.get("rim");
      let rid = this.state.players.get("ride");

      let kickLoop = new Tone.Sequence(
        function (time, note) {
          console.log(note);
          if (note === 1) {
            k.start();
          }
        },
        this.state.autoGenTrack[0],
        "4n"
      );
      kickLoop.loop = 1;

      let snareLoop = new Tone.Sequence(
        function (time, note) {
          console.log(note);
          if (note === 1) {
            sn.start();
          }
        },
        this.state.autoGenTrack[1],
        "4n"
      );
      snareLoop.loop = 1;

      let closeHiHatLoop = new Tone.Sequence(
        function (time, note) {
          console.log(note);
          if (note === 1) {
            chh.start();
          }
        },
        this.state.autoGenTrack[2],
        "4n"
      );
      closeHiHatLoop.loop = 1;
      let openHiHatLoop = new Tone.Sequence(
        function (time, note) {
          console.log(note);
          if (note === 1) {
            ohh.start();
          }
        },
        this.state.autoGenTrack[3],
        "4n"
      );
      openHiHatLoop.loop = 1;

      let clapLoop = new Tone.Sequence(
        function (time, note) {
          console.log(note);
          if (note === 1) {
            cl.start();
          }
        },
        this.state.autoGenTrack[4],
        "4n"
      );
      clapLoop.loop = 1;

      let rimLoop = new Tone.Sequence(
        function (time, note) {
          console.log(note);
          if (note === 1) {
            ri.start();
          }
        },
        this.state.autoGenTrack[5],
        "4n"
      );
      rimLoop.loop = 1;

      let rideLoop = new Tone.Sequence(
        function (time, note) {
          console.log(note);
          if (note === 1) {
            rid.start();
          }
        },
        this.state.autoGenTrack[6],
        "4n"
      );
      rideLoop.loop = 1;

      //   kickLoop.start();
      //   snareLoop.start();
      //   closeHiHatLoop.start();
      //   openHiHatLoop.start();
      //   clapLoop.start();
      //   rimLoop.start();
      //   rideLoop.start();

      //   recorder.start();
      //   Tone.Transport.start();
      let index = 0;
      Tone.Transport.scheduleRepeat((time) => {
        console.log(index);
        if (index === 0) {
          kickLoop.start();
          snareLoop.start();
          closeHiHatLoop.start();
          openHiHatLoop.start();
          clapLoop.start();
          rimLoop.start();
          rideLoop.start();
          recorder.start();
        }
        if (index >= 16) {
          recorder.stop();
          console.log("16");
          kickLoop.stop();
          snareLoop.stop();
          closeHiHatLoop.stop();
          openHiHatLoop.stop();
          clapLoop.stop();
          rimLoop.stop();
          rideLoop.stop();
          Tone.Transport.stop();
        } else {
          index++;
        }
      }, "4n");

      Tone.Transport.start();
      let data = [];
      recorder.ondataavailable = (e) => data.push(e.data);
      recorder.onstop = (e) => {
        let blob = new Blob(data, { type: "audio/mp3; codecs=opus" });
        this.setState({
          disabledAutoGenDownload: false,
          autoGenMusicSrc: URL.createObjectURL(blob),
        });
      };
    }
  };

  onGenreChange = (newGenre) => {
    console.log("you just changed genres", newGenre);
    let target = targets[newGenre];

    let pop = new Selection();
    pop.repeatSelection();
    const finalSound = pop.findFittest(target);

    this.setState({
      autoGenTrack: finalSound,
    });

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
          <Button
            onClick={() => this.playAutoGeneratedTrack()}
            disabled={!this.state.isLoaded}
          >
            Play
          </Button>
          <Button
            disabled={this.state.disabledAutoGenDownload}
            style={{
              opacity: this.state.disabledAutoGenDownload ? 0.7 : 1,
              backgroundColor: this.state.disabledAutoGenDownload
                ? "grey"
                : "#2d1a63",
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
              href={this.state.autoGenMusicSrc}
              download
              style={{ textDecoration: "none", color: "white" }}
            >
              Download Autogenerated Music
            </a>
          </Button>
        </Grid>
      </div>
    );
  }
}

export default Music;
