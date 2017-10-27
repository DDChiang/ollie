import {
  FETCH_USER,
} from '../actions/userActions';

export const userInitialState = {
  name: 'random name',
};

export default (state = userInitialState, action) => {
  switch (action.type) {
    case FETCH_USER:
      return action.user;

    default:
      return state;
  }
};
