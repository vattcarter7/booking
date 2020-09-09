import React, { useEffect, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts } from '../../redux/product/productAction';

const Product = () => {
  const dispatch = useDispatch();
  const { products, loading } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  return loading ? (
    <p>Loading...</p>
  ) : (
    <Fragment>
      <h3>Products List</h3>
      <div>
        {products.results.map((prod) => (
          <div key={prod.id}>{prod.name}</div>
        ))}
      </div>
    </Fragment>
  );
};

export default Product;
