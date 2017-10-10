import {
  CLOSE_MODAL,
  SET_MODAL,
} from '../actions/modalActions';

export const modalInitialState = {
  modalType: null,
  modalData: null,
};

export default (state = modalInitialState, action) => {
  switch (action.type) {
    case SET_MODAL:
      return {
        modalType: action.modalType,
        modalData: action.modalData,
      };

    case CLOSE_MODAL:
      return {
        modalType: null,
        modalData: null,
      };

    default:
      return state;
  }
};
