import React, { useEffect, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getAllCategories } from '../../redux/category/categoryAction';

const Category = () => {
  const dispatch = useDispatch();
  const { categories, loading } = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

  return loading ? (
    <p>Loading...</p>
  ) : (
    <Fragment>
      <h3>Category List</h3>
      <div>
        {categories.results.map((cat) => (
          <div key={cat.id}>{cat.name}</div>
        ))}
      </div>
    </Fragment>
  );
};

export default Category;
