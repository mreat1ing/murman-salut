import { PayloadAction } from '@reduxjs/toolkit';

import { IModalState } from './modalState.interface';
import { SET_TYPE, SET_CLOSE_OPEN } from './constants';

const initialState: IModalState = {
  isModalOpen: false,
  typeOfModal: null,
};

export const modalStore = (
  state = initialState,
  action: PayloadAction<boolean & string>
): IModalState => {
  switch (action.type) {
    case SET_CLOSE_OPEN:
      return { ...state, isModalOpen: action.payload };
    case SET_TYPE:
      return { ...state, typeOfModal: action.payload };
    default:
      return state;
  }
};
