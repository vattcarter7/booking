import React, { useEffect, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts } from '../../redux/product/productAction';
import { addCartItem } from '../../redux/cart/cartAction';

const Product = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { products, loading } = useSelector((state) => state.product);
  const { cartItems } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  const handleAddCartItem = (id) => {
    console.log('Clicked');
    dispatch(
      addCartItem({
        product_id: id,
        user_id: user.id,
        quantity: 1
      })
    );
  };

  return loading ? (
    <p>Loading...</p>
  ) : (
    <Fragment>
      <h3>Products List</h3>
      <div>
        {products.results.map((prod) => (
          <div onClick={() => handleAddCartItem(prod.id)} key={prod.id}>
            {prod.name} - {prod.price} usd
          </div>
        ))}
      </div>
      <div>{JSON.stringify(cartItems)}</div>
    </Fragment>
  );
};

export default Product;
