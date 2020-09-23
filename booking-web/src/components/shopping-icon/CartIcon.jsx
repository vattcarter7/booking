import React from 'react';
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
  return (
    <div className={classes.root}>
      <ShoppingIconSVG className={classes.icon} />
      <span className={classes.counter}>5</span>
    </div>
  );
};

export default CartIcon;
