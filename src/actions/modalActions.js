export const SET_MODAL = 'SET_MODAL';
export const CLOSE_MODAL = 'CLOSE_MODAL';

export const closeModal = () => {
  return {
    type: CLOSE_MODAL,
  }
}

export const setModal = (modalType, modalData=null) => {
  return {
    type: SET_MODAL,
    modalType,
    modalData,
  }
}
