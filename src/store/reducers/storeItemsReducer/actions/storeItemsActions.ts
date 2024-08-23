import { IStoreItem } from 'src/interfaces/storeItem.interface';
import { ICategories } from 'src/interfaces/categories.interface';

import {
  ADD_ITEM,
  SET_ITEMS,
  SET_AMOUNT_CART,
  SET_ITEMS_LOADING,
  SET_CATEGORIES_LOADING,
  SET_CATEGORIES,
  SET_CART_ITEMS,
} from '../constants';

export const addItem = (item: IStoreItem) => {
  return { type: ADD_ITEM, payload: item };
};

export const setItems = (items: IStoreItem[]) => {
  return { type: SET_ITEMS, payload: items };
};

export const setAmountCart = (count: number) => {
  return { type: SET_AMOUNT_CART, payload: count };
};

export const setItemsLoading = (value: boolean) => {
  return { type: SET_ITEMS_LOADING, payload: value };
};

export const setCategoriesLoading = (value: boolean) => {
  return { type: SET_CATEGORIES_LOADING, payload: value };
};

export const setCategories = (value: ICategories[]) => {
  return { type: SET_CATEGORIES, payload: value };
};

export const setCartItems = (items: IStoreItem[]) => {
  return { type: SET_CART_ITEMS, payload: items };
};
