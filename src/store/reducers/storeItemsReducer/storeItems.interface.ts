import { IStoreItem } from 'src/interfaces/storeItem.interface';

export interface IStoreItems {
  items: IStoreItem[] | [];
  amountCart: number;
}
