import { TOGGLE_MOBILE_DRAWER_HIDDEN } from './drawerTypes';

const INITIAL_STATE = {
  showMobileDrawer: false
};

const drawerReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TOGGLE_MOBILE_DRAWER_HIDDEN:
      return {
        ...state,
        showMobileDrawer: !state.showMobileDrawer
      };
    default:
      return state;
  }
};

export default drawerReducer;
