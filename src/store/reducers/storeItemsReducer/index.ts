import { PayloadAction } from '@reduxjs/toolkit';

import { IStoreItem } from 'src/interfaces/storeItem.interface';
import { getAmountCart } from 'src/utils/localStore.utils';

import { IStoreItems } from './storeItems.interface';
import { ADD_ITEM, SET_ITEMS, SET_AMOUNT_CART } from './constants';

const initialState = {
  items: <IStoreItem[]>
  [],
  amountCart: getAmountCart() || 0,
};

export const storeItemsReducer = (
  state = initialState,
  action: PayloadAction<string & IStoreItem & IStoreItem[] & number>
): IStoreItems => {
  switch (action.type) {
    case SET_ITEMS:
      return { ...state, items: action.payload };
    case ADD_ITEM:
      return { ...state, items: [...state.items, action.payload] };
    case SET_AMOUNT_CART:
      return { ...state, amountCart: action.payload };
    default:
      return state;
  }
};
