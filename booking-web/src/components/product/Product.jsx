import React, { useEffect, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';

import { getAllProducts } from '../../redux/product/productAction';
import { addCartItem } from '../../redux/cart/cartAction';
import ProductItem from './ProductItem';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap'
  }
}));

const Product = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { cartItems } = useSelector((state) => state.cart);
  const { products, loading, order, limit, skip } = useSelector(
    (state) => state.product
  );

  let productOrder = order ? order : 'name';

  useEffect(() => {
    dispatch(getAllProducts(productOrder, limit, skip));
  }, [dispatch]);

  const handleAddCartItem = (id) => {
    const existingCartItem = cartItems.find(
      (cartItem) => cartItem.product_id === id
    );

    dispatch(
      addCartItem({
        product_id: id,
        user_id: user.id,
        quantity: existingCartItem ? existingCartItem.quantity + 1 : 1
      })
    );
  };

  if (loading) return null;

  return loading ? (
    <p>Loading...</p>
  ) : (
    <Fragment>
      <h3>Products List</h3>
      <div className={classes.root}>
        {products.results.map((prod) => (
          <div key={prod.id}>
            <ProductItem
              id={prod.id}
              name={prod.name}
              description={prod.description}
              price={prod.price}
              image={prod.image}
            />
          </div>
        ))}
      </div>
    </Fragment>
  );
};

export default Product;
