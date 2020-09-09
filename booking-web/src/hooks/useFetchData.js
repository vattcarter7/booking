// TODO: figure out this later 

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios'

import {
  asyncActionStart,
  asyncActionFinish,
  asyncActionError
} from '../redux/async/asyncReducer';


export default function useFetchData({ url, data, deps }) {
  const dispatch = useDispatch();

  useEffect(() => {
    try {
      dispatch(asyncActionStart());
      await axios.get(url);
      dispatch(asyncActionFinish());
    } catch (error) {
      dispatch(asyncActionError(error))
    }
  }, deps); // eslint-disable-line react-hooks/exhaustive-deps
}