import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Avatar from '@material-ui/core/Avatar';
import { Button } from '@material-ui/core';

import { DRAW_WIDTH, ccyFormat } from '../../utils/misc';

import {
  getCartItems,
  addCartItem,
  decrementCartItemQuantity,
  removeCartItem,
  clearCartItems
} from '../../redux/cart/cartAction';
import { Divider } from '@material-ui/core';

const TAX_RATE = 0.0;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    marginTop: 70,
    justifyContent: 'center',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      alginItems: 'center'
    }
  },
  tableContainer: {
    flexGrow: 0,
    [theme.breakpoints.up('sm')]: {
      marginLeft: DRAW_WIDTH,
      width: '80%'
    },
    [theme.breakpoints.down('sm')]: {
      width: '100%'
    }
  },
  image: {
    width: 130,
    height: 90
  },
  remove: {
    width: 10,
    color: '#fa7064',
    cursor: 'pointer'
  },
  square: {
    color: 'white',
    backgroundColor: '#dee0e3',
    width: 16,
    height: 16,
    cursor: 'pointer'
  },
  iconContainer: {
    display: 'flex',
    backgroundColor: '#f7f9fc',
    alignItems: 'center',
    justifyContent: 'center'
  },
  summaryContainer: {
    flexGrow: 1,
    minWidth: 300,
    maxWidth: 400
  },
  summarySection: {
    display: 'flex',
    flexDirection: 'column',
    width: '90%',
    backgroundColor: '#ebebed',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 10,
    lineHeight: 0.6,
    color: '#8c8d8f'
  },
  summaryDetailContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: 10
  },
  orderTotalContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: 15,
    fontWeight: 'bold',
    padding: 10,
    paddingTop: 20,
    paddingBottom: 25
  },
  checkoutBtnContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  checkoutBtn: {
    borderRadius: 0,
    marginTop: 15,
    marginBottom: 30,
    backgroundColor: '#165de0',
    color: 'white'
  }
}));

function priceRow(qty, unit) {
  return qty * unit;
}

function createRow(id, product_id, desc, image, qty, unit) {
  const price = priceRow(qty, unit);
  return { id, product_id, desc, image, qty, unit, price };
}

const subtotal = (items) => {
  return items.map(({ price }) => price).reduce((sum, i) => sum + i, 0);
};

const CartItem = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { cartItems, loading } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  useEffect(() => {
    dispatch(clearCartItems());
    dispatch(getCartItems());
  }, [dispatch]);

  let cartRows = [];

  cartItems.map((cart) => {
    return cartRows.push(
      createRow(
        cart.id,
        cart.product_id,
        cart.name,
        cart.image,
        cart.quantity,
        cart.price
      )
    );
  });

  const invoiceSubtotal = subtotal(cartRows);
  const invoiceTaxes = TAX_RATE * invoiceSubtotal;
  const invoiceTotal = invoiceTaxes + invoiceSubtotal;

  const handleAddCartItem = (id) => {
    const existingCartItem = cartRows.find(
      (cartRow) => cartRow.product_id === id
    );

    if (!existingCartItem) return;

    dispatch(
      addCartItem({
        product_id: id,
        user_id: user.id,
        quantity: existingCartItem.qty + 1
      })
    );
  };

  const handleDecrementCartItemQuantity = (id) => {
    const existingCartItem = cartRows.find(
      (cartRow) => cartRow.product_id === id
    );

    if (!existingCartItem) return;
    dispatch(
      decrementCartItemQuantity({
        product_id: id,
        user_id: user.id,
        quantity: existingCartItem.qty - 1
      })
    );
  };

  const handleRemoveCartItem = (id) => {
    dispatch(removeCartItem(id));
  };

  if (loading) return <h4>...Loading</h4>;

  if (cartItems.length === 0 && !loading)
    return (
      <Link to='/'>
        {' '}
        <div style={{ marginTop: 150 }}>
          Go to home page for more shopping
        </div>{' '}
      </Link>
    );

  return (
    <div className={classes.root}>
      <TableContainer className={classes.tableContainer}>
        {cartItems.length > 0 && (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Product</TableCell>
                <TableCell></TableCell>
                <TableCell align='center'>Qty.</TableCell>
                <TableCell align='center'>Price</TableCell>
                <TableCell align='right'>Subtotal</TableCell>
                <TableCell align='left'></TableCell>
              </TableRow>
            </TableHead>
            {cartRows.map((row) => (
              <TableBody key={row.product_id}>
                <TableRow>
                  <TableCell>
                    <img
                      className={classes.image}
                      src={row.image}
                      alt={row.desc}
                    />
                  </TableCell>
                  <TableCell>{row.desc}</TableCell>
                  <TableCell align='center'>
                    <div className={classes.iconContainer}>
                      <Avatar
                        onClick={() => {
                          console.log('Clicked');
                          console.log(row.id);
                          handleDecrementCartItemQuantity(row.product_id);
                        }}
                        variant='square'
                        className={classes.square}
                      >
                        -
                      </Avatar>
                      <span
                        style={{
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: 40
                        }}
                      >
                        {row.qty}
                      </span>
                      <div onClick={() => handleAddCartItem(row.product_id)}>
                        <Avatar variant='square' className={classes.square}>
                          +
                        </Avatar>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell align='center'>${row.unit}</TableCell>
                  <TableCell align='right'>${ccyFormat(row.price)}</TableCell>
                  <TableCell
                    onClick={() => handleRemoveCartItem(row.id)}
                    className={classes.remove}
                    align='center'
                  >
                    x
                  </TableCell>
                </TableRow>
              </TableBody>
            ))}
          </Table>
        )}
      </TableContainer>
      {cartItems.length > 0 && (
        <div className={classes.summaryContainer}>
          <div className={classes.summarySection}>
            <h3
              style={{
                alignSelf: 'center',
                padding: 1.5
              }}
            >
              Summary
            </h3>
            <Divider />
            <br />
            <div className={classes.summaryDetailContainer}>
              <span>Subtotal</span>
              <span>${ccyFormat(invoiceSubtotal)}</span>
            </div>
            <div className={classes.summaryDetailContainer}>
              <span>Tax</span>
              <span>$0.0</span>
            </div>
            <div className={classes.summaryDetailContainer}>
              <span>Discount</span>
              <span>$0.0</span>
            </div>
            <br />
            <Divider />
            <div className={classes.orderTotalContainer}>
              <span>Order Total</span>
              <span>${ccyFormat(invoiceTotal)}</span>
            </div>
            <div className={classes.checkoutBtnContainer}>
              <Link to='/checkout'>
                <Button
                  className={classes.checkoutBtn}
                  variant='contained'
                  disableElevation
                >
                  Proceed checkout
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartItem;
