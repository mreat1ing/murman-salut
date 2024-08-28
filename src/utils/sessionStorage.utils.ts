import {
  ISessionStorage,
  ISessionStorageItem,
} from 'src/interfaces/sessionStorage.interface';

const initialForm = JSON.stringify({ items: {}, edited: 0 });

const updateFormItems = (item: ISessionStorageItem) => {
  sessionStorage.removeItem('form');
  const data = JSON.stringify({ items: item.items, edited: 1 });
  sessionStorage.setItem('form', data);
  // eslint-disable-next-line no-console
  console.log(data);
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
};

export { updateFormItems, getItems, fullSessionStorageClear, getEdited };
