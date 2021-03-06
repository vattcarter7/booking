import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import CssBaseline from '@material-ui/core/CssBaseline';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { DRAW_WIDTH } from '../../utils/misc';
import { getAllProducts } from '../../redux/product/productAction';

import Product from '../../components/product/Product';

const useStyles = makeStyles((theme) => ({
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    [theme.breakpoints.up('sm')]: {
      marginLeft: DRAW_WIDTH,
      flexShrink: 0
    }
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar
}));

function HomePage() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { products, order, limit, skip } = useSelector(
    (state) => state.product
  );

  let productOrder = order ? order : 'name';

  return (
    <div>
      <CssBaseline />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Button
          onClick={() => {
            dispatch(getAllProducts(productOrder, limit, skip - limit));
          }}
          variant='contained'
          color='primary'
          disabled={skip - limit < 0}
        >
          Back
        </Button>{' '}
        <Button
          onClick={() => {
            dispatch(getAllProducts(productOrder, limit, limit + skip));
          }}
          variant='contained'
          color='primary'
          disabled={limit + skip >= products.total}
        >
          Next
        </Button>
        <div>Total number of products: {products.total}</div>
        <Product />
      </main>
    </div>
  );
}

export default HomePage;
