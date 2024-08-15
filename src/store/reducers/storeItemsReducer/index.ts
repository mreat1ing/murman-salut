import { PayloadAction } from '@reduxjs/toolkit';

import { IStoreItem } from 'src/interfaces/storeItem.interface';
import { getAmountCart, getCartItems } from 'src/utils/ls.utils';
import { ICategories } from 'src/interfaces/categories.interface';

import { IStoreItems } from './storeItems.interface';
import {
  ADD_ITEM,
  SET_ITEMS,
  SET_AMOUNT_CART,
  SET_ITEMS_LOADING,
  SET_CATEGORIES_LOADING,
  SET_CATEGORIES,
  SET_CART_ITEMS,
} from './constants';

const initialState = {
  items: <IStoreItem[]>[],
  categories: <ICategories[]>[],
  curCategory: 'all',
  amountCart: getAmountCart() || 0,
  isItemsLoading: false,
  isCategoriesLoading: false,
  cartItems: getCartItems() || <IStoreItem[]>[],
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
    case SET_ITEMS_LOADING:
      return { ...state, isItemsLoading: action.payload };
    case SET_CATEGORIES_LOADING:
      return { ...state, isCategoriesLoading: action.payload };
    case SET_CATEGORIES:
      return { ...state, categories: action.payload };
    case SET_CART_ITEMS:
      return { ...state, cartItems: action.payload };
    default:
      return state;
  }
};
