import { IStoreItem } from 'src/interfaces/storeItem.interface';

import { ADD_ITEM, SET_ITEMS, SET_AMOUNT_CART } from '../constants';

export const addItem = (item: IStoreItem) => {
  return { type: ADD_ITEM, payload: item };
};

export const setItems = (items: IStoreItem[]) => {
  return { type: SET_ITEMS, payload: items };
};

export const setAmountCart = (count: number) => {
  return { type: SET_AMOUNT_CART, payload: count };
};
