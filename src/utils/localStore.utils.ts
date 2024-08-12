import { ILocalStorageCart } from 'src/interfaces/localStorage.interface';

const initialCart = JSON.stringify({ items: [], amount: 0 });

export const getDataById = (key: string) => {
  return window.localStorage.getItem(key);
};

export const setDataById = (key: string, value: string) => {
  window.localStorage.setItem(key, value);
};

const parseCart = (): ILocalStorageCart => {
  const prevCartData = getDataById('cart') || initialCart;
  return JSON.parse(prevCartData);
};

const countCartItems = (): number => {
  const parsedCartData = parseCart();
  return parsedCartData.items.reduce((acc, element) => acc + element.count, 0);
};

const setAmountCart = () => {
  const parsedCartData = parseCart();
  const countedItems = countCartItems();
  const newData = JSON.stringify({
    items: parsedCartData.items,
    amount: countedItems,
  });
  setDataById('cart', newData);
};

export const getAmountCart = () => {
  const parsedCartData = parseCart();
  return parsedCartData.amount;
};

export const setItemCartCount = (item: string, count: number) => {
  const parsedCartData = parseCart();
  const itemIndex = findIndexItemCart(item);
  const cartItem = { ...parsedCartData.items[itemIndex] };
  cartItem.count = count;
  const newItems = [
    ...parsedCartData.items.slice(0, itemIndex),
    cartItem,
    ...parsedCartData.items.slice(itemIndex + 1),
  ];
  const newData = JSON.stringify({
    items: newItems,
    amount: parsedCartData.amount,
  });
  setDataById('cart', newData);
  setAmountCart();
};

export const getItemCartCount = (item: string): number => {
  const parsedCartData = parseCart();
  const itemIndex = findIndexItemCart(item);
  return parsedCartData?.items[itemIndex]?.count;
};

const findIndexItemCart = (item: string): number => {
  const parsedCartData = parseCart();
  return parsedCartData.items.findIndex((el) => el.item === item);
};

export const addItemCart = (item: string) => {
  const parsedCartData = parseCart();
  const newData = JSON.stringify({
    items: [...parsedCartData.items, { item: item, count: 1 }],
    amount: parsedCartData.amount,
  });
  setDataById('cart', newData);
  setAmountCart();
};

export const removeItemCart = (item: string) => {
  const parsedCartData = parseCart();
  const itemIndex = findIndexItemCart(item);
  const newItems = [
    ...parsedCartData.items.slice(0, itemIndex),
    ...parsedCartData.items.slice(itemIndex + 1),
  ];
  const newData = JSON.stringify({
    items: newItems,
    amount: parsedCartData.amount,
  });
  setDataById('cart', newData);
  setAmountCart();
};

export const isItemInCart = (item: string): boolean => {
  return findIndexItemCart(item) >= 0;
};

export const fullStorageClear = () => {
  localStorage.clear();
};
