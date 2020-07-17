import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import Input from '@material-ui/core/Input';
const useStyles = makeStyles({
  root: {
    width: 250,
  },
  input: {
    width: 42,
  },
});

// // TODO: write a function to play the scales
// const majorScales = [
//   // { scaleName: "Ab", notes : { 0: "Ab3", 1: "Bb3", 2: "C4", 3: "Db4", 4: "Eb4", 5: "F4", 6: "G4", 7: "Ab4" }},
//   { scaleName: "Ab", notes : ["Ab3", "Bb3", "C4", "Db4", "Eb4", "F4", "G4", "Ab4"]},
//   { scaleName: "A", notes : ["A3", "B3", "C4", "Db4", "Eb4", "F4", "G4", "Ab4"]},
//   { scaleName: "Bb", notes : ["Bb3", "C4", "D4", "Eb4", "F4", "G4", "A4", "Bb4"]},
//   { scaleName: "B", notes : ["B3","C#4","D#4","E4","F#4","G#4","A#4","B4"]},
//   { scaleName: "Cb", notes : ["Cb4","Db4","Eb4","Fb4","Gb4","Ab4","Bb4","Cb5"]},
//   { scaleName: "C", notes : ["C4","D4","E4","F4","G4","A4","B4","C5"]},
//   { scaleName: "C#", notes : ["C#4","D#4","E#4","F#4","G#4","A#4","B#4","C#5"]},
//   { scaleName: "Db", notes : ["Db4","Eb4","F4","Gb4","Ab4","Bb4","C5","Db5"]},
//   { scaleName: "D", notes : ["D4","E4","F#4","G4","A4","B4","C#5","D5"]},
//   { scaleName: "Eb", notes : ["Eb4","F4","G4","Ab4","Bb4","C5","D5","Eb5"]},
//   { scaleName: "E", notes : ["E4","F#4","G#4","A4","B4","C#5","D#5","E5"]},
//   { scaleName: "F", notes : ["F4","G4","A4","Bb4","C5","D5","E5","F5"]},
//   { scaleName: "F#", notes : ["F#4","G#4","A#4","B4","C#5","D#5","E#5","F#5"]},
//   { scaleName: "Gb", notes : ["Gb4","Ab4","Bb4","Cb5","Db5","Eb5","F5","Gb5"]},
//   { scaleName: "G", notes : ["G4","A4","B4","C5","D5","E5","F#5","G5"]},
// ]


export default function Options(props) {
  const classes = useStyles();
  const [tempoValue, setTempoValue] = React.useState(props.tempoValue);
  const [volumeValue, setVolumeValue] = React.useState(props.volumeValue);

  //const initialScale = new Array(majorScales.length).fill('white');
  //const [scaleButtonColor, setScaleButtonColor] = React.useState(initialScale);

  const handleSliderChange = (e, val, type) => {
    console.log('handleslider called', val, type);

    switch (type) {
      case 'tempo':
        setTempoValue(val);
        break;
      case 'volume':
        setVolumeValue(val);
        break;
      default:
        break;
    }

    props.handleChange(val, type);
  };

  const handleInputChange = (event, type) => {
    var val = event.target.value === '' ? '' : Number(event.target.value);

    switch (type) {
      case 'tempo':
        setTempoValue(val);
        break;
      case 'volume':
        setVolumeValue(val);
        break;
      default:
        break;
    }
    props.handleChange(val, type);
  };

  // const handleScaleChange = (notes, i) => {
  //   props.handleChange(notes, "scale")
  //   const newArr = new Array(majorScales.length).fill('white');
  //   newArr[i] = 'lightGrey';
  //   setScaleButtonColor(newArr);
  // }

  return (
    <div className={classes.root}>
      <Typography id="input-slider" gutterBottom>
        Tempo
      </Typography>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs>
          <Slider
            value={typeof tempoValue === 'number' ? tempoValue : 50}
            min={50}
            max={250}
            onChange={(e, value) => handleSliderChange(e, value, 'tempo')}
            aria-labelledby="input-slider"
          />
        </Grid>
        <Grid item>
          <Input
            className={classes.input}
            value={tempoValue}
            margin="dense"
            onChange={(e) => handleInputChange(e, 'tempo')}
            inputProps={{
              step: 1,
              min: 50,
              max: 250,
              type: 'number',
              'aria-labelledby': 'input-slider',
            }}
          />
        </Grid>
      </Grid>
      <Typography id="input-slider" gutterBottom>
        Volume
      </Typography>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs>
          <Slider
            value={typeof volumeValue === 'number' ? volumeValue : 50}
            min={0}
            max={100}
            onChange={(e, value) => handleSliderChange(e, value, 'volume')}
            aria-labelledby="input-slider"
          />
        </Grid>
        <Grid item>
          <Input
            className={classes.input}
            value={volumeValue}
            margin="dense"
            onChange={(e) => handleInputChange(e, 'volume')}
            inputProps={{
              step: 1,
              min: 50,
              max: 250,
              type: 'number',
              'aria-labelledby': 'input-slider',
            }}
          />
        </Grid>
      </Grid>
      {/* <Typography id="input-slider" gutterBottom>
        Pitch
      </Typography> */}
      {/* <Typography id="input-slider" gutterBottom>
        Major Scale : 
      </Typography> */}
      {/* <Grid>
        {majorScales.map((val, i) => {
          return (
            <button key={i} style={{ backgroundColor: scaleButtonColor[i] }} onClick={() => handleScaleChange(val.notes, i)}>
              {val.scaleName}
            </button>
          );
        })}
      </Grid> */}
    </div>
  );
}
