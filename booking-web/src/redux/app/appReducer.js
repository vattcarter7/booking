export const APP_LOADED = 'APP_LOADED';

const INITIAL_STATE = {
  initialized: false
};
const appReducer = (state = INITIAL_STATE, action) => {
  const { type } = action;
  switch (type) {
    case APP_LOADED:
      return {
        ...state,
        initialized: true
      };
    default:
      return state;
  }
};

export default appReducer;
