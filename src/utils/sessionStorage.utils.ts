import {
  ISessionStorage,
  ISessionStorageItem,
} from 'src/interfaces/sessionStorage.interface';

const initialForm = JSON.stringify({ items: {}, edited: 0 });

const updateFormItems = (item: ISessionStorageItem) => {
  sessionStorage.removeItem('form');
  const data = JSON.stringify({ items: item.items, edited: 1 });
  sessionStorage.setItem('form', data);
};

const getDataById = (key: string) => {
  return sessionStorage.getItem(key);
};

const getItems = () => {
  const parsedCart = parseData();
  return parsedCart.items;
};
const getEdited = () => {
  const parsedCart = parseData();
  return parsedCart.edited;
};

const parseData = (): ISessionStorage => {
  const prevCartData = getDataById('form') || initialForm;
  return JSON.parse(prevCartData);
};

const fullSessionStorageClear = () => {
  sessionStorage.removeItem('form');
  sessionStorage.setItem('ordered', 'true');
};
const removeOredered = () => {
  sessionStorage.removeItem('ordered');
};
const getOrdered = () => {
  const res = sessionStorage.getItem('ordered');
  if (res !== null) return JSON.parse(res);
  return  false;
};

export { updateFormItems, getItems, fullSessionStorageClear, getEdited, removeOredered, getOrdered };
