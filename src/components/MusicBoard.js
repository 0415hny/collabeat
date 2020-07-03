import React from "react";
import { Grid, Button } from "@material-ui/core";
import Tone from "tone";
import GridButton from "./GridButton";

const synth = new Tone.AMSynth().toMaster();

class MusicBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: fill(4),
      cols: fill(16),
      notes: fillNotes(16),
      toggleOnOff: false,
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
    console.log(col, { notes });
    this.setState({
      notes: notes,
    });
    console.log(row, rowToNote[row]);
    synth.triggerAttackRelease(newNote, "8n");

    console.log(this.state.notes);
  };

  updateNotesFromChildHandler = (index) => {
    let newNotes = [...this.state.notes];
    newNotes.splice(index, 1);
  };

  playEntireBeat = () => {
    // create a new sequence with the synth and notes
    const synthPart = new Tone.Sequence(
      function (time, note) {
        synth.triggerAttackRelease(note, "10hz", time);
      },
      this.state.notes,
      "4n"
    );

    // Setup the synth to be ready to play on beat 1
    synthPart.start();
    // Note that if you pass a time into the start method
    // you can specify when the synth part starts
    // e.g. .start('8n') will start after 1 eighth note
    // start the transport which controls the main timeline
    Tone.Transport.start();
  };

  stopEntireBeat = () => {
    Tone.Transport.stop();
  };

  render() {
    const FormRow = ({ col }) => {
      return (
        <Grid container spacing={1}>
          {this.state.rows.map((row, i) => {
            return (
              <Grid item key={i}>
                <GridButton
                  updatedNotesArray={() =>
                    this.updateNotesFromChildHandler(col)
                  }
                  playSound={() => this.playSound(row, col)}
                />
              </Grid>
            );
          })}
        </Grid>
      );
    };
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
        <Button onClick={() => this.playEntireBeat()}>Play</Button>
        <Button onClick={() => this.stopEntireBeat()}>Stop</Button>
        <Button
          onClick={() => {
            var synth = new Tone.PolySynth().toMaster();
            synth.set("detune", -1200);
            synth.triggerAttackRelease(["A1", "D2"], "4n");
            Tone.Transport.start();
          }}
        >
          Test
        </Button>
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
