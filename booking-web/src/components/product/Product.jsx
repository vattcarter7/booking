import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getAllProducts } from '../../redux/product/productAction';

const Product = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  return <div>Products</div>;
};

export default Product;
