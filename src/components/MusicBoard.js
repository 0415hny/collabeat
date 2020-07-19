import React from "react";
import { Grid, Button } from "@material-ui/core";
import Tone from "tone";
import GridButton from "./GridButton";
import Options from "./Options";
import LoadMusic from "./LoadMusic";

const audioStyles = { width: "100%", height: "30px" };
const audioCtx = Tone.context;
const dest = audioCtx.createMediaStreamDestination();
const recorder = new MediaRecorder(dest.stream);

const NUMROWS = 7;
const NUMCOLS = 16;

const buttonStyles = {
  backgroundColor: "#2d1a63",
  color: "white",
  marginRight: 20,
};

class MusicBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: fill(NUMROWS),
      cols: fill(NUMCOLS),
      notes: fillNotes(NUMCOLS),
      gridColours: createGridColourMatrix(NUMROWS, NUMCOLS),
      src: null,
      instrument: parseInt(this.props.instrument),
      scale : this.props.scale,
      loaded: { isLoaded: false },
      sampler: LoadMusic(parseInt(this.props.instrument)).toMaster().connect(dest)
    };
    this.handleClick = this.handleClick.bind(this);
    console.log(this.state.sampler);

  }

  componentWillUpdate(prevProps){
    if(prevProps.instrument !== this.state.instrument){
        this.setState({          
            instrument: parseInt(this.props.instrument),
            scale: this.props.scale,
            loaded: { isLoaded: false },
            sampler: LoadMusic(parseInt(this.props.instrument)).toMaster().connect(dest)
        });
    }
}
    
  playSound = (row, col) => {
    const { scale } = this.state;

    let newNote = scale[row];
    let notes = [...this.state.notes];
    notes[col] = newNote;
    this.setState({
      notes: notes,
    });
    console.log(row, scale[row]);
    this.state.sampler.triggerAttackRelease(newNote, "8n");

    console.log(this.state.notes);
  };

  removeNote = (index) => {
    let notes = [...this.state.notes];
    notes[index] = null;
    this.setState({
      notes: notes,
    });
    console.log(this.state.notes);
  };

  recordTrack = () => {
    let sampler = this.state.sampler;
    let part = new Tone.Sequence(
      function (time, note) {
        sampler.triggerAttackRelease(note, "10hz", time);
      },
      this.state.notes,
      "4n"
    );
    part.start();
    recorder.start();
    Tone.Transport.start();
  };

  stopRecording = (part) => {
    recorder.stop();
    part.stop();
    Tone.Transport.stop();

    let data = [];

    recorder.ondataavailable = (e) => data.push(e.data);
    recorder.onstop = (e) => {
      let blob = new Blob(data, { type: "audio/ogg; codecs=opus" });
      this.setState({
        src: URL.createObjectURL(blob),
      });

      this.props.musicComposed(URL.createObjectURL(blob));
    };
  };

  changeOptions = (val, type) => {
    console.log("in changetempo", val, type);
    const { sampler } = this.state;
    switch (type) {
      case "tempo":
        Tone.Transport.bpm.value = val;
        break;
      case "volume":
        sampler.volume.value = val - 50;
        this.setState({ sampler });
        break;
      case "pitch":
        Tone.Transport.swing.value = val - 50;
        // console.log(;
        // this.setState({ scale: val });
        break;
      case "scale":
        // this.setState({ scale: val });
        break;
      default:
        break;
    }
  };

  handleClick = (row, col) => {
    
    let gridC = [...this.state.gridColours];
    let currentColour = gridC[row][col];
    if (currentColour === "default") {
      gridC[row][col] = "primary";
      this.playSound(row, col);
    } else {
      gridC[row][col] = "default";
      this.removeNote(col);
    }
    this.setState({
      gridColours: gridC,
    });

    console.log({ gridC });
  };

  playTrack = (part) => {
    Tone.Transport.stop();
    if (this.state.notes) {
      part.start();
      Tone.Transport.start();
    } else {
      console.log("no notes to play");
    }
  };

  stopTrack = (part) => {
    part.stop();
    Tone.Transport.stop();
  };

  render() {
    const FormRow = ({ col }) => {
      return (
        <Grid container spacing={1}>
          {this.state.rows.map((row, i) => {
            let currentCol = this.state.gridColours[row][col];
            return (
              <Grid item key={i}>
                <GridButton
                  handleClick={() => this.handleClick(row, col)}
                  disabled={!this.state.loaded} 
                  colour={currentCol}
                />
              </Grid>
            );
          })}
        </Grid>
      );
    };
    let sampler = this.state.sampler;
    let synthPart = new Tone.Sequence(
      function (time, note) {
        sampler.triggerAttackRelease(note, "10hz", time);
      },
      this.state.notes,
      "4n"
    );
    return (
      <div>
        <Grid container spacing={1} wrap="nowrap">
          {this.state.cols.map((col, i) => {
            return (
              <Grid container item key={i}>
                <FormRow col={col} />
              </Grid>
            );
          })}
        </Grid>
        <Grid container justify="center" style={{ margin: 20 }}>
          <Button
            style={buttonStyles}
            onClick={() => this.playTrack(synthPart)}
          >
            Play
          </Button>
          <Button
            style={buttonStyles}
            onClick={() => this.stopTrack(synthPart)}
          >
            Stop
          </Button>
          <Button style={buttonStyles} onClick={() => this.recordTrack()}>
            Start Recording
          </Button>
          <Button
            style={buttonStyles}
            onClick={() => this.stopRecording(synthPart)}
          >
            End Recording
          </Button>
        </Grid>
        <div align="center">
          &nbsp;
          <Options
            tempoValue={Tone.Transport.bpm.value}
            volumeValue={50}
            pitchValue={50}
            handleChange={this.changeOptions}
          />
        </div>
        <div>
          &nbsp;
          <audio
            controls
            style={audioStyles}
            src={this.state.src}
            controlsList="nodownload"
          ></audio>
        </div>
      </div>
    );
  }
}

export default MusicBoard;

function fill(num) {
  let res = [];
  for (let i = 0; i < num; i++) {
    res.push(i);
  }

  return res;
}

function fillNotes(num) {
  let res = [];
  for (let i = 0; i < num; i++) {
    res.push(null);
  }

  return res;
}

function createGridColourMatrix(rows, cols) {
  let matrix = Array(rows)
    .fill()
    .map(() => Array(cols).fill("default"));

  console.log(matrix);
  return matrix;
}