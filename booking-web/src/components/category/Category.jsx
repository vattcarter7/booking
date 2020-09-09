import React from 'react';
import { Paper, Button } from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  categories: {
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary
  }
}));

const Category = () => {
  const classes = useStyles();
  return (
    <Paper className={classes.categories}>
      <Button>category</Button>
      <Button>category</Button>
    </Paper>
  );
};

export default Category;
