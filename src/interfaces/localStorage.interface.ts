import { ICartItem } from './cartItem.interface';

export interface ILocalStorageItem {
  item: string;
  count: number;
}

export interface ILocalStorageCart {
  items: ILocalStorageItem[];
  amount: number;
}

export interface ILocalStorage {
  cart: ILocalStorageCart;
}

export interface ILocalS {
  items: ICartItem[];
  amount: number;
}
