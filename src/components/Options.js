import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import Input from '@material-ui/core/Input';
import { MajorScales, MinorScales } from './Scales';

const useStyles = makeStyles({
  root: {
    width: 250,
  },
  input: {
    width: 42,
  },
});

export default function Options(props) {
  const classes = useStyles();
  const [tempoValue, setTempoValue] = React.useState(props.tempoValue);
  const [volumeValue, setVolumeValue] = React.useState(props.volumeValue);
  const [pitchValue, setPitchValue] = React.useState(props.pitchValue);
  // const [isMajorScale, setIsMajorScale] = React.useState(true);

  // const initialScale = new Array(MajorScales.length).fill('white');
  // initialScale[0] = 'lightgrey';
  // const [scaleButtonColor, setScaleButtonColor] = React.useState(initialScale);

  const handleSliderChange = (e, val, type) => {
    switch (type) {
      case 'tempo':
        setTempoValue(val);
        break;
      case 'volume':
        setVolumeValue(val);
        break;
      case 'pitch':
        setPitchValue(val);
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
      case 'pitch':
        setPitchValue(val);
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
      </Typography>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs>
          <Slider
            value={typeof pitchValue === 'number' ? pitchValue : 50}
            min={0}
            max={100}
            onChange={(e, value) => handleSliderChange(e, value, 'pitch')}
            aria-labelledby="input-slider"
          />
        </Grid>
        <Grid item>
          <Input
            className={classes.input}
            value={pitchValue}
            margin="dense"
            onChange={(e) => handleInputChange(e, 'pitch')}
            inputProps={{
              step: 1,
              min: 50,
              max: 250,
              type: 'number',
              'aria-labelledby': 'input-slider',
            }}
          />
        </Grid>
      </Grid> */}
      {/* <Typography id="input-slider" gutterBottom>
        Major Scale : 
      </Typography>
      <button disabled={isMajorScale} onClick={() => setIsMajorScale(true)}>Major</button>
      <button disabled={!isMajorScale} onClick={() => setIsMajorScale(false)}>Minor</button>
      <Grid>
        {isMajorScale ? (
          MajorScales.map((val, i) => {
            return (
              <button key={i} style={{ backgroundColor: scaleButtonColor[i] }} onClick={() => handleScaleChange(val.notes, i)}>
                {val.scaleName}
              </button>
            );
          })
        ) : (
          MinorScales.map((val, i) => {
            return (
              <button key={i} style={{ backgroundColor: scaleButtonColor[i] }} onClick={() => handleScaleChange(val.notes, i)}>
                {val.scaleName}
              </button>
            );
          })
        )}
      </Grid> */}
    </div>
  );
}
