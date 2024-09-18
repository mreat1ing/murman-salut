import { PayloadAction } from '@reduxjs/toolkit';

import { IStoreItem } from 'src/interfaces/storeItem.interface';
import { getAmountCart, getCartItems } from 'src/utils/ls.utils';
import { ICategories } from 'src/interfaces/categories.interface';
import { IDeliveryPoints } from 'src/interfaces/deliveryPoints.interface';

import { IStoreItems } from './storeItems.interface';
import {
  ADD_ITEM,
  SET_ITEMS,
  SET_AMOUNT_CART,
  SET_ITEMS_LOADING,
  SET_CATEGORIES_LOADING,
  SET_CATEGORIES,
  SET_CART_ITEMS,
  SET_CURR_CATEGORY,
  SET_DELIVERY_POINTS,
  SET_DELIVERY_POINTS_LOADING,
} from './constants';

const initialState = {
  items: <IStoreItem[]>[],
  categories: <ICategories[]>[],
  curCategory: 'Все',
  amountCart: getAmountCart() || 0,
  isItemsLoading: false,
  isCategoriesLoading: false,
  cartItems: getCartItems() || <IStoreItem[]>[],
  points: <IDeliveryPoints>{},
  isPointsLoading: false,
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
    case SET_CURR_CATEGORY: 
      return { ...state, curCategory: action.payload };
    case SET_DELIVERY_POINTS: 
      return { ...state, points: action.payload };
    case SET_DELIVERY_POINTS_LOADING: 
      return { ...state, isPointsLoading: action.payload };
    default:
      return state;
  }
};
