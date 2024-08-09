import { PayloadAction } from '@reduxjs/toolkit';

import { SET_TYPE, SET_CLOSE_OPEN } from './constants';

interface IState {
  isModalOpen: boolean;
  typeOfModal: string | null;
}

const initialState: IState = {
  isModalOpen: false,
  typeOfModal: null,
};

export const modalStore = (
  state = initialState,
  action: PayloadAction<boolean & string>
): IState => {
  switch (action.type) {
    case SET_CLOSE_OPEN:
      return { ...state, isModalOpen: action.payload };
    case SET_TYPE:
      return { ...state, typeOfModal: action.payload };
    default:
      return state;
  }
};
