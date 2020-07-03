import React from "react";
import { Grid, Button } from "@material-ui/core";
import Tone from "tone";
import GridButton from "./GridButton";
import TempoSlider from "./TempoSlider";

const synth = new Tone.AMSynth();
const audioStyles = { width: "100%", height: "30px" };
const audioCtx = Tone.context;
const dest = audioCtx.createMediaStreamDestination();
const recorder = new MediaRecorder(dest.stream);
synth.connect(dest);

class MusicBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: fill(4),
      cols: fill(16),
      notes: fillNotes(16),
      gridColours: createGridColourMatrix(4, 16),
      src: null,
    };
  }
  playSound = (row, col) => {
    let rowToNote = {
      0: "A1",
      1: "D2",
      2: "E3",
      3: "C4",
    };

    let newNote = rowToNote[row];
    let notes = [...this.state.notes];
    notes[col] = newNote;
    this.setState({
      notes: notes,
    });
    console.log(row, rowToNote[row]);
    synth.toMaster().triggerAttackRelease(newNote, "8n");

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
    };
  };

  changeTempo = (val) => {
    Tone.Transport.bpm.value = val;
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
                  colour={currentCol}
                />
              </Grid>
            );
          })}
        </Grid>
      );
    };
    let synthPart = new Tone.Sequence(
      function (time, note) {
        synth.toMaster().triggerAttackRelease(note, "10hz", time);
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
        <Button onClick={() => this.playEntireBeat(synthPart)}>Record</Button>
        <Button onClick={() => this.stopEntireBeat(synthPart)}>
          Stop Recording
        </Button>
        <div align="center">
          <TempoSlider value={Tone.Transport.bpm.value} handleChange={(val) => this.changeTempo(val)}/>
        </div>
        <div>
          <audio controls style={audioStyles} src={this.state.src}></audio>
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