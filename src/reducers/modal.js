import {
  CLOSE_MODAL,
  SET_MODAL,
} from '../actions/modalActions';

export const modalInitialState = null;

export default (state = modalInitialState, action) => {
  switch (action.type) {
    case SET_MODAL:
      return action.modal;

    case CLOSE_MODAL:
      return null;

    default:
      return state;
  }
};
