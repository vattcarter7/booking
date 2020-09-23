import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  getCartItems,
  addCartItem,
  decrementCartItemQuantity,
  removeCartItem,
  clearCartItems
} from '../../redux/cart/cartAction';

const CartItem = () => {
  const dispatch = useDispatch();
  const { cartItems, loading } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  useEffect(() => {
    dispatch(clearCartItems());
    dispatch(getCartItems());
  }, [dispatch]);

  const handleAddCartItem = (id) => {
    const existingCartItem = cartItems.find(
      (cartItem) => cartItem.product_id === id
    );

    if (!existingCartItem) return;

    dispatch(
      addCartItem({
        product_id: id,
        user_id: user.id,
        quantity: existingCartItem.quantity + 1
      })
    );
  };

  const handleDecrementCartItemQuantity = (id) => {
    const existingCartItem = cartItems.find(
      (cartItem) => cartItem.product_id === id
    );

    if (!existingCartItem) return;
    dispatch(
      decrementCartItemQuantity({
        product_id: id,
        user_id: user.id,
        quantity: existingCartItem.quantity - 1
      })
    );
  };

  let totalPriceArray = [];

  cartItems.map((cartItem) =>
    totalPriceArray.push(cartItem.price * cartItem.quantity)
  );

  const grandTotalPrice = totalPriceArray.reduce((a, b) => {
    return a + b;
  }, 0);

  const handleRemoveCartItem = (id) => {
    dispatch(removeCartItem(id));
  };

  if (loading) return <h4>...Loading</h4>;

  return (
    <div style={{ marginTop: '70px' }}>
      <h3>
        Cart Items {cartItems.length} with total: {grandTotalPrice} usd
      </h3>
      {cartItems.map((cartItem) => (
        <div key={cartItem.product_id}>
          <p>
            <span
              onClick={() =>
                handleDecrementCartItemQuantity(cartItem.product_id)
              }
              style={{ color: 'gray', cursor: 'pointer', margin: '10px' }}
            >
              -
            </span>{' '}
            <span
              onClick={() => handleAddCartItem(cartItem.product_id)}
              style={{ color: 'blue', cursor: 'pointer', margin: '10px' }}
            >
              +
            </span>{' '}
            <span
              onClick={() => handleRemoveCartItem(cartItem.id)}
              style={{ color: 'red', cursor: 'pointer', margin: '10px' }}
            >
              x
            </span>{' '}
            <span style={{ color: 'green' }}>
              ID: {cartItem.product_id} - {cartItem.name} - quantity: -{' '}
              {cartItem.quantity} - price {cartItem.quantity * cartItem.price}
            </span>
          </p>
        </div>
      ))}
    </div>
  );
};

export default CartItem;
