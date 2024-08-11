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
