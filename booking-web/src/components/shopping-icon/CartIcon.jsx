import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';

import { ReactComponent as ShoppingIconSVG } from '../../assets/shopping-bag.svg';

const useStyles = makeStyles((theme) => ({
  root: {
    width: 45,
    height: 45,
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    marginRight: 24
  },
  icon: {
    width: 30,
    height: 30
  },
  counter: {
    position: 'absolute',
    fontSize: 12,
    fontWeight: 'bold',
    bottom: 9,
    color: 'red'
  }
}));

const CartIcon = () => {
  const classes = useStyles();
  const { cartItems, loading: cartItemsLoading } = useSelector(
    (state) => state.cart
  );
  const { isAuthenticated, loading: authLoading } = useSelector(
    (state) => state.user
  );

  if (cartItems.length === 0 || cartItemsLoading) return null;

  if (!isAuthenticated && !authLoading) return null;

  return (
    <Link to='/cart'>
      <div className={classes.root}>
        <ShoppingIconSVG className={classes.icon} />
        <span className={classes.counter}>{cartItems.length}</span>
      </div>
    </Link>
  );
};

export default CartIcon;
