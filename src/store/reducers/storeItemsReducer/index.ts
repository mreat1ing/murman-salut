import { PayloadAction } from '@reduxjs/toolkit';

import { IStoreItem } from 'src/interfaces/storeItem.interface';
import { getAmountCart } from 'src/utils/localStore.utils';

import { IStoreItems } from './storeItems.interface';
import { ADD_ITEM, SET_ITEMS, SET_AMOUNT_CART } from './constants';

const initialState = {
  items: <IStoreItem[]>[
    {
      _id: 'РС1705',
      category: 'Бенгальские свечи',
      hide: false,
      link: 'https://youtu.be/n9cwvZqSq2Q',
      price: 55,
      title: 'РС1705 Бенгальский огонь-170',
      value: 10,
    },
    {
      _id: 'РС1730',
      category: 'Бенгальские свечи',
      hide: false,
      link: 'https://youtu.be/gVy3SthKDnw',
      price: 160,
      title: 'РС1730 Бенгальский огонь 300 УЛЬТРА',
      value: 4,
    },
    {
      _id: 'РС1735',
      category: 'Бенгальские свечи',
      hide: false,
      link: 'https://youtu.be/DOpDWJtbewk',
      price: 275,
      title: 'РС1735 Бенгальский огонь 450 УЛЬТРА',
      value: 4,
    },
    {
      _id: 'Р4810',
      category: 'Бенгальские свечи',
      hide: false,
      link: 'https://orfvideo.synology.me/20_21/P4810.mp4',
      price: 305,
      title: 'Р4810 фонтан настольный',
      value: 4,
    },
  ],
  amountCart: getAmountCart() || 0,
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
    default:
      return state;
  }
};
