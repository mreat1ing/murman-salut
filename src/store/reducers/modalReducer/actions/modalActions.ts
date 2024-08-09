import { SET_CLOSE_OPEN, SET_TYPE } from '../constants';

export const setModalOpen = () => {
  return { type: SET_CLOSE_OPEN, payload: true };
};

export const setModalClose = () => {
  return { type: SET_CLOSE_OPEN, payload: false };
};

export const setModalType = (modalType: string) => {
  return { type: SET_TYPE, payload: modalType };
};
