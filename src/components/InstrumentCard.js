import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';

  const useStyles = makeStyles({
    root: {
      maxWidth: 120,
    },
  });

  export default function InstrumentCard(props) {
    const classes = useStyles();
  
    return (
        <Card className={classes.root}>
        <CardActionArea>
          <CardMedia
            component="img"
            alt={props.name}
            height="120"
            image={props.path}
            title={props.name}
          />
        </CardActionArea>
      </Card>
    );
  }