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

export default function InputSlider(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(props.value);

  const handleSliderChange = (event, newValue) => {
    setValue(newValue);
    props.handleChange(newValue);
  };

  const handleInputChange = (event) => {
    var val = event.target.value === '' ? '' : Number(event.target.value);
    setValue(val);
    props.handleChange(val);
  };

  return (
    <div className={classes.root}>
      <Typography id="input-slider" gutterBottom>
        Tempo
      </Typography>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs>
          <Slider
            value={typeof value === 'number' ? value : 50}
            min={50}
            max={250}
            onChange={handleSliderChange}
            aria-labelledby="input-slider"
          />
        </Grid>
        <Grid item>
          <Input
            className={classes.input}
            value={value}
            margin="dense"
            onChange={handleInputChange}
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
    </div>
  );
}
