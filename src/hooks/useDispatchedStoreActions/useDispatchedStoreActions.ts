import { useDispatch } from 'react-redux';

import {
  addItem,
  setAmountCart,
  setItems,
  setItemsLoading,
  setCategoriesLoading,
  setCategories,
  setCartItems,
  setCurrCategory,
  setDeliveryPoints,
  setDeliveryPointsLoading,
} from 'src/store/reducers/storeItemsReducer/actions/storeItemsActions';
import { IStoreItem } from 'src/interfaces/storeItem.interface';
import { ICategories } from 'src/interfaces/categories.interface';
import { IDeliveryPoints } from 'src/interfaces/deliveryPoints.interface';

const useDispatchedStoreActions = () => {
  const dispatch = useDispatch();

  return {
    setDeliveryPoints: (item: IDeliveryPoints) => dispatch(setDeliveryPoints(item)),
    setDeliveryPointsLoading: (value: boolean) => dispatch(setDeliveryPointsLoading(value)),
    addItem: (item: IStoreItem) => dispatch(addItem(item)),
    setAmountCart: (count: number) => dispatch(setAmountCart(count)),
    setItems: (items: IStoreItem[]) => dispatch(setItems(items)),
    setItemsLoading: (value: boolean) => dispatch(setItemsLoading(value)),
    setCategoriesLoading: (value: boolean) =>
      dispatch(setCategoriesLoading(value)),
    setCategories: (value: ICategories[]) => dispatch(setCategories(value)),
    setCartItems: (items: IStoreItem[]) => dispatch(setCartItems(items)),
    setCurrCategory: (value: string) => dispatch(setCurrCategory(value)),
  };
};

export default useDispatchedStoreActions;
