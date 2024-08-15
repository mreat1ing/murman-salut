import { ICartItem } from 'src/interfaces/cartItem.interface';
import { ILocalS } from 'src/interfaces/localStorage.interface';

const initialCart = JSON.stringify({ items: [], amount: 0 });

const getDataById = (key: string) => {

    return localStorage.getItem(key);
};

const parseCart = (): ILocalS => {
    const prevCartData = getDataById('cart') || initialCart;
    return JSON.parse(prevCartData);
};  

const fullStorageClear = () => {
    localStorage.clear();
};

const getCartItems = () => {
  const parsedCartData = parseCart();
  return parsedCartData.items;
};

const addItemCart = (items: ICartItem[]) => {
  localStorage.removeItem('cart');
  let amount = 0;
  items.forEach((item) => amount += item.count);
  const data = JSON.stringify({items: items, amount: amount});
  localStorage.setItem('cart', data);
};

const getAmountCart = () => {
  const parsedCart = parseCart();
  return parsedCart.amount;
};

const getItemCartCount = (title: string) => {
  const parsedCart = parseCart();
  let currentElement = 0;
  parsedCart.items.forEach((el) => {if (el.title === title) currentElement = el.count;});
  return currentElement;
};

const isItemInCart = (title: string): boolean => {
  const parsedCart = parseCart();
  let res = false;
  parsedCart.items.forEach((el) => {
    if (title === el.title) res = true;
  });
  return res;
};

  export {
    getCartItems,
    fullStorageClear,
    isItemInCart,
    //removeItemCart,
    addItemCart,
    getItemCartCount,
    //setItemCartCount,
    getAmountCart,
  };  