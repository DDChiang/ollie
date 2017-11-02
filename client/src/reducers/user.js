import {
  FETCH_USER,
  RECEIVE_USER,
} from '../actions/userActions';

export const userInitialState = {
  name: 'random name',
};

export default (state = userInitialState, action) => {
  switch (action.type) {
    case FETCH_USER:
      // TODO: change loading state
      return action.user;

    case RECEIVE_USER:
      return action.user;

    default:
      return state;
  }
};
