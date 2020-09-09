import React, { useEffect, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Paper, Button } from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';

import { getAllCategories } from '../../redux/category/categoryAction';

const useStyles = makeStyles((theme) => ({
  categories: {
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary
  }
}));

const Category = () => {
  const dispatch = useDispatch();
  const { categories, loading } = useSelector((state) => state.category);

  const classes = useStyles();

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
