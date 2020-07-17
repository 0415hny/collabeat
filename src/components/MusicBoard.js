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

class MusicBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: fill(NUMROWS),
      cols: fill(NUMCOLS),
      notes: fillNotes(NUMCOLS),
      gridColours: createGridColourMatrix(NUMROWS, NUMCOLS),
      src: null,
      instrument: "piano",
      scale : [ "B2", "A2","G2", "F2","E2","D2","C2" ],
      loaded: { isLoaded: false }
    };
    this.handleClick = this.handleClick.bind(this);

    this.sampler = LoadMusic().toMaster();
    this.sampler.connect(dest);
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
    this.sampler.triggerAttackRelease(newNote, "8n");

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

  playEntireBeat = (part) => {
    // create a new sequence with the synth and notes
    console.log(this.state.notes);

    // Setup the synth to be ready to play on beat 1
    part.start();
    // Note that if you pass a time into the start method
    // you can specify when the synth part starts
    // e.g. .start('8n') will start after 1 eighth note
    // start the transport which controls the main timeline
    recorder.start();

    Tone.Transport.start();
  };

  stopEntireBeat = (part) => {
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
    console.log('in changetempo', val, type);
    switch (type) {
      case 'tempo':
        Tone.Transport.bpm.value = val;
        break;
      case 'volume':
        break;
      case 'scale':
        this.setState({ scale: val });
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
                  disabled={!isLoaded} 
                  colour={currentCol}
                />
              </Grid>
            );
          })}
        </Grid>
      );
    };
    let sampler = this.sampler;
    let synthPart = new Tone.Sequence(
      function (time, note) {
        sampler.triggerAttackRelease(note, "10hz", time);
      },
      this.state.notes,
      "4n"
    );
    const { isLoaded } = this.state.loaded;
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
          <Button style={{ backgroundColor: "#2d1a63", color: "white", marginRight: 20 }} onClick={() => this.playEntireBeat(synthPart)}>Start Recording</Button>
          <Button style={{ backgroundColor: "#2d1a63", color: "white" }} onClick={() => this.stopEntireBeat(synthPart)}>
            End Recording
          </Button>
        </Grid>
        <div align="center">
          &nbsp;
          <Options
            tempoValue={Tone.Transport.bpm.value}
            volumeValue={50}
            handleChange={this.changeOptions}
          />
        </div>
        <div>
          &nbsp;
          <audio controls style={audioStyles} src={this.state.src} controlsList="nodownload"></audio>
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