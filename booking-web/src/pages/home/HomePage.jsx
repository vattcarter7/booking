import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    margin: '15px 15px'
  },
  leftGridContainer: {
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary
  }
}));

export default function FullWidthGrid() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={3} sm={3}>
          <Paper className={classes.leftGridContainer}>
            <Button>category</Button>
            <Button>category</Button>
          </Paper>
        </Grid>
        <Grid item xs={9} sm={9}>
          products
        </Grid>
      </Grid>
    </div>
  );
}
