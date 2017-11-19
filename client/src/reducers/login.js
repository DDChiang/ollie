import {
  LOGIN,
  LOGOUT,
} from '../actions/loginActions';

export const initialState = {
  loggedIn: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      // TODO: connect with setting "user info" action
      return true;

    case LOGOUT:
      return false;

    default:
      return state;
  }
};
