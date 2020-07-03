import React from "react";
import { Grid } from "@material-ui/core";
import Tone from "tone";
import GridButton from "./GridButton";

class MusicBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: fill(4),
      cols: fill(16),
      color: "grey",
    };
  }
  playSound = (row) => {
    const synth = new Tone.AMSynth().toMaster();
    let rowToNote = {
      0: "A1",
      1: "D2",
      2: "E3",
      3: "C4",
      4: "C1",
    };

    console.log(row, rowToNote[row]);
    synth.triggerAttackRelease(rowToNote[row], "8n");
    this.setState = {
      color: "red",
    };
  };
  render() {
    const FormRow = ({ col }) => {
      return (
        <Grid container spacing={1}>
          {this.state.rows.map((row, i) => {
            return (
              <Grid item>
                <GridButton playSound={() => this.playSound(row)} />
              </Grid>
            );
          })}
        </Grid>
      );
    };
    return (
      <div>
        <Grid container xs={12} spacing={1} wrap="nowrap">
          {this.state.cols.map((col) => {
            return (
              <Grid container item>
                <FormRow row={col} />
              </Grid>
            );
          })}
        </Grid>
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
