import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Avatar from '@material-ui/core/Avatar';

import { DRAW_WIDTH } from '../../utils/misc';

import {
  getCartItems,
  addCartItem,
  decrementCartItemQuantity,
  removeCartItem,
  clearCartItems
} from '../../redux/cart/cartAction';

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
      marginLeft: DRAW_WIDTH
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
  summary: {
    flexGrow: 1,
    alignContent: 'center'
  }
}));

function ccyFormat(num) {
  return `${num.toFixed(2)}`;
}

function priceRow(qty, unit) {
  return qty * unit;
}

function createRow(id, product_id, desc, image, qty, unit) {
  const price = priceRow(qty, unit);
  return { id, product_id, desc, image, qty, unit, price };
}

function subtotal(items) {
  return items.map(({ price }) => price).reduce((sum, i) => sum + i, 0);
}

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
    cartRows.push(
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
                    <img className={classes.image} src={row.image} />
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
      <div className={classes.summary}>Total: ${ccyFormat(invoiceTotal)} </div>
    </div>
  );
};

export default CartItem;
