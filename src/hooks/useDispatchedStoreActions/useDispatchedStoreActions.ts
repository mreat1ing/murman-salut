import { useDispatch } from 'react-redux';

import {
  addItem,
  setAmountCart,
  setItems,
  setItemsLoading,
  setCategoriesLoading,
  setCategories,
  setCartItems,
} from 'src/store/reducers/storeItemsReducer/actions/storeItemsActions';
import { IStoreItem } from 'src/interfaces/storeItem.interface';
import { ICategories } from 'src/interfaces/categories.interface';

const useDispatchedStoreActions = () => {
  const dispatch = useDispatch();

  return {
    addItem: (item: IStoreItem) => dispatch(addItem(item)),
    setAmountCart: (count: number) => dispatch(setAmountCart(count)),
    setItems: (items: IStoreItem[]) => dispatch(setItems(items)),
    setItemsLoading: (value: boolean) => dispatch(setItemsLoading(value)),
    setCategoriesLoading: (value: boolean) =>
      dispatch(setCategoriesLoading(value)),
    setCategories: (value: ICategories[]) => dispatch(setCategories(value)),
    setCartItems: (items: IStoreItem[]) => dispatch(setCartItems(items)),
  };
};

export default useDispatchedStoreActions;
