import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Category from '../../components/category/Category';
import Product from '../../components/product/Product';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    margin: '15px 15px'
  },
  categories: {
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary
  }
}));

function HomePage() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={3} sm={3}>
          <Category />
        </Grid>
        <Grid item xs={9} sm={9}>
          <Product />
        </Grid>
      </Grid>
    </div>
  );
}

export default HomePage;
