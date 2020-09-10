import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import rootReducer from './rootReducer';

// TODO: uncomment when implement auth
//import { verifyAuth } from '../../features/auth/authActions';

export function configureStore() {
  const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk))
  );

  // TODO: uncomment when implement auth
  // store.dispatch(verifyAuth());

  return store;
}
