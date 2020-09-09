import { GET_CATEGORIES } from './categoryTypes';

const INITIAL_STATE = {
  categories: [],
  loading: true,
  error: {}
};

const categoryReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_CATEGORIES:
      return {
        ...state,
        categories: payload,
        loading: false
      };
    default:
      return state;
  }
};

export default categoryReducer;
