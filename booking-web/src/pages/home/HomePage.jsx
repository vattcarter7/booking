import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import CssBaseline from '@material-ui/core/CssBaseline';
import { Button, Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { DRAW_WIDTH } from '../../utils/misc';
import { getAllProducts } from '../../redux/product/productAction';

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
  const { products, loading, order, limit, skip } = useSelector(
    (state) => state.product
  );

  let productOrder = order ? order : 'name';

  useEffect(() => {
    dispatch(getAllProducts(productOrder, limit, skip));
  }, [dispatch, productOrder, limit, skip]);

  if (loading) return <h3>Loading...</h3>;

  return (
    <div>
      <CssBaseline />
      <main className={classes.content}>
        <div className={classes.toolbar} />
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
        <div>
          {products.results.map((prod) => (
            <p key={prod.id}>
              {prod.name} - {prod.price} usd
            </p>
          ))}
        </div>
        <Divider />
        <div>Total number of products: {products.total}</div>
      </main>
    </div>
  );
}

export default HomePage;
