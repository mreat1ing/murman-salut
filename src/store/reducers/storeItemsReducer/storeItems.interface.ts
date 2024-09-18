import { IStoreItem } from 'src/interfaces/storeItem.interface';
import { ICategories } from 'src/interfaces/categories.interface';
import { ICartItem } from 'src/interfaces/cartItem.interface';
import { IDeliveryPoints } from 'src/interfaces/deliveryPoints.interface';

export interface IStoreItems {
  items: IStoreItem[] | [];
  categories: ICategories[] | [];
  amountCart: number;
  curCategory: string;
  isItemsLoading: boolean;
  isCategoriesLoading: boolean;
  cartItems: ICartItem[];
  points: IDeliveryPoints,
  isPointsLoading: boolean,
}
